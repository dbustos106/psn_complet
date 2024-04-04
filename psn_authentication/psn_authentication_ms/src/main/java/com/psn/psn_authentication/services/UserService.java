package com.psn.psn_authentication.services;

import com.psn.psn_authentication.repository.ITokenRepository;
import com.psn.psn_authentication.repository.IUserRepository;
import com.psn.psn_authentication.security.LdapUserDetails;
import com.psn.psn_authentication.mappers.UserMapper;
import com.psn.psn_authentication.enums.ProfileType;
import com.psn.psn_authentication.enums.TokenType;
import com.psn.psn_authentication.domain.Token;
import com.psn.psn_authentication.dto.UserDTO;
import com.psn.psn_authentication.domain.User;
import com.psn.psn_authentication.enums.Role;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import com.psn.psn_authentication.utils.LdapUtil;
import org.springframework.data.domain.PageRequest;
import org.springframework.ldap.core.DirContextAdapter;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.data.domain.Pageable;
import net.bytebuddy.utility.RandomString;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.*;
import java.io.*;

@Slf4j
@Service
@Transactional
public class UserService {

    private final IUserRepository iUserRepository;
    private final ITokenRepository iTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final LdapTemplate ldapTemplate;
    private final EmailService emailService;
    private final TokenService tokenService;
    private final UserMapper userMapper;

    @Autowired
    public UserService(
                       IUserRepository iUserRepository,
                       ITokenRepository iTokenRepository,
                       PasswordEncoder passwordEncoder,
                       LdapTemplate ldapTemplate,
                       EmailService emailService,
                       TokenService tokenService,
                       UserMapper userMapper){
        this.iUserRepository = iUserRepository;
        this.iTokenRepository = iTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.ldapTemplate = ldapTemplate;
        this.emailService = emailService;
        this.tokenService = tokenService;
        this.userMapper = userMapper;
    }


    public Map<String, Object> registerUser(UserDTO userDTO) throws IOException {
        Map<String, Object> answer = new TreeMap<>();

        if(userDTO == null || userDTO.getEmail() == null || userDTO.getPassword() == null) {
            throw new IllegalStateException("Request data missing");
        }
        if(!emailService.test(userDTO.getEmail())){
            throw new IllegalStateException("Email not valid");
        }

        // map user
        User user = userMapper.userDTOToUser(userDTO);
        user.setProfileUpdateDate(LocalDateTime.now());
        user.setAccountNonLocked(true);
        user.setRole(Role.USER);
        user.setEnabled(false);

        // encrypt password
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        // create verification token
        String randomCode = RandomString.make(64);
        tokenService.createToken(TokenType.VERIFICATION, randomCode, user);

        // save user
        User userAnswer = iUserRepository.save(user);
        DirContextAdapter context = LdapUtil.mapFromUser(userAnswer, encryptedPassword);
        ldapTemplate.bind("uid=" + userAnswer.getId() + ",ou=users", context, null);

        // send email to verify account
        emailService.sendEmailToVerifyAccount(userAnswer, randomCode);

        answer.put("message", "User saved successfully");
        answer.put("id", userAnswer.getId());
        return answer;
    }

    public Map<String, Object> verifyUserAccount(Long id, String code) {
        Map<String, Object> answer = new TreeMap<>();

        Token token = iTokenRepository.findByTokenAndUserId(id, code).orElse(null);
        if(token == null) {
            throw new UsernameNotFoundException("Invalid code for user");
        }

        // enable user
        User user = token.getUser();
        user.setEnabled(true);

        // save user
        iUserRepository.save(user);

        // delete verification token
        iTokenRepository.deleteById(token.getId());

        answer.put("message", "Successful verification");
        return answer;
    }

    public Map<String, Object> sendEmailToChangeUserPassword(String email) throws UnsupportedEncodingException {
        Map<String, Object> answer = new TreeMap<>();

        User user = iUserRepository.findByEmail(email).orElse(null);
        if(user == null){
            throw new UsernameNotFoundException("User not found in the database");
        }
        if(!user.isEnabled()){
            throw new UsernameNotFoundException("User not enabled");
        }

        // create verification token
        String randomCode = RandomString.make(64);
        tokenService.createToken(TokenType.VERIFICATION, randomCode, user);

        // send email to change user password
        emailService.sendEmailToChangeUserPassword(user, randomCode);

        answer.put("message", "Successful email sent");
        return answer;
    }

    public Map<String, Object> changeUserPassword(Long id, String code, String password){
        Map<String, Object> answer = new TreeMap<>();

        Token token = iTokenRepository.findByTokenAndUserId(id, code).orElse(null);
        if(token == null){
            throw new UsernameNotFoundException("Invalid code");
        }

        // change password
        User user = token.getUser();
        user.setPassword(passwordEncoder.encode(password));

        // save user
        User userAnswer = iUserRepository.save(user);
        DirContextOperations userContext = ldapTemplate.lookupContext("uid=" + id + ",ou=users");
        userContext.setAttributeValue("userpassword", userAnswer.getPassword());
        ldapTemplate.modifyAttributes(userContext);

        // delete token
        iTokenRepository.deleteById(token.getId());

        answer.put("message", "Successful password change");
        return answer;
    }

    public Map<String, Object> getAllUsers(Integer idPage, Integer size){
        Map<String, Object> answer = new TreeMap<>();

        // get page of users
        Pageable page = (Pageable) PageRequest.of(idPage, size);
        Page<User> users = iUserRepository.findAll(page);

        // map all users
        List<UserDTO> listUserDTOS = new ArrayList<>();
        for(User user : users){
            UserDTO userDTO = userMapper.userToUserDTO(user);
            listUserDTOS.add(userDTO);
        }
        Page<UserDTO> userDTOS = new PageImpl<>(listUserDTOS);

        // show ldap users
        List<LdapUserDetails> usersLdap = ldapTemplate.search("",
                "(objectclass=person)", new LdapUtil());
        System.out.println(usersLdap);

        // return page of user
        answer.put("message", userDTOS);
        return answer;
    }

    public Map<String, Object> findUserById(Long id){
        Map<String, Object> answer = new TreeMap<>();

        User user = iUserRepository.findById(id).orElse(null);
        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }
        UserDTO userDTO = userMapper.userToUserDTO(user);

        // return user
        answer.put("message", userDTO);
        return answer;
    }

    public Map<String, Object> findUsersByPattern(String pattern){
        Map<String, Object> answer = new TreeMap<>();

        // get list of users
        List<User> users = iUserRepository.findByPattern(pattern.toLowerCase());

        // map all users
        List<UserDTO> listUserDTOS = new ArrayList<>();
        for(User user : users){
            UserDTO userDTO = userMapper.userToUserDTO(user);
            listUserDTOS.add(userDTO);
        }
        Page<UserDTO> userDTOS = new PageImpl<>(listUserDTOS);

        // return users
        answer.put("message", userDTOS);
        return answer;
    }

    public Map<String, Object> findUsersByIds(List<Long> ids){
        Map<String, Object> answer = new TreeMap<>();

        // get list of users
        List<User> users = iUserRepository.findUsersByIds(ids);

        // map all users
        List<UserDTO> listUserDTOS = new ArrayList<>();
        for(User user : users){
            UserDTO userDTO = userMapper.userToUserDTO(user);
            listUserDTOS.add(userDTO);
        }
        Page<UserDTO> userDTOS = new PageImpl<>(listUserDTOS);

        // return users
        answer.put("message", userDTOS);
        return answer;
    }

    public Map<String, Object> editUserById(Long id, UserDTO userDTO){
        Map<String, Object> answer = new TreeMap<>();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        if(!user.getId().equals(id)){
            throw new IllegalStateException("Unauthorized user");
        }
        if(userDTO == null || userDTO.getEmail() == null) {
            throw new IllegalStateException("Request data missing");
        }

        // update user
        user.setName(userDTO.getName());
        user.setLastName(userDTO.getLastName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setNotificationsEnable(userDTO.isNotificationsEnable());
        user.setProfileUpdateDate(LocalDateTime.now());
        user.setProfileType(ProfileType.valueOf(userDTO.getProfileType()));

        // save user
        iUserRepository.save(user);
        DirContextOperations userContext = ldapTemplate.lookupContext("uid=" + id + ",ou=users");
        userContext.setAttributeValue("sn", userDTO.getName() + " " + userDTO.getLastName());
        ldapTemplate.modifyAttributes(userContext);

        answer.put("message", "User updated successfully");
        return answer;
    }

    public Map<String, Object> deleteUserById(Long id){
        Map<String, Object> answer = new TreeMap<>();

        if(!iUserRepository.existsById(id)){
            throw new UsernameNotFoundException("User not found");
        }

        // delete user tokens
        iTokenRepository.deleteAllByUserId(id);

        // delete user
        iUserRepository.deleteById(id);
        ldapTemplate.unbind("uid=" + id + ",ou=users");

        answer.put("message", "User deleted successfully");
        return answer;
    }

}

package com.psn.psn_authentication.services;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.Authentication;
import com.psn.psn_authentication.domain.Token;

import com.psn.psn_authentication.repository.ITokenRepository;
import com.psn.psn_authentication.repository.IUserRepository;
import com.psn.psn_authentication.security.JwtIOProperties;
import com.psn.psn_authentication.dto.GoogleTokenDTO;
import com.psn.psn_authentication.mappers.UserMapper;
import com.psn.psn_authentication.enums.TokenType;
import com.psn.psn_authentication.utils.JwtUtil;
import com.psn.psn_authentication.domain.User;
import com.psn.psn_authentication.dto.UserDTO;
import net.bytebuddy.utility.RandomString;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.json.gson.GsonFactory;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletRequest;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.*;

@Slf4j
@Service
@Transactional
public class AuthService implements UserDetailsService, LogoutHandler {

    @Value("${google.clientId}")
    private String googleClientId;

    private final IUserRepository iUserRepository;
    private final ITokenRepository iTokenRepository;
    private final JwtIOProperties jwtIOProperties;
    private final TokenService tokenService;
    private final UserService userService;
    private final UserMapper userMapper;

    @Autowired
    public AuthService(IUserRepository iUserRepository,
                       ITokenRepository iTokenRepository,
                       JwtIOProperties jwtIOProperties,
                       TokenService tokenService,
                       UserService userService,
                       UserMapper userMapper){
        this.iUserRepository = iUserRepository;
        this.iTokenRepository = iTokenRepository;
        this.jwtIOProperties = jwtIOProperties;
        this.tokenService = tokenService;
        this.userService = userService;
        this.userMapper = userMapper;
    }


    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication){
        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        String access_token = authHeader.substring(7);
        Token storedToken = iTokenRepository.findByToken(access_token).orElse(null);
        if (storedToken != null) {
            storedToken.setRevoked(true);
            iTokenRepository.save(storedToken);
            SecurityContextHolder.clearContext();
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = iUserRepository.findByEmail(email).orElse(null);
        if(user != null){
            if(!user.isEnabled()){
                throw new UsernameNotFoundException("User not enabled");
            }
            return user;
        }
        throw new UsernameNotFoundException("User not found in the database");
    }

    public void authenticate(HttpServletResponse response) throws IOException {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();
            UserDTO userDTO = userMapper.userToUserDTO(user);
            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writer().writeValue(response.getOutputStream(), userDTO);
        }catch (Exception e) {
            response.setStatus(FORBIDDEN.value());
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writer().writeValue(response.getOutputStream(), error);
        }
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            String refresh_token = authorizationHeader.substring("Bearer ".length());

            // create access token
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();
            String access_token = JwtUtil.createTokenDAO(user, jwtIOProperties.getToken().getSecret(),
                    jwtIOProperties.getIssuer(), jwtIOProperties.getToken().getAccess_expires_in());

            // save tokens
            tokenService.revokeAllUserTokens(user);
            tokenService.createToken(TokenType.BEARER, access_token, user);
            tokenService.createToken(TokenType.BEARER, refresh_token, user);

            // return tokens
            Map<String, String> tokens = new HashMap<>();
            tokens.put("access_token", access_token);
            tokens.put("refresh_token", refresh_token);
            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writer().writeValue(response.getOutputStream(), tokens);
        }catch (Exception e) {
            response.setStatus(FORBIDDEN.value());
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writer().writeValue(response.getOutputStream(), error);
        }
    }

    public void loginWithGoogle(GoogleTokenDTO googleTokenDTO, HttpServletResponse response) throws IOException {
        final NetHttpTransport netHttpTransport = new NetHttpTransport();
        final GsonFactory gsonFactory = GsonFactory.getDefaultInstance();
        GoogleIdTokenVerifier.Builder verifier =
                new GoogleIdTokenVerifier.Builder(netHttpTransport, gsonFactory).setAudience(Collections.singletonList(googleClientId));
        final GoogleIdToken googleIdToken = GoogleIdToken.parse(verifier.getJsonFactory(), googleTokenDTO.getValue());
        final GoogleIdToken.Payload payload = googleIdToken.getPayload();

        User user = iUserRepository.findByEmail(payload.getEmail()).orElse(null);
        if(user != null) {
            String access_token = JwtUtil.createTokenDAO(user, jwtIOProperties.getToken().getSecret(),
                    jwtIOProperties.getIssuer(), jwtIOProperties.getToken().getAccess_expires_in());
            String refresh_token = JwtUtil.createTokenDAO(user, jwtIOProperties.getToken().getSecret(),
                    jwtIOProperties.getIssuer(), jwtIOProperties.getToken().getRefresh_expires_in());

            // save tokens
            tokenService.revokeAllUserTokens(user);
            tokenService.createToken(TokenType.BEARER, access_token, user);
            tokenService.createToken(TokenType.BEARER, refresh_token, user);

            // return tokens
            Map<String, String> tokens = new HashMap<>();
            tokens.put("access_token", access_token);
            tokens.put("refresh_token", refresh_token);
            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writer().writeValue(response.getOutputStream(), tokens);
        }else {
            // create a new user
            UserDTO userDTO = new UserDTO();
            userDTO.setEmail(payload.getEmail());

            // create randomPassword and encrypt
            String randomPassword = RandomString.make(255);
            userDTO.setPassword(randomPassword);

            userService.registerUser(userDTO);
        }
    }

}

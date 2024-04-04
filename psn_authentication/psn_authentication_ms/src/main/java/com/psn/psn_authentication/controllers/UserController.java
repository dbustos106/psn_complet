package com.psn.psn_authentication.controllers;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.psn.psn_authentication.services.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.psn.psn_authentication.dto.UserDTO;
import org.springframework.http.HttpStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }


    @PostMapping(value = "/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO){
        try{
            Map<String, Object> answer = userService.registerUser(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(answer);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @PutMapping(value = "/verifyAccount/{id}")
    public ResponseEntity<?> verifyUserAccount(
            @PathVariable("id") Long id,
            @Param("code") String code){
        try{
            Map<String, Object> answer = userService.verifyUserAccount(id, code);
            System.out.println(answer);
            return ResponseEntity.ok().body(answer);
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @GetMapping(value = "/changePassword/sendEmail")
    public ResponseEntity<?> sendEmailToChangeUserPassword(
            @Param("email") String email){
        try{
            Map<String, Object> answer = userService.sendEmailToChangeUserPassword(email);
            return ResponseEntity.ok().body(answer);
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @PutMapping(value = "/changePassword/{id}")
    public ResponseEntity<?> changeUserPassword(
            @PathVariable("id") Long id,
            @Param("code") String code,
            @RequestParam String password){
        try{
            Map<String, Object> answer = userService.changeUserPassword(id, code, password);
            return ResponseEntity.ok().body(answer);
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @GetMapping(value = "/all")
    public ResponseEntity<?> getAllUsers(
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size){
        try{
            Map<String, Object> answer = userService.getAllUsers(page, size);
            return ResponseEntity.ok().body(answer);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> findUserById(@PathVariable("id") Long id){
        try{
            Map<String, Object> answer = userService.findUserById(id);
            return ResponseEntity.ok().body(answer);
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @GetMapping(value = "/pattern/{pattern}")
    public ResponseEntity<?> findUsersByPattern(@PathVariable("pattern") String pattern){
        try{
            Map<String, Object> answer = userService.findUsersByPattern(pattern);
            return ResponseEntity.ok().body(answer);
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @GetMapping(value = "/ids")
    public ResponseEntity<?> findUsersByIds(@RequestParam List<Long> ids){
        try{
            Map<String, Object> answer = userService.findUsersByIds(ids);
            return ResponseEntity.ok().body(answer);
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<?> editUserById(
            @PathVariable("id") Long id, 
            @RequestBody UserDTO userDTO){
        try{
            Map<String, Object> answer = userService.editUserById(id, userDTO);
            return ResponseEntity.ok().body(answer);
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable("id") Long id) {
        try {
            Map<String, Object> answer = userService.deleteUserById(id);
            return ResponseEntity.status(HttpStatus.OK).body(answer);
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

}

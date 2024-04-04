package com.psn.psn_authentication.controllers;

import com.psn.psn_authentication.services.AuthService;
import com.psn.psn_authentication.dto.GoogleTokenDTO;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService){
        this.authService = authService;
    }


    @PostMapping(value = "/authenticate")
    public void authenticate(HttpServletResponse response) throws IOException{
        authService.authenticate(response);
    }

    @PostMapping(value = "/refreshToken")
    public void refreshToken(HttpServletRequest request,
                             HttpServletResponse response) throws IOException {
        authService.refreshToken(request, response);
    }

    @PostMapping(value = "/loginWithGoogle")
    public void loginWithGoogle(
            @RequestBody GoogleTokenDTO googleTokenDTO,
            HttpServletResponse response) throws IOException {
        authService.loginWithGoogle(googleTokenDTO, response);
    }

}

package com.psn.psn_authentication.filters;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.Authentication;

import com.psn.psn_authentication.repository.IUserRepository;
import com.psn.psn_authentication.security.JwtIOProperties;
import com.psn.psn_authentication.services.TokenService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.psn.psn_authentication.enums.TokenType;
import com.psn.psn_authentication.utils.JwtUtil;
import com.psn.psn_authentication.domain.User;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.FilterChain;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtIOProperties jwtIOProperties;
    private final IUserRepository iUserRepository;
    private final TokenService tokenService;

    @Autowired
    public CustomAuthenticationFilter(AuthenticationManager authenticationManager,
                                      JwtIOProperties jwtIOProperties,
                                      IUserRepository iUserRepository,
                                      TokenService tokenService){
        this.authenticationManager = authenticationManager;
        this.jwtIOProperties = jwtIOProperties;
        this.iUserRepository = iUserRepository;
        this.tokenService = tokenService;
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {
        Object principal = authentication.getPrincipal();
        LdapUserDetailsImpl ldapUserDetails = (LdapUserDetailsImpl) principal;

        User user = iUserRepository.findByEmail(ldapUserDetails.getUsername()).orElse(null);
        if (user == null){
            throw new UsernameNotFoundException("User not found in the database");
        }
        if(!user.isEnabled()){
            throw new UsernameNotFoundException("User not enabled");
        }

        // create tokens
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
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
        response.setStatus(FORBIDDEN.value());
        Map<String, String> error = new HashMap<>();
        error.put("message", "Incorrect credentials");
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writer().writeValue(response.getOutputStream(), error);
    }

}

package com.psn.psn_authentication.filters;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.psn.psn_authentication.repository.IUserRepository;
import com.psn.psn_authentication.security.JwtIOProperties;
import com.psn.psn_authentication.domain.User;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.psn.psn_authentication.utils.JwtUtil;
import com.auth0.jwt.interfaces.DecodedJWT;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.ServletException;
import jakarta.servlet.FilterChain;

import java.util.Collection;
import java.util.ArrayList;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class CustomAuthorizationFilter extends OncePerRequestFilter {

    private final JwtIOProperties jwtIOProperties;
    private final IUserRepository iUserRepository;

    public CustomAuthorizationFilter(JwtIOProperties jwtIOProperties,
                                     IUserRepository iUserRepository){
        this.jwtIOProperties = jwtIOProperties;
        this.iUserRepository = iUserRepository;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(request.getServletPath().equals("/auth/login") || request.getServletPath().equals("/auth/loginWithGoogle") ||
                request.getServletPath().equals("/user/register") || request.getServletPath().startsWith("/user/verifyAccount") ||
                request.getServletPath().startsWith("/user/changePassword")){
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            if(authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Access token is missing");
            }
            String token = authorizationHeader.substring("Bearer ".length());
            DecodedJWT decodedJWT = JwtUtil.verifyToken(token, jwtIOProperties.getToken().getSecret());
            String subject = decodedJWT.getSubject();
            String email = subject.substring(0 , subject.indexOf(","));
            User user = iUserRepository.findByEmail(email).orElse(null);
            String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(roles[0]));
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(user, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);
        }catch (Exception e) {
            response.setStatus(FORBIDDEN.value());
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writer().writeValue(response.getOutputStream(), error);
        }
    }

}

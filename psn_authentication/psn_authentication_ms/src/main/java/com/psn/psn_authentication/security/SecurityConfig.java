package com.psn.psn_authentication.security;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.security.web.SecurityFilterChain;

import com.psn.psn_authentication.filters.CustomAuthenticationFilter;
import com.psn.psn_authentication.filters.CustomAuthorizationFilter;
import com.psn.psn_authentication.repository.IUserRepository;
import com.psn.psn_authentication.services.TokenService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;

@Configuration
public class SecurityConfig {

    private final TokenService tokenService;
    private final LogoutHandler logoutHandler;
    private final LdapContextSource contextSource;
    private final IUserRepository iUserRepository;
    private final JwtIOProperties jwtIOProperties;
    private final UserDetailsService userDetailsService;
    private final AuthenticationConfiguration authenticationConfiguration;

    @Autowired
    public SecurityConfig(TokenService tokenService,
                          LogoutHandler logoutHandler,
                          LdapContextSource contextSource,
                          IUserRepository iUserRepository,
                          JwtIOProperties jwtIOProperties,
                          UserDetailsService userDetailsService,
                          AuthenticationConfiguration authenticationConfiguration){
        this.tokenService = tokenService;
        this.logoutHandler = logoutHandler;
        this.contextSource = contextSource;
        this.iUserRepository = iUserRepository;
        this.jwtIOProperties = jwtIOProperties;
        this.userDetailsService = userDetailsService;
        this.authenticationConfiguration = authenticationConfiguration;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.cors().and().csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeHttpRequests(requests -> requests
                .requestMatchers("/auth/login/**",
                        "/auth/loginWithGoogle/**",
                        "/user/changePassword/**",
                        "/user/verifyAccount/**",
                        "/user/register/**")
                .permitAll());
        http.authorizeHttpRequests().anyRequest().authenticated();

        // add authentication filter
        CustomAuthenticationFilter customAuthenticationFilter =
                new CustomAuthenticationFilter(authenticationManagerBean(authenticationConfiguration), jwtIOProperties, iUserRepository, tokenService);
        customAuthenticationFilter.setFilterProcessesUrl("/auth/login");
        http.addFilter(customAuthenticationFilter);

        // add authorization filter
        http.addFilterBefore(new CustomAuthorizationFilter(jwtIOProperties, iUserRepository), UsernamePasswordAuthenticationFilter.class);

        http.logout().logoutUrl("/auth/logout")
                .addLogoutHandler(logoutHandler)
                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext());

        return http.build();
    }

    @Autowired
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .ldapAuthentication()
                .userSearchFilter("(cn={0})")
                .contextSource(contextSource)
                .passwordCompare()
                .passwordEncoder(new BCryptPasswordEncoder())
                .passwordAttribute("userpassword")
                .and().and()
                .userDetailsService(userDetailsService)
                .passwordEncoder(new BCryptPasswordEncoder());
    }

    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

}

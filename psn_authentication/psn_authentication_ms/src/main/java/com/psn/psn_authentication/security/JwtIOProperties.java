package com.psn.psn_authentication.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Configuration
@NoArgsConstructor
@ConfigurationProperties(prefix = "jms.jwt")
public class JwtIOProperties {

    private String timezone;
    private String issuer;
    private Token token;

    @Data
    public static class Token{
        private Auth auth;
        private String secret;
        private int access_expires_in;
        private int refresh_expires_in;
    }

    @Data
    public static class Auth{
        private String path;
    }

}

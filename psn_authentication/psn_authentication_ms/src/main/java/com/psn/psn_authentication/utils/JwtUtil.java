package com.psn.psn_authentication.utils;

import org.springframework.security.core.GrantedAuthority;
import com.psn.psn_authentication.domain.User;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.util.stream.Collectors;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.JWT;
import java.util.Date;

public class JwtUtil {

    public static DecodedJWT verifyToken(String refresh_token, String SECRET){
        Algorithm algorithm = Algorithm.HMAC256(SECRET.getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(refresh_token);
    }

    public static String createTokenDAO(User user, String SECRET, String ISSUER, int EXPIRES_IN){
        Algorithm algorithm = Algorithm.HMAC256(SECRET.getBytes());
        String subject = user.getUsername() + "," + user.getId();

        return JWT.create()
                .withSubject(subject)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRES_IN))
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .withIssuer(ISSUER)
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
    }

}

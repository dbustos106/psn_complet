package com.psn.psn_authentication.domain;

import com.psn.psn_authentication.enums.TokenType;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "token", schema = "psn-authentication-db")
public class Token {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "token_type")
    private TokenType tokenType;

    @Column(name = "token")
    private String token;

    @Column(name = "revoked")
    private boolean revoked;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Override
    public String toString() {
        return "Token{" +
                "id=" + id +
                ", tokenType=" + tokenType +
                ", token='" + token + '\'' +
                ", revoked=" + revoked +
                ", user=" + user +
                '}';
    }

}

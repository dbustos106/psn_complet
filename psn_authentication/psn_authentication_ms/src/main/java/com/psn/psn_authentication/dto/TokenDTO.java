package com.psn.psn_authentication.dto;

import lombok.ToString;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@ToString
public class TokenDTO {

    private Long id;

    private String token;

    private String tokenType;

    private boolean revoked;

    private Long userId;

}

package com.psn.psn_authentication.dto;

import lombok.ToString;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@ToString
public class UserDTO {

    private Long id;

    private String role;

    private String email;

    private String password;

    private String name;

    private String lastName;

    private String phoneNumber;

    private boolean notificationsEnable;

    private String profileUpdateDate;

    private String profileType;

    private boolean isAccountNonLocked;

    private boolean isEnabled;

}

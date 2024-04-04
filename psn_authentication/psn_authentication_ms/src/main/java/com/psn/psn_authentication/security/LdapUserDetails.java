package com.psn.psn_authentication.security;

import org.springframework.ldap.odm.annotations.Attribute;
import org.springframework.ldap.odm.annotations.Entry;
import org.springframework.ldap.odm.annotations.Id;
import javax.naming.Name;

import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entry(objectClasses = {"person", "organizationalPerson", "inetOrgPerson"})
public class LdapUserDetails {

    @Id
    private Name dn;

    @Attribute(name = "uid")
    private String uid;

    @Attribute(name = "cn")
    private String cn;

    @Attribute(name = "sn")
    private String sn;

    @Attribute(name = "userPassword")
    private String password;

    @Override
    public String toString() {
        return "LdapUserDetails{" +
                "dn=" + dn +
                ", uid='" + uid + '\'' +
                ", cn='" + cn + '\'' +
                ", sn='" + sn + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

}

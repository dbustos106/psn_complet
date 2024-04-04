package com.psn.psn_authentication.utils;

import com.psn.psn_authentication.security.LdapUserDetails;
import org.springframework.ldap.core.DirContextAdapter;
import org.springframework.ldap.core.ContextMapper;
import com.psn.psn_authentication.domain.User;

import javax.naming.directory.Attributes;
import javax.naming.NamingException;

public class LdapUtil implements ContextMapper<LdapUserDetails> {

    public static DirContextAdapter mapFromUser(User user, String encryptedPassword){
        DirContextAdapter context = new DirContextAdapter();
        context.setAttributeValues("objectclass", new String[] { "top", "person", "organizationalPerson", "inetOrgPerson" });
        context.setAttributeValue("uid", String.valueOf(user.getId()));
        context.setAttributeValue("cn", user.getEmail());
        context.setAttributeValue("sn", user.getName() + " " + user.getLastName());
        context.setAttributeValue("userpassword", encryptedPassword);
        return context;
    }

    public LdapUserDetails mapFromContext(Object ctx) throws NamingException {
        DirContextAdapter contextAdapter = (DirContextAdapter) ctx;
        Attributes attributes = (contextAdapter).getAttributes("");

        LdapUserDetails ldapUserDetails = new LdapUserDetails();
        ldapUserDetails.setDn(contextAdapter.getDn());
        ldapUserDetails.setCn(attributes.get("cn").get().toString());
        ldapUserDetails.setSn(attributes.get("sn").get().toString());
        ldapUserDetails.setUid(attributes.get("uid").get().toString());
        ldapUserDetails.setPassword(attributes.get("userPassword").get().toString());
        return ldapUserDetails;
    }

}

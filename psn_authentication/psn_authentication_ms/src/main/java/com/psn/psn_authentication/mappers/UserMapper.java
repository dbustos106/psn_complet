package com.psn.psn_authentication.mappers;

import com.psn.psn_authentication.enums.ProfileType;
import com.psn.psn_authentication.domain.User;
import com.psn.psn_authentication.dto.UserDTO;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

import org.mapstruct.Mapping;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "profileUpdateDate", expression = "java(dateToString(user.getProfileUpdateDate()))")
    public UserDTO userToUserDTO(User user);

    @Mapping(target = "tokens", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    @Mapping(target = "profileUpdateDate", ignore = true)
    @Mapping(target = "profileType", expression = "java(stringToProfileType(userDTO.getProfileType()))")
    public User userDTOToUser(UserDTO userDTO);

    default String dateToString(LocalDateTime localDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return localDateTime.format(formatter);
    }

    default ProfileType stringToProfileType(String profileType){
        return ProfileType.valueOf(profileType);
    }

}

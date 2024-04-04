package com.psn.psn_authentication.mappers;

import com.psn.psn_authentication.domain.Token;
import com.psn.psn_authentication.dto.TokenDTO;

import org.mapstruct.Mapping;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TokenMapper {

    @Mapping(source = "user.id", target = "userId")
    public TokenDTO tokenToTokenDTO(Token token);

    @Mapping(source = "userId", target = "user.id")
    public Token tokenDTOToToken(TokenDTO tokenDTO);

}

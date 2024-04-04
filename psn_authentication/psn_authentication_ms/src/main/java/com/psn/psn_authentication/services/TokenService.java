package com.psn.psn_authentication.services;

import com.psn.psn_authentication.repository.ITokenRepository;
import com.psn.psn_authentication.mappers.TokenMapper;
import com.psn.psn_authentication.enums.TokenType;
import com.psn.psn_authentication.domain.Token;
import com.psn.psn_authentication.dto.TokenDTO;
import com.psn.psn_authentication.domain.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import java.util.List;

@Slf4j
@Service
@Transactional
public class TokenService {

    private final ITokenRepository iTokenRepository;
    private final TokenMapper tokenMapper;

    @Autowired
    public TokenService(ITokenRepository iTokenRepository,
                        TokenMapper tokenMapper){
        this.iTokenRepository = iTokenRepository;
        this.tokenMapper = tokenMapper;
    }

    public void createToken(TokenType tokenType, String token_code, User user){
        Token token = tokenMapper.tokenDTOToToken(new TokenDTO());
        token.setTokenType(tokenType);
        token.setToken(token_code);
        token.setRevoked(false);
        token.setUser(user);

        iTokenRepository.save(token);
    }

    public void revokeAllUserTokens(User user){
        List<Token> validUserTokens = iTokenRepository.findAllValidTokenByUserId(user.getId());
        validUserTokens.forEach(token -> {
            token.setRevoked(true);
        });
        iTokenRepository.saveAll(validUserTokens);
    }

}

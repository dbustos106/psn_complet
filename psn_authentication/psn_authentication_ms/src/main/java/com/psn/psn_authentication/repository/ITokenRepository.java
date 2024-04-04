package com.psn.psn_authentication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import com.psn.psn_authentication.domain.Token;
import org.springframework.data.domain.Page;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ITokenRepository extends JpaRepository<Token, Long> {

    Page<Token> findAll(Pageable page);
    Optional<Token> findById(Long id);
    Optional<Token> findByToken(String token);

    void deleteById(Long id);
    boolean existsById(Long id);

    @Query(value = """
            SELECT *
            FROM token
            WHERE (token.user_id = ?1 AND token.revoked = 0)""", nativeQuery = true)
    List<Token> findAllValidTokenByUserId(Long id);

    @Query(value = """
            SELECT *
            FROM token
            WHERE (token.user_id = ?1 AND token.token = ?2)""", nativeQuery = true)
    Optional<Token> findByTokenAndUserId(Long id, String code);

    @Modifying
    @Query(value = """
            DELETE
            FROM token
            WHERE (token.user_id = ?1)""", nativeQuery = true)
    void deleteAllByUserId(Long id);

}

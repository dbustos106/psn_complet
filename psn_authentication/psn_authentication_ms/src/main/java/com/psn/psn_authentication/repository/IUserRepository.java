package com.psn.psn_authentication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import com.psn.psn_authentication.domain.User;
import org.springframework.data.domain.Page;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {

    Page<User> findAll(Pageable page);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);

    void deleteById(Long id);
    boolean existsById(Long id);

    @Query(value = """
            SELECT *
            FROM user
            WHERE (LOWER(user.name) LIKE %?1% OR LOWER(user.last_name) LIKE %?1%)""", nativeQuery = true)
    List<User> findByPattern(String pattern);

    @Query(value = """
            SELECT *
            FROM user
            WHERE (user.id IN (?1))""", nativeQuery = true)
    List<User> findUsersByIds(List<Long> ids);

}

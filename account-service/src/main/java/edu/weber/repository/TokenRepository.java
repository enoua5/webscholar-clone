package edu.weber.repository;

import edu.weber.model.Account;
import edu.weber.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface TokenRepository extends JpaRepository<VerificationToken, Long>{

    VerificationToken findAccountByToken(String token);
}

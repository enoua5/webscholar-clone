package edu.weber.repository;

import edu.weber.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<VerificationToken, Long>{

    VerificationToken findAccountByToken(String token);
}

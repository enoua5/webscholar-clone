package edu.weber.repository;

import edu.weber.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {

    Account findAccountByAccountKey (int accountKey);
    Account findAccountByEmail (String email);
}

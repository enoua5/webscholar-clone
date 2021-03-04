package edu.weber.repository;

import edu.weber.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * This class connects to the database.
 */
@Repository
public interface AccountRepository extends JpaRepository<Account, String> {

    //These are default database search functions
    Account findAccountByAccountKey(int accountKey);

    Account findAccountByEmail(String email);
}

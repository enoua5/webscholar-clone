package edu.weber.repository;

import edu.weber.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * This class connects to the database.
 * Default methods can be built by specifying the wording of the
 * method signature.
 * eg. 'findAccountBy' followed by a variable name 'AccountKey', 'firstName', etc.
 * Note: intelliJ helps you build these methods when you start writing the method signature.
 * Note: You can also create complex queries using the @Query annotation and specifying the sql statement.
 */
@Repository
public interface AccountRepository extends JpaRepository<Account, String> {

    //These are default database search functions

    Account findAccountByAccountKey(int accountKey);

    Account findAccountByEmail(String email);

    //This should return all accounts after the specified starting account id
    List<Account> findAllByAccountKeyAfter(int startingAccountKey);
}

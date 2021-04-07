package edu.weber.service;

import edu.weber.model.Account;
import edu.weber.repository.AccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

/**
 * This class extends the functionality of 'AccountRepository'. Instead of using the default
 * search queries, we can define our own here.
 */
@Service
public class AccountService {

    /**
     * This is the logger which uses the slf4j logging facade API.
     * The logging framework that slf4j interfaces with is LogBack.
     * Both slf4j and LogBack are available with Spring Boot.
     * If you would like slf4j to interface with a different logging
     * framework (like log4j), consult the slf4j documentation.
     */
    private final Logger log = LoggerFactory.getLogger(getClass());

    /**
     * This object handles queries to the database.
     */
    @Autowired
    public AccountRepository accountRepository;

    /**
     * This method updates the data associated for an existing account.
     *
     * @param accountKey The id for the account being updated.
     * @param update The new account data being used for updating.
     * @return Returns a success or fail flag depending on if the account can be found.
     */
    public boolean saveChanges(int accountKey, Account update) {

        //Get the current account
        Account account = accountRepository.findAccountByAccountKey(accountKey);

        //Verify the account exists
        if(account == null){

            // Log Error
            log.error("ERROR: Account does not exist -- SOURCE: saveChanges()");

            return false;
        }

        Assert.notNull(account, "can't find account with name " + accountKey);

        //Update the account's data
        account.setEmail(update.getEmail());
        account.setUsername(update.getUsername());
        account.setPassword(update.getPassword());
        account.setSchoolId(update.getSchoolId());
        account.setActive(update.getActive());

        //Save the updated account
        accountRepository.save(account);

        return true;
    }

}

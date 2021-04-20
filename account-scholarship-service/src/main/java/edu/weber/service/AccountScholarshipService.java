package edu.weber.service;

import edu.weber.model.AccountScholarship;
import edu.weber.repository.AccountScholarshipRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

/**
 * This class extends the functionality of 'AccountScholarshipRepository'. Instead of using the default
 * search queries, we can define our own here.
 */
@Service
public class AccountScholarshipService {

    /**
     * This is the logger which uses the slf4j logging facade API.
     * The logging framework that slf4j interfaces with is LogBack.
     * Both slf4j and LogBack are available with Spring Boot.
     * If you would like slf4j to interface with a different logging
     * framework (like log4j), consult the slf4j documentation.
     */
    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    public AccountScholarshipRepository accountScholarshipRepository;

    /**
     * This method updates the data associated for an existing accountScholarship.
     *
     * @param comboId The id associated with the accountScholarship being updated.
     * @param update The new accountScholarship data being used for updating.
     * @return Returns a success or fail flag depending on if the scholarship can be found.
     */
    public boolean saveChanges(int comboId, AccountScholarship update){

        AccountScholarship accountScholarship = accountScholarshipRepository.findAccountScholarshipByComboId(comboId);

        if (accountScholarship == null){
            log.error("ERROR: AccountScholarship does not exist -- SOURCE: saveChanges()");
            return false;
        }

        Assert.notNull(accountScholarship, "can't find account with name " + comboId);

        //Update the accountScholarship's data
        accountScholarship.setAccountKey(update.getAccountKey());
        accountScholarship.setScholarshipId(update.getScholarshipId());

        //Save the updated accountScholarship
        accountScholarshipRepository.save(accountScholarship);

        return true;

    }

    /**
     * This method deletes a accountScholarship using it's given id.
     *
     * @param comboId The id of the accountScholarship to be deleted.
     * @return Returns a success or fail flag depending on if the accountScholarship can be found.
     */
    public boolean deleteAccountScholarship(int comboId){
        //Make sure the record exists
        AccountScholarship accountScholarship = accountScholarshipRepository.findAccountScholarshipByComboId(comboId);

        if (accountScholarship == null){
            log.error("ERROR: AccountScholarship does not exist -- SOURCE: saveChanges()");
            return false;
        }

        //Delete accountScholarship
        accountScholarshipRepository.deleteAccountScholarshipByComboId(comboId);

        //Return success
        return true;

    }

}

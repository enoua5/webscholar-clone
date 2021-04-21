package edu.weber.service;

import edu.weber.model.Account;
import edu.weber.repository.AccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.beans.factory.annotation.Value;

/**
 * This class extends the functionality of 'AccountRepository'. Instead of using the default
 * search queries, we can define our own here.
 */
@Service
public class AccountService {

    /**
     * This variable pulls in the smtp server username from
     * the account-service bootstrap.yml.
     * If the username in bootstrap.yml changes, the new
     * username will be used here automatically.
     */
    @Value("${spring.mail.username}")
    private String senderEmail;

    /**
     * This object is used to send emails in the sendInvite() method
     */
    @Autowired
    private JavaMailSender emailSender;

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


    /**
     * This method sends an email message that includes the sender's name
     *
     * @param accountKey        The id for the sender's account.
     * @param recipientEmail    The destination email address
     * @return Returns a success or fail flag depending on if the sender's account can be found.
     *
     * Note:  The sender's email address is defined in the variable senderEmail
     * at the top of this class.
     */
    public boolean sendInvite(int accountKey, String recipientEmail) {

        //Get the sender's account
        Account account = accountRepository.findAccountByAccountKey(accountKey);

        //Verify the sender's account exists
        if(account == null){

            // Log Error
            log.error("ERROR: Account Number " + accountKey + " not found -- SOURCE: sendInvite()");

            return false;
        }

        // Get email sender's name to use in message body
        String senderName = account.getFirstName() + " " + account.getLastName();

        String messageBody = senderName + " has sent you an invite!\n";
        String messageSubject = "Webscholar Mail Test";
        
        // Create mail message object
        SimpleMailMessage message = new SimpleMailMessage();


        // Set message attributes
        message.setFrom(senderEmail);
        message.setTo(recipientEmail);
        message.setSubject(messageSubject);
        message.setText(messageBody);
        
        //Send the message
        emailSender.send(message);

        return true;
    }

}

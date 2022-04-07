package edu.weber.service;

import edu.weber.model.Account;
import edu.weber.model.VerificationToken;
import edu.weber.repository.AccountRepository;
import edu.weber.repository.TokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

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
     * This object handles queries to the database for specifically tokens.
     */
    @Autowired
    public TokenRepository tokenRepository;

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

        String messageSubject = "Webscholar Invitation";
        String messageBody = senderName + " has sent you an invite to join!\n";

        //Send out the email
        sendEmail(recipientEmail, messageSubject, messageBody);

        //Return success
        return true;
    }

    /**
     * This method sends an email message that invites a user to register for a speicifc account role (Chair, faculty, etc)
     *
     * @param recipientEmail    The destination email address
     * @param role              The role recipient will be able to register for.
     * @return Returns a success or fail flag depending on if the sender's account can be found.
     *
     * Note:  The sender's email address is defined in the variable senderEmail
     * at the top of this class.
     */
    public boolean sendRegistrationInvite(String recipientEmail, String role) {
        /*
        Account account = accountRepository.findAccountByAccountKey(accountKey);

        //Verify the sender's account exists
        if(account == null){

            // Log Error
            log.error("ERROR: Account Number " + accountKey + " not found -- SOURCE: sendInvite()");

            return false;
        }
         */

        // Get email sender's name to use in message body
        //String senderName = account.getFirstName() + " " + account.getLastName();

        VerificationToken verificationToken = new VerificationToken(UUID.randomUUID().toString());
        tokenRepository.save(verificationToken);

        // TODO save token to database associated with account.

        String messageSubject = "Webscholar Invitation";
        String messageBody = "Someone has sent you an invite to join as a " + role + "!\n";
        String webUrl = "http://localhost:4200/register?role=" + role + "&email=" + recipientEmail +"&token=" + verificationToken;
        messageBody += "Invite Link: " + webUrl;

        //Send out the email
        sendEmail(recipientEmail, messageSubject, messageBody);

        //Return success
        return true;
    }


    /**
     * Creates a link to delete a users account.
     * @param accountKey The unique id for the users account.
     * @return The generated link for deleting a users account.
     */
    public String generateLink(int accountKey){

        //Get the sender's account
        Account account = accountRepository.findAccountByAccountKey(accountKey);

        //Verify the sender's account exists
        if(account == null){

            // Log Error
            log.error("ERROR: Account Number " + accountKey + " not found -- SOURCE: generateLink()");

            return "error";
        }


        //Hold the link to the delete page
        String webUrl = "http://localhost:4200/delete_page/";

        /*TODO: Finish me!

        //Create the unique hash
        String hashedLink = hasher(found.email, found.password);

        //Get the time the link was created
        DateTime timeCreated = DateTime.now()

        //Save the hash to the users account
        account.setDeleteLink(hashedLink);

        //Save the date created to the users account
        account.setLinkDate(timeCreated);

        //Save the account
        accountRepository.save(account);

        //Build the final url
        webUrl += hashedLink

        */

        //Return the deletion link to the caller
        return webUrl;
    }


    /**
     * Used to send the generated link to the users email.
     * @param accountKey The id associated with the users account.
     * @param link The link used to help the user delete their account.
     * @return True if nothing goes wrong.
     */
    public boolean sendDeleteEmail(int accountKey, String link){

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

        String messageSubject = "Account Removal Requested";
        String messageBody = "The account for: '" + senderName + "' has been requested to be deleted.\n" +
                             "To delete your account, please go to:\n" +
                             link +
                             "This link will expire in 24 hours.";

        //Send out email
        sendEmail(account.getEmail(), messageSubject, messageBody);

        //Return success
        return true;
    }


    /**
     * Sends an email to the specified recipient.
     * @param recipient The person receiving the email.
     * @param subject Subject of the email.
     * @param body Body of the email.
     */
    public void sendEmail(String recipient, String subject, String body){

        // Create mail message object
        SimpleMailMessage message = new SimpleMailMessage();

        // Set message attributes
        message.setFrom(senderEmail);
        message.setTo(recipient);
        message.setSubject(subject);
        message.setText(body);

        //Send the message
        emailSender.send(message);
    }


    /**
     *
     * @param generatedHash
     * @return
     */
    public boolean deleteAccount(String generatedHash){

        /*

        //Find the account associated with the hash
        Account account = accountRepository.findAccountByHash(generatedHash);

        //Verify the sender's account exists
        if(account == null){

            // Log Error
            log.error("ERROR: Account Number " + accountKey + " not found -- SOURCE: sendInvite()");

            return false;
        }


        //Verify the hash has not expired
        if(account.getLinkDate > 24hours){

            //Remove the existing hash data

            //Save the hash to the users account
            account.setDeleteLink(null);

            //Save the date created to the users account
            account.setLinkDate(null);

            //Save the account
            accountRepository.save(account);

            //Return error
            return false;

        }else{

            //Delete the found account
            accountRepository.delete(account);

            //Send out an email guilt tripping the user for deleting their account
            String messageSubject = "Your account was deleted!";
            String messageBody = "We hate to see you go! Please consider signing up for more scholarship opportunities";

            //Send out email
            sendEmail(account.getEmail(), messageSubject, messageBody);
        }

         */

        //Return success
        return true;
    }
}

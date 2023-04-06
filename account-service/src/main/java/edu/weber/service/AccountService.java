package edu.weber.service;

import edu.weber.controller.AccountController;
import edu.weber.controller.ErrorHandler;
import edu.weber.model.Account;
import edu.weber.model.AccountRoles;
import edu.weber.model.RoleRequest;
import edu.weber.model.VerificationToken;
import edu.weber.repository.AccountRepository;
import edu.weber.repository.TokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

//TODO: forgot email service

/**
 * This class extends the functionality of 'AccountRepository'. Instead of using the default
 * search queries, we can define our own here.
 */
@Service
public class AccountService {

//region (Global) Objects
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

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

//endregion

    /**
     * Hashes the password for the new account, and then saves account object to the database
     * @param account: The account object to be created
     * @return: The newly created account object
     */
    public Account createNewAccount(Account account)
    {
        //Encrypt the password
        account.setPassword(passwordEncoder.encode(account.getPassword()));

        //Create a new account in the database
        account = accountRepository.save(account);

        if (account == null) {
            ErrorHandler.accountNotCreated();
        }

        sendEmail(account.getEmail(), "Registration email", "Thank you for registering!");

        return account;
    }

    /**
     * This method updates the data associated for an existing account.
     *
     * @param accountKey The id for the account being updated.
     * @param update The new account data being used for updating.
     * @return Returns a success or fail flag depending on if the account can be found.
     */
    public Account updateProfile(int accountKey, Account update) {
        //Get the current account
        Account account = accountRepository.findAccountByAccountKey(accountKey);

        //Verify the account exists
        if(account == null){
            // Log Error
            // TODO: Change this to use ErrorHandler.accountNotFound();
            log.error("ERROR: Account does not exist -- SOURCE: saveChanges()");
            ErrorHandler.accountNotFound();
            return null;
        }

        // TODO: Test? We need to look into gathering all the tests into one place.
        Assert.notNull(account, "can't find account with name " + accountKey);

        //Update the account's data. "Not null" members can't be blank.
        if(Objects.nonNull(update.getEmail()) && !"".equalsIgnoreCase(update.getEmail())) {
            account.setEmail(update.getEmail());
        }
        if(Objects.nonNull(update.getSchoolId()) && !"".equalsIgnoreCase(update.getSchoolId())) {
            account.setSchoolId(update.getSchoolId());
        }
        if(Objects.nonNull(update.getIsLoggedIn())) {
            account.setIsLoggedIn(update.getIsLoggedIn());
        }
        if(Objects.nonNull(update.getUserType())) {
            account.setUserType(update.getUserType());
        }
        if(Objects.nonNull(update.getFirstName()) && !"".equalsIgnoreCase(update.getFirstName())) {
            account.setFirstName(update.getFirstName());
        }
        if(Objects.nonNull(update.getLastName()) && !"".equalsIgnoreCase(update.getLastName())) {
            account.setLastName(update.getLastName());
        }
        //For now, everything else can be null.
        account.setCity(update.getCity());
        account.setState(update.getState());
        account.setZipCode(update.getZipCode());
        account.setPhoneNumber(update.getPhoneNumber());
        account.setMajor(update.getMajor());

        //Save the updated account
        accountRepository.save(account);

        return account;
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
        log.error("Searching for account: " + accountKey);
        //Get the sender's account
        Account account = accountRepository.findAccountByAccountKey(accountKey);

        //Verify the sender's account exists
        if(account == null){
            // Log Error
            // TODO: Change this to use ErrorHandler.accountNotFound();
            log.error("ERROR: Account Number " + accountKey + " not found -- SOURCE: sendInvite()");
            ErrorHandler.accountNotFound();
            return false;
        }

        // Get email sender's name to use in message body
        String senderName = account.getFirstName() + " " + account.getLastName();

        // Build the message
        String messageSubject = "Webscholar Invitation";
        String messageBody = senderName + " has sent you an invite to join!\n";

        //Send out the email
        sendEmail(recipientEmail, messageSubject, messageBody);

        //Return success
        return true;
    }


    /**
     * This method sends an email message that invites a user to register for a speicifc account role (Chair, faculty, etc)
     * Token is saved into the model, which is used to create the account when the receiver clicks the link.
     *
     * @param recipientEmail    The destination email address
     * @param role              The role recipient will be able to register for.
     * @return Returns a success or fail flag depending on if the sender's account can be found.
     *
     * Note:  The sender's email address is defined in the variable senderEmail
     * at the top of this class.
     */
    public boolean sendRegistrationInvite(String recipientEmail, int accountKey, String role) {
        Account account = accountRepository.findAccountByAccountKey(accountKey);

        //Verify the sender's account exists
        if(account == null){
            // Log Error
            // TODO: Change this to use ErrorHandler.accountNotFound();
            log.error("ERROR: Account Number " + accountKey + " not found -- SOURCE: sendInvite()");
            ErrorHandler.accountNotFound();
            return false;
        }

        // Get email sender's name to use in message body
        String senderName = account.getFirstName() + " " + account.getLastName();

        VerificationToken verificationToken = new VerificationToken(UUID.randomUUID().toString());
        tokenRepository.save(verificationToken);

        // TODO save token to database associated with account.

        // Build the message
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
     * This method sends an email to the user who requested their password be reset.
     * @param accountEmail
     * @return
     */
    public boolean sendForgotPassword(String accountEmail){
        log.info("Sending Forgotten Password");

        //Get the forgetter's account
        // Account account = accountRepository.findAccountByAccountKey(accountKey);
        Account account = accountRepository.findAccountByEmail(accountEmail);

        //Verify the forgetter's account exists
        if(account == null){
            // Log Error
            // TODO: Change this to use ErrorHandler.accountNotFound();
            log.error("ERROR: Account Number " + accountEmail + " not found -- SOURCE: generateForgotPasswordLink()");
            ErrorHandler.accountNotFound();
            return false;
        }

        //Hold the link to the new password page
        String webUrl = "http://localhost:4200/new_password/";

        //Create the unique hash
        int hash = Objects.hash(account.getEmail(), LocalDate.now());
        String hashedLink = String.valueOf(hash);

        //Get the time the link was created
        LocalDateTime timeCreated = LocalDateTime.now();

        //Save the hash to the users account
        account.setForgotPassHash(hashedLink);

        //Save the date created to the users account
        account.setForgotPassDate(timeCreated);

        //Save the account
        accountRepository.save(account);

        //Build the final url
        webUrl += hashedLink;

        //Send the email
        String senderName = account.getFirstName() + " " + account.getLastName();

        //Build the message
        String messageSubject = "Forgot password";
        String messageBody = "The account for: '" + senderName + "' has requested to reset their forgotten password.\n" +
                "To reset your forgotten password, please go to:\n" +
                webUrl +
                " \nThis link will expire in 24 hours.";

        //Send out email
        sendEmail(account.getEmail(), messageSubject, messageBody);
        log.debug("Send email to " + account.getEmail() + "with link: " + webUrl);
        return true;
    }


    /**
     * Sets a new password from a forgot password link
     * @param forgotPassHash: The forgotPassHash value that was tied to this request
     * @param newPassword: The updated password
     * @return: true, if saving the new password was successful
     */
    public boolean setNewPassword(String forgotPassHash, String newPassword){
        // Find the account with the associated forgotPassHash
        Account account = accountRepository.findAccountByForgotPassHash(forgotPassHash);

        if (account == null){
            ErrorHandler.accountNotFound();
            return false;
        }

        // Hash the new password and update the database as such
        account.setPassword(passwordEncoder.encode(newPassword));

        // Save the changes
        accountRepository.save(account);

        // Send a confirmation email
        sendEmail(account.getEmail(), "Password Updated", "The password for the account linked to this email address has been updated.");

        return true;
    }


    /**
     * Validates the current password for security,
     * and changes the user's password to the supplied input
     * @param accountKey: The account key for the current user
     * @param currentPassword: The user's current password
     * @param newPassword: The user's new password to be set
     * @return: True if successful
     */
    public boolean changePassword(int accountKey, String currentPassword, String newPassword){
        //Find the account based on the account key
        Account account = accountRepository.findAccountByAccountKey(accountKey);

        if (account == null){
            ErrorHandler.accountNotFound();
            return false;
        }

        if (!passwordEncoder.matches(currentPassword, account.getPassword())){
            ErrorHandler.incorrectPassword();
            return false;
        }

        // Hash the new password and update the database as such
        account.setPassword(passwordEncoder.encode(newPassword));

        // Save the changes
        accountRepository.save(account);

        // Send a confirmation email
        sendEmail(account.getEmail(), "Password Updated", "The password for the account linked to this email address has been updated.");

        return true;
    }


    /**
     * This method sends an email to the account associated with the given account key.
     * @param accountEmail
     * @return
     */
    public boolean sendForgotAccount(String accountEmail){
        //Get the forgetter's account
        Account account = accountRepository.findAccountByEmail(accountEmail);

        //Verify the forgetter's account exists
        if(account == null){
            // Log Error
            // TODO: Change this to use ErrorHandler.accountNotFound();
            log.error("ERROR: Account email " + accountEmail + " not found -- SOURCE: sendForgotAccount()");
            ErrorHandler.emailNotFound();
            return false;
        }

        //Send the email
        String senderName = account.getFirstName() + " " + account.getLastName();

        //Build the message
        String messageSubject = "Forgot Account";
        String messageBody = "The account for: '" + senderName + "' has forgotten their account information.\n" +
                "Your account's schoolid is: " + account.getSchoolId() + "\n"
                + "If you are receiving this email, then use this email and your password to login.";

        //Send out email
        sendEmail(account.getEmail(), messageSubject, messageBody);
        log.debug("Sent 'Forgot account' email to " + account.getEmail());
        return true;
    }


    /**
     * Creates a link to delete a users account.
     * @param accountKey The unique id for the users account.
     * @return The generated link for deleting a users account.
     */
    public String generateDeletionLink(int accountKey){
        //Get the sender's account
        Account account = accountRepository.findAccountByAccountKey(accountKey);

        //Verify the sender's account exists
        if(account == null){
            // Log Error
            // TODO: Change this to use ErrorHandler.accountNotFound();
            log.error("ERROR: Account Number " + accountKey + " not found -- SOURCE: generateDeletionLink()");
            ErrorHandler.accountNotFound();
            return "error";
        }

        //Hold the link to the delete page
        String webUrl = "http://localhost:4200/delete_page/";

        //Create the unique hash
        int hash = Objects.hash(account.getEmail(), LocalDate.now());
        String hashedLink = String.valueOf(hash);

        //Get the time the link was created
        LocalDateTime timeCreated = LocalDateTime.now();

        //Save the hash to the users account
        account.setDeleteLinkHash(hashedLink);

        //Save the date created to the users account
        account.setDeleteLinkDate(timeCreated);

        //Save the account
        accountRepository.save(account);

        //Build the final url
        webUrl += hashedLink;

        //Return the deletion link to the caller
        return webUrl;
    }


    /**
     * Used to send the generated link to the users email.
     * @param accountKey The id associated with the users account.
     * @param deleteLinkHash The link used to help the user delete their account.
     * @return True if nothing goes wrong.
     */
    public boolean sendDeleteEmail(int accountKey, String deleteLinkHash){
        //Get the sender's account
        Account account = accountRepository.findAccountByAccountKey(accountKey);

        //Verify the sender's account exists
        if(account == null){
            // Log Error
            // TODO: Change this to use ErrorHandler.accountNotFound();
            log.error("ERROR: Account Number " + accountKey + " not found -- SOURCE: sendInvite()");
            ErrorHandler.accountNotFound();
            return false;
        }

        // Get email sender's name to use in message body
        String senderName = account.getFirstName() + " " + account.getLastName();

        //Build the message
        String messageSubject = "Account Removal Requested";
        String messageBody = "The account for: '" + senderName + "' has been requested to be deleted.\n" +
                             "To delete your account, please go to:\n" +
                    deleteLinkHash +
                             " \nThis link will expire in 24 hours.";

        //Send out email
        sendEmail(account.getEmail(), messageSubject, messageBody);
        log.debug("Send email to " + account.getEmail() + "with link: " + deleteLinkHash);

        //Return success
        return true;
    }


    /**Checks if an Account already has a value in requestedRole.
       If they do, return false - users can only request one role at a time.
       Otherwise, set requestedRole and return true.
     */
    public boolean requestRole(int accountKey, AccountRoles role) {
        Account account = accountRepository.findAccountByAccountKey(accountKey);
        // Check if an account role request already exists.
        // This value will be reset to null once the request is either accepted or denied.
        if (account.getRequestedRole() != null) {
            return false;
        }
        else {
            account.setRequestedRole(role);
            accountRepository.save(account);
            return true;
        }
    }

    /**
     * Returns a list of all role requests..
     */
    public ArrayList<RoleRequest> getAllRoleRequests(){
        ArrayList<RoleRequest> allRoleRequests = new ArrayList<RoleRequest>();
        ArrayList<Account> accountsWithRequests = accountRepository.findByRequestedRoleIsNotNull();
        //Transfer necessary information to our list of roles.
        for (Account a : accountsWithRequests) {
            RoleRequest newRequest = new RoleRequest();
            newRequest.setAccountId(a.getAccountKey());
            newRequest.setFirstName(a.getFirstName());
            newRequest.setLastName(a.getLastName());
            newRequest.setEmail(a.getEmail());
            //The requested role can only be committee chair or committee member.
            if (a.getRequestedRole() == AccountRoles.chair) {
                newRequest.setRole("Committee Chair");
            }
            else {
                newRequest.setRole("Committee Member");
            }
            allRoleRequests.add(newRequest);
        }

        return allRoleRequests;
    }


    /**
     * Sends an email to the specified recipient.
     * @param recipient The person receiving the email.
     * @param subject Subject of the email.
     * @param body Body of the email.
     */
    public void sendEmail(String recipient, String subject, String body){
        log.debug("Sending email to " + recipient);
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
     * Delete the account that has been requested via email to delete.
     * @param generatedHash
     * @return
     */
    public boolean deleteAccount(String generatedHash){
        //Find the account associated with the hash
        Account account = accountRepository.findAccountByDeleteLinkHash(generatedHash);

        //Verify the sender's account exists
        if(account == null){
            // Log Error
            // TODO: Change this to use ErrorHandler.accountNotFound();
            log.error("ERROR: Account Number " + account.getAccountKey() + " not found -- SOURCE: sendInvite()");
            ErrorHandler.accountNotFound();
            return false;
        }

        //Verify the hash has not expired
        if(account.getDeleteLinkDate().plusDays(1).isBefore(LocalDateTime.now())){ //If it is past the 'link day +1 day', then 24 hours have passed
            //Remove the existing hash data, as it's too late to delete the account

            //Save the hash to the users account
            account.setDeleteLinkHash(null);

            //Save the date created to the users account
            account.setDeleteLinkDate(null);

            //Save the account
            accountRepository.save(account);

            //Return error
            return false;
        }
        else{
            //Delete the found account
            accountRepository.delete(account);

            //Send out an email guilt-tripping the user for deleting their account
            String messageSubject = "Your account was deleted!";
            String messageBody = "We hate to see you go! Please consider signing up for more scholarship opportunities";

            //Send out email
            sendEmail(account.getEmail(), messageSubject, messageBody);
        }

        //Return success
        return true;
    }
}

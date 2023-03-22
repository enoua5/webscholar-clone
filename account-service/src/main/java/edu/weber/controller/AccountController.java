package edu.weber.controller;

import edu.weber.model.Account;
import edu.weber.model.AccountRoles;
import edu.weber.model.LoginDto;
import edu.weber.service.AccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * This class handles user logins as well as user registrations.
 * Note: This class does not have '@RestController("account")' API path specified here.
 * The path is specified in the 'config-services/src/resources/shared/account-service.yaml' file.
 */
//This is the CORS setting that allows the angular app on port 4200 to access these APIs which are on port 6001
@CrossOrigin(origins = "http://localhost:4200")
@RestController //Path = '/account'
public class AccountController {

    /**
     * This is the logger which uses the slf4j logging facade API.
     * The logging framework that slf4j interfaces with is LogBack.
     * Both slf4j and LogBack are available with Spring Boot.
     * If you would like slf4j to interface with a different logging
     * framework (like log4j), consult the slf4j documentation.
     */
    private final Logger log = LoggerFactory.getLogger(getClass());

    /**
     * This is the declared repository. Note that it does not have to be
     * instantiated. This is because the '@Autowired' annotation tells
     * spring to inject the instance at run time.
     */
    @Autowired
    private AccountService accountService;// = new AccountService();

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    /**
     * This method takes login credentials sent from the frontend and returns the associated account.
     * An http error is thrown if the given login details are incomplete.
     * An http error is thrown if the account could not be found with the given login credentials.
     *
     * @param loginDto The login credentials model. Spring automatically converts the sent json object into a model.
     * @return The found account object (automatically serialized into a json object by jackson serializer)
     */
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public Account login(@Valid @RequestBody LoginDto loginDto, BindingResult result) {

        //Validate input
        if (result.hasErrors()) {

            // Log error
            log.error("ERROR: Invalid Data -- SOURCE: login()");

            //Throw http error
            invalidData();
        }

        //Find the account
        Account found = accountService.accountRepository.findAccountByEmail(loginDto.getEmail());

        //If null, the account does not exist
        if (found == null) {

            // Log error
            log.error("ERROR: Account does not exist -- SOURCE: login()");

            //Throw http error
            accountNotFound();
        }

        /*
            TODO: This code will be changed once weber state oauth2 login is implemented

            TODO: Verify password hash (for non-oauth login)
            Check password encryption
            Throw error if the password is incorrect
         */

        //Verify the hashed password matches
        log.info("Found account, comparing against " + loginDto.getPassword());
        if( passwordEncoder.matches(loginDto.getPassword(), found.getPassword()) ){
            //Return the found account data to the frontend
            return found;
        }
        else{
            log.error("ERROR: Account password does not match. Expected: " + found.getPassword() + " Actual: " + passwordEncoder.encode(loginDto.getPassword()));
            accountNotFound();
            return null;
        }
    }


    /**
     * This method creates a new account. First, json data from the frontend is converted to an 'Account' model
     * if possible. Then, the account is saved to the database.
     *
     * @param account The 'Account' object created with data sent from the frontend.
     */
    @RequestMapping(path = "/create", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Account createNewAccount(@Valid @RequestBody Account account, BindingResult result) {


        log.info(account.toString());
        //Validate account information (input validation)
        if (result.hasErrors()) {

            //Log Error
            log.error("ERROR: Invalid Data -- SOURCE: createNewAccount()");

            //Throw error
            invalidData();
        } else {

            //TODO: Send a confirmation email (not necessary for weber state oauth2 login)
            //Presently, outlook blocks api calls if it thinks you're 'spamming' from too many tests
            //We should probably setup something a little more permanent. But services like outlook, gmail require 2FA (IE a phone number) to use a api-key right now.

            accountService.sendEmail(account.getEmail(), "Registration email", "Thank you for registering!");

            //Encrypt the password
            account.setPassword(passwordEncoder.encode(account.getPassword()));

            //Create an account in the database
            accountService.accountRepository.save(account);

            return account;
        }
        return null;
    }

    /**
     * This method checks to see if the email already exists in the DB to prevent dupe accounts during registration
     *
     * @param email Email to use in DB search
     */
    @RequestMapping(value = "/emailExists", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Boolean emailExists(@RequestParam String email) {
        log.info("Entering emailExists");
        return accountService.accountRepository.findAccountByEmail(email) != null;
    }

    /**
     * This method updates the account details of the user by using the specified account key.
     *
     * @param accountKey    The key used to find the users account from the database.
     * @param updateAccount The form object sent from the frontend that is converted into an account model object.
     */
    @RequestMapping(path = "/update/{accountKey}", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public String updateProfile(@PathVariable int accountKey, @RequestBody Account updateAccount, BindingResult result) {

        //Validate input
        if (result.hasErrors()) {

            // Log error
            log.error("ERROR: Invalid Data -- SOURCE: saveChanges()");

            //Throw http error
            invalidData();
        }

        //Overwrite the existing account data with the new account data
        if (!accountService.updateProfile(accountKey, updateAccount)) {

            // Log error
            log.error("ERROR: Account could not be saved -- SOURCE: saveChanges()");

            //Throw http error if account could not be saved
            accountNotFound();
        }

        return "done";
    }

    @RequestMapping(path = "/forgotPassword", method = RequestMethod.POST)
    public String forgotPassword(@RequestParam String accountEmail){
        log.info("Entering forgotPassword");

        Account found = accountService.accountRepository.findAccountByEmail(accountEmail);
        if(found == null){
            accountNotFound();
            log.error("Could not find the account");
            return "Could not find the account via accountKey.";
        }
        if(!accountService.sendForgotPassword(accountEmail)){
            log.error("Failed to send forgotten password.");
        }

        log.info("Successfully sent forgot password email");
        return "done";
    }

    // TODO: Frontend
    //  Get the hashed value from the webURL: account/new_password/<HASH VALUE>.
    //  Then call forgotPassHashExists()
    //  This method could instead return a boolean, if desired.

    /**
     * Checks validity of the provided forgotPassHash.
     * Must exist in the database and must have been created within 24 hours.     *
     * @param forgotPassHash: The hashed value that is related to this request
     * @return: An error message in String format, or "True"
     */
    @RequestMapping(path = "/forgotPassHashExists", method = RequestMethod.POST)
    public String forgotPassHashExists(@RequestParam String forgotPassHash){
        Account account = accountService.accountRepository.findAccountByForgotPassHash(forgotPassHash);
        if (account == null){
            accountNotFound();
            log.error("No account exists with that forgot password hash.");
            return "No account exists with that forgot password hash.";
        }
        if (LocalDateTime.now().isAfter(account.getForgotPassDate().plusHours(24)))
        {
            accountNotFound();
            log.error("This forgot password hash has expired.");
            return "This hash was issued more than 24 hours ago";
        }
        return "True";
    }

    // TODO: Frontend
    //  Call setNewPassword once the user has hit submit on the new-password-form

    /**
     * Sets a new password for the associated account and saves it to the database.
     * @param forgotPassHash: The forgotPassHash related to this request
     * @param newPassword: The updated password the user would like to set
     * @return: "done" if password was correctly set.
     */
    @RequestMapping(path = "/setNewPassword", method = RequestMethod.POST)
    public String setNewPassword(String forgotPassHash, String newPassword){
        if (accountService.setNewPassword(forgotPassHash, newPassword)){
            return "done";
        }
        return "Error setting the new password. Password was not saved.";
    }

    @RequestMapping(path = "/forgot/account", method = RequestMethod.POST)
    public String forgotAccount(@RequestParam String accountEmail){
        Account found = accountService.accountRepository.findAccountByEmail(accountEmail);
        if(found == null){
            accountNotFound();
            log.error("Could not find an account associated with that email.");
            return "Could not find the account via accountEmail. Either email is incorrect, or no account with that email is registered";
        }
        if(!accountService.sendForgotAccount(accountEmail)){
            log.error("Failed to send forgotten account.");
        }

        return "done";
    }

    /**
     * This method allows a user to send a registration invitation email.
     * 
     * The email is sent by the 'company' email. This is the email used
     * for the final product in deployment.
     *
     * @param accountKey        The account id of the person wanting to send the invite.
     * @param recipientEmail    The email the person is sending the invite to.
     * 
     * Incorrectly formatted email addresses entered for recipientEmail 
     * will be met with SMTPAddressFailedException 553 (no email sent).
     *
     * Correctly formatted email addresses which don't exist will receive 
     * an "address not found" email reply back to the smtp server that is 
     * specified in the bootstrap.yml file (email sent, but does not reach 
     * a destination).
     */
    @GetMapping("/send_invite/{accountKey}")
    public String sendInvite(@PathVariable int accountKey, @PathVariable String recipientEmail) {

        log.error("Okay going to try to send an invite with " + accountKey + " to " + recipientEmail);
        //Attempt sending the mail
        if(!accountService.sendInvite(accountKey, recipientEmail)) {

            //Throw http error if account could not be found 
            accountNotFound();
            return "Account not found.";
        }

        //If no errors occur, a http ok response will be sent
        return "Email successfully sent!";
    }


    /**
     * This method allows a user to send a registration invitation email with a specified user role.
     *
     * The email is sent by the 'company' email. This is the email used
     * for the final product in deployment.
     *
     * @param recipientEmails    The emails the person is sending the invite to.
     * @param roleName          The name of the role person is being invited to register as.
     *
     * Incorrectly formatted email addresses entered for recipientEmail
     * will be met with SMTPAddressFailedException 553 (no email sent).
     *
     * Correctly formatted email addresses which don't exist will receive
     * an "address not found" email reply back to the smtp server that is
     * specified in the bootstrap.yml file (email sent, but does not reach
     * a destination).
     */
    @GetMapping("/send_registration_invite/{roleName}/")
    public String sendInviteWithRole(@RequestParam String[] recipientEmails, @RequestParam int accountKey, @PathVariable String roleName) {
        String role = "";
        switch (roleName) {
            case "student":
                role = "student";
                break;
            case "committeeMember":
                role = "committeeMember";
                break;
            case "chair":
                role = "chair";
                break;
            default:
                break;
        }

        if (role == null) {
            return "Incorrect format for roleName. Valid options are /'student/', /'committeMember/', or /'chair/'\n";
        }


        for (String recipientEmail : recipientEmails)
        {
            if (!accountService.sendRegistrationInvite(recipientEmail, accountKey, role))
            {
                accountNotFound();
            }

        }
        return "Email sending successful.";
    }

    @GetMapping("/is_token_valid/")
    public Boolean tokenValid(@RequestParam String inputToken) {

        if (accountService.tokenRepository.findAccountByToken(inputToken) != null) return true;

        return false;
    }


    /**
     * This method sends out an email to the user with a custom link
     * that must be clicked in order to delete their account. The link
     * should direct them to the 'delete' page for web scholar. When they
     * click 'yes, delete account' the 'deleteAccount' API will be called.
     * @param accountKey
     */
    @GetMapping("/request_account_deletion/{accountKey}")
    public void requestAccountRemoval(@PathVariable int accountKey){

        //Generate the link and save it to the users account
        String emailLink = accountService.generateDeletionLink(accountKey);

        //If 'error', the account does not exist
        if (emailLink.equals("error")) {

            // Log error
            log.error("ERROR: Account does not exist -- SOURCE: login()");

            //Throw http error
            accountNotFound();
        }

        //Send out the email using the link
        if(!accountService.sendDeleteEmail(accountKey, emailLink)) {

            // Log error
            log.error("ERROR: Account does not exist -- SOURCE: login()");

            //Throw http error
            accountNotFound();
        }

    }

    /**
     * This method actually deletes the users account using the generated
     * link we sent them in the email which will send them to the 'delete'
     * page for web scholar. Web scholar will then send the generated
     * link to this method to delete the account when the users clicks
     * a 'yes, delete account' button.
     * @param linkHash The hash sent out as part of the link emailed to the user.
     */
    @GetMapping("/delete_account") //WAS: /delete_account/{generatedLink}
    public void deleteAccount(@RequestParam String linkHash){ //WAS: @pathvariable

        /*
        Note: We want just the query string, not the whole link!
        The frontend should pull the query string from the url
        and send it to this API when the 'yes, delete account' button
        is clicked by the user.

        e.g. Not this >> http://localhost:4200/delete_page/?hashedlinkhere
        e.g. Just this >> hashedlinkhere
         */

        //Take the hash and find and delete the associated account
        if(!accountService.deleteAccount(linkHash)){

            // Log error
            log.error("ERROR: Account does not exist -- SOURCE: login()");

            //Throw http error
            accountNotFound();
        }
    }

    /**
     * Send an http response error if data sent did not follow model restrictions.
     */
    public void invalidData() {

        throw new ResponseStatusException(HttpStatus.PARTIAL_CONTENT, "The data sent was incomplete or invalid!");
    }

    /**
     * Send an http response error if the specified account could not be found.
     */
    public void accountNotFound() {

        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "The account could not be found!");
    }


    /*
    ----------------------------------------------------------------
    ------------- ARC API testing code lives down here -------------
    ----------------------------------------------------------------
     */


    /**
     * This method simply tests to see if the API is accessible.
     * Please use ARC (advanced REST client) or postman to test.
     * Set advanced REST client to use 'GET' for the request.
     * Point the url to 'http://localhost:6001/account/test_me'
     * Note: Run docker for all services. Then you can access the live API method.
     * Note: Advanced REST client ignores crossOrigin. This value can only be tested on the frontend.
     *
     * @return Returns hello word as a string
     */
    @GetMapping("/test_me")
    public String testy() {

        // Log access to test page
        log.info("Test page as been accessed -- SOURCE: testme()");

        // This just verifies that the ERROR log level is active
        log.error("No actual error!  Just testing error log level -- SOURCE: testme()");

        return "hello world : version 1.0\n";
    }


    /**
     * This method creates a dummy account for testing purposes.
     * Use advanced REST client to access this API.
     * After running this API, attempt to login through the frontend with the below credentials.
     * @return The account in string form.
     */
    @PostMapping("/make_test_account")
    public String makeDummyAccount() {

        //Set non-blank values
        String email = "test@test.com";
        String password = "myPassword";
        String schoolId = "W012345678";
        Boolean isActive = true;
        String userType = "student";
        String firstName = "Bobby";
        String lastName = "Joe";

        //Create the account
        Account account = new Account(email, password, schoolId, isActive, userType, firstName, lastName);

        //Encrypt the password
        account.setPassword(passwordEncoder.encode(account.getPassword()));

        //Save the account to the database
        accountService.accountRepository.save(account);

        //Return success message and account details
        return "Success! Account Created!\nDetails:\n" + account.toString();
    }

/**
    * This method creates a dummy account for the issue testing purposes.
    * At present, this does not work; instead, use localhost:6001/account/create
    *       POST, using Body set to JSON:
             *       {
             * 	"accountKey":  0,
             * 	"email": "HumanManPerson@weber.mail.edu",
             * 	"password": "password123",
             * 	"schoolId": "w01010110",
             * 	"active": "false",
             * 	"userType": "student",
             * 	"firstName": "person",
             * 	"middleName": "b" ,
             * 	"lastName": "humanman",
             * 	"address1": "123street",
             * 	"address2": "apart20",
             * 	"city": "cityplace",
             * 	"state": "utah",
             * 	"zipCode": "99999",
             * 	"school": "weber",
             * 	"sex": "male",
             * 	"race": "human"
             * }
    * @return The account in string form.
    */
    @PostMapping("/make_test_account_for_issue")
    public String makeDummyAccountForIssue() {

        //Set non-blank values
        String email = "supertestingemail3000@gmail.com";
        String password = "Weber123A!?@";
        String schoolId = "20210722";
        Boolean isActive = true;
        AccountRoles userType = AccountRoles.student;
        String firstName = "Akshan";
        String lastName = "Shurima";

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        password = bCryptPasswordEncoder.encode(password);

        //Create the account
        Account account = new Account(email, password, schoolId, isActive, "student", firstName, lastName);

        //Save the account to the database
        accountService.accountRepository.save(account);

        //Return success message and account details
        return "Success! Account Created!\nDetails:\n" + account.toString();
    }


    /**
     * Returns all accounts in the database.
     * @return All the accounts as a json object.
     */
    @GetMapping("/get_all_accounts")
    public List<Account> getAllAccounts(){
        //Find all accounts starting after id = 0
        return accountService.accountRepository.findAllByAccountKeyAfter(0);
    }

}

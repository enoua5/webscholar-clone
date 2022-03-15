package edu.weber.controller;

import com.sun.org.apache.xpath.internal.operations.Bool;
import edu.weber.model.Account;
import edu.weber.model.AccountRoles;
import edu.weber.model.LoginDto;
import edu.weber.repository.TokenRepository;
import edu.weber.service.AccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
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

        //Return the found account data to the frontend
        return found;
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
    public void createNewAccount(@Valid @RequestBody Account account, BindingResult result) {


            log.info(account.toString());
        //Validate account information (input validation)
        if (result.hasErrors()) {

            //Log Error
            log.error("ERROR: Invalid Data -- SOURCE: createNewAccount()");

            //Throw error
            invalidData();
        } else {

            //TODO: Send a confirmation email (not necessary for weber state oauth2 login)

            //Create an account in the database
            accountService.accountRepository.save(account);
        }
    }

    /**
     * This method checks to see if the email already exists in the DB to prevent dupe accounts during registration
     *
     * @param email Email to use in DB search
     */
    @RequestMapping(value = "/emailTaken", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Boolean emailTaken(@RequestParam String email) {
        return accountService.accountRepository.findAccountByEmail(email) != null;
    }

    /**
     * This method updates the account details of the user by using the specified account key.
     *
     * @param accountKey    The key used to find the users account from the database.
     * @param updateAccount The form object sent from the frontend that is converted into an account model object.
     */
    @RequestMapping(path = "/update/{accountKey}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void saveChanges(@PathVariable int accountKey, @RequestBody Account updateAccount, BindingResult result) {

        //Validate input
        if (result.hasErrors()) {

            // Log error
            log.error("ERROR: Invalid Data -- SOURCE: saveChanges()");

            //Throw http error
            invalidData();
        }

        //Overwrite the existing account data with the new account data
        if (!accountService.saveChanges(accountKey, updateAccount)) {

            // Log error
            log.error("ERROR: Account could not be saved -- SOURCE: saveChanges()");

            //Throw http error if account could not be saved
            accountNotFound();
        }
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
    @GetMapping("/send_invite/{accountKey}/{recipientEmail}")
    public void sendInvite(@PathVariable int accountKey, @PathVariable String recipientEmail) {

        //Attempt sending the mail
        if(!accountService.sendInvite(accountKey, recipientEmail)) {

            //Throw http error if account could not be found 
            accountNotFound();
        }

        //If no errors occur, an http ok response will be sent
    }

    /**
     * This method allows a user to send a registration invitation email with a specified user role.
     *
     * The email is sent by the 'company' email. This is the email used
     * for the final product in deployment.
     *
     * @param recipientEmail    The email the person is sending the invite to.
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
    @GetMapping("/send_registration_invite/{recipientEmail}/{roleName}")
    public String sendInviteWithRole(@PathVariable String recipientEmail, @PathVariable String roleName) {
        AccountRoles role = null;
        switch (roleName) {
            case "student":
                role = AccountRoles.student;
                break;
            case "committeMember":
                role = AccountRoles.committeeMember;
                break;
            case "chair":
                role = AccountRoles.chair;
                break;
            default:
                break;
        }

        if (role == null) {
            return "Incorrect format for roleName. Valid options are /'student/', /'committeMember/', or /'chair/'\n";
        }

        if (!accountService.sendRegistrationInvite(recipientEmail, role))
        {
            accountNotFound();
        }

        return "Email for " + role + " has been sent!";

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
    //TODO: Create an method that sends an email for deleting an account
    @GetMapping("/request_account_deletion/{accountKey}")
    public void requestAccountRemoval(@PathVariable int accountKey){

        //Generate the link and save it to the users account
        String emailLink = accountService.generateLink(accountKey);

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
    @GetMapping("/delete_account/{generatedLink}")
    public void deleteAccount(@PathVariable String linkHash){

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
        AccountRoles userType = AccountRoles.student;
        String firstName = "Bobby";
        String lastName = "Joe";

        //Create the account
        Account account = new Account(email, password, schoolId, isActive, userType, firstName, lastName);

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

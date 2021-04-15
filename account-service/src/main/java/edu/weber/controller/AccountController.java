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
    public Account login(@Valid @ModelAttribute LoginDto loginDto, BindingResult result) {

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
    public void createNewAccount(@Valid @ModelAttribute Account account, BindingResult result) {

        System.out.println(account.toString());

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
     * This method updates the account details of the user by using the specified account key.
     *
     * @param accountKey    The key used to find the users account from the database.
     * @param updateAccount The form object sent from the frontend that is converted into an account model object.
     */
    @RequestMapping(path = "/update/{accountKey}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void saveChanges(@PathVariable int accountKey, @ModelAttribute Account updateAccount, BindingResult result) {

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
     * <p>
     * The email is sent by the 'company' email. This is the email used
     * for the final product in deployment.
     *
     * @param accountId The account id of the person wanting to send the invite.
     * @param email     Tthe email the person is sending the invite to.
     */
    @PostMapping("/send_invite/{accountId}/{email}")
    public void sendInvite(@PathVariable int accountId, @PathVariable String email) {

        //Send an email here.
        //The sender email would be the email for the company (use a test email for now)
        //The 'to' email should be the email the user passed in
        //Send a message that includes the senders name
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

        return "hello world\n";
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
        String username = "bobbyJoeJuniorTheThird";
        String password = "myPassword";
        String schoolId = "W012345678";
        Boolean isActive = true;
        AccountRoles userType = AccountRoles.student;
        String firstName = "Bobby";
        String lastName = "Joe";

        //Create the account
        Account account = new Account(email, username, password, schoolId, isActive, userType, firstName, lastName);

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

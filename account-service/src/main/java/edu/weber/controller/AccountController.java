package edu.weber.controller;

import edu.weber.domain.Account;
import edu.weber.domain.LoginDto;
import edu.weber.domain.ResponseData;
import edu.weber.service.AccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

/**
 * This class handles user logins as well as user registrations.
 * Note: This class does not have '@RestController("account")' API path specified here.
 * The path is specified in the 'config-services/src/resources/shared/account-service.yaml' file.
 */
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
     *
     * @param loginDto The login credentials model.
     * @return The account object (automatically serialized into a json object by jackson serializer)
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
        TODO: Verify password hash
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

        //Data returned to frontend
        ResponseData responseData = new ResponseData();

        //Validate account information (input validation)
        if (result.hasErrors()) {

            responseData.setSuccess(false);

            //Log Error
            log.error("ERROR: Invalid Data -- SOURCE: createNewAccount()");

            //Throw error
            invalidData();
        } else {

            //Create an account in the database
            accountService.accountRepository.save(account);
            responseData.setSuccess(true);
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
    Test code lives down here
     */


    /**
     * This method simply tests to see if the API is accessible.
     * Please use advanced REST client to test.
     * Set advanced REST client to use 'GET' for the request.
     * Point the url to 'http://localhost:6001/account/testme'
     * Note: Run docker for all services. Then you can access the live API method.
     * Note: Advanced REST client ignores crossOrigin. This value can only be set on the frontend.
     *
     * @return Returns hello word as a string
     */
    @GetMapping("testme")
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
     */
    @PostMapping("/make_test_account")
    public String makeDummyAccount() {

        //Create the account
        Account account = new Account();
        account.setEmail("test@test.com");
        account.setUsername("test");
        account.setPassword("test");
        account.setSchoolId("W12345678");
        account.setActive(true);

        //Save the account to the database
        accountService.accountRepository.save(account);

        //Return success message and account details
        return "Success! Account Created!\nDetlais:\n" + account.toString();
    }


    /**
     * IGNORE THIS METHOD
     * This method is the same as the 'createNewAccount' method above. However, it manually creates
     * the 'Account' object from the json data.
     *
     * @param formData The json data from the frontend that should contain fields correlating to the 'Account' object.
     * @return Returns the account email field that was sent from the frontend.
     */
    @RequestMapping(path = "/test", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public String createNewAccount(@RequestBody MultiValueMap<String, String> formData) {

        //Note: this code has been moved to 'AccountService' as it is business logic
        //json parsing....
        Account account = new Account();
        account.setEmail(formData.getFirst("email"));
        account.setUsername(formData.getFirst("username"));
        account.setPassword(formData.getFirst("password"));
        account.setSchoolId(formData.getFirst("schoolId"));
        account.setActive(Boolean.parseBoolean(formData.getFirst("active")));

        return account.getEmail();
    }


    /**
     * IGNORE THIS METHOD
     * This method is the same as the 'createNewAccount' method above. However, it does not send an http
     * response packet to tell the frontend if it succeeded or note. In addition, it only sends a field from
     * the data sent to it.
     *
     * @param account Converts json data sent from the frontend into an 'Account' model object.
     * @return Returns the account email field sent from the frontend.
     */
    @RequestMapping(path = "/test2", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String createTest2Account(@ModelAttribute Account account) {
        //json parsing....

        return account.getEmail();
    }

}

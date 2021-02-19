package edu.weber.controller;

import edu.weber.domain.Account;
import edu.weber.domain.ResponseData;
import edu.weber.service.AccountService;
import edu.weber.service.AccountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

/**
 * This class handles user logins as well as user registrations.
 * Note: This class does not have '@RestController("accounts")' API path specified here.
 * The path is specified in the 'account-service.yaml' file.
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AccountController {

    /**
     * This is the declared repository. Note that it does not have to be
     * instantiated. This is because the '@Autowired' annotation tells
     * spring to inject the instance at run time.
     */
    @Autowired
    private AccountService accountService;// = new AccountServiceImpl();


    /**
     * This method returns an account using the specified key given.
     *
     * @param accountKey The key used to find the account in the database
     * @return The found account is returned as an account model object converted to a json object.
     */
    @RequestMapping(path = "/{accountKey}", method = RequestMethod.GET)
    public Account getAccountByKey(@PathVariable int accountKey) {

        //Todo: throw error if the account is not found

        //Return the found account in the database
        return accountService.findByKey(accountKey);
    }


    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public Account login(@RequestParam LoginDto loginDto) {
        return new Account();  //For testing until we see what is coming in.
    }


    /**
     * This method creates a new account. First, json data from the frontend is converted to an 'Account' model
     * if possible. Then, the account is saved to the database.
     *
     * @param account  The 'Account' object created with data sent from the frontend.
     * @param response This object allows us to create and send a response to the frontend.
     * @return Tells the frontend if we succeeded in creating the account.
     */
    //TODO: Change this mapping. It makes debugging API paths confusing as hell. ("/create")
    @RequestMapping(path = "/", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseData createNewAccount(@ModelAttribute Account account, HttpServletResponse response) {

        //TODO: Find out if this code is necessary. The variable should already be auto injected by spring at run time.
        if (accountService == null) {
            accountService = new AccountServiceImpl();
        }

        //Ignore this code. It is setting access levels which should only be done in 'SecurityConfig'.
        //response.setHeader("Access-Control-Allow-Origin", "*");
        //response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH");
        //response.setHeader("Access-Control-Allow-Headers", "content-type");

        //TODO: Verify account information (input validation)

        //Create an account in the database
        accountService.create(account);

        //TODO: Return an error if the account information is invalid
        ResponseData responseData = new ResponseData();
        responseData.setSuccess(true);

        return responseData;
    }


    /**
     * This method updates the account details of the user by using the specified account key.
     *
     * @param accountKey The key used to find the users account from the database.
     * @param update     The form object sent from the frontend that is converted into an account model object.
     */
    @RequestMapping(path = "/update/{accountKey}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void saveChanges(@PathVariable int accountKey, @ModelAttribute Account update) {

        //TODO: Throw error if the account is not found

        //Overwrite the existing account data with the new account data
        accountService.saveChanges(accountKey, update);
    }


    /*
    Test code lives down here
     */


    /**
     * This method simply tests to see if the API is accessible.
     * Please use advanced REST client to test.
     * Set advanced REST client to use 'GET' for the request.
     * Point the url to 'http://localhost:6001/accounts/testme'
     * Note: Run docker for all services. Then you can access the live API method.
     * Note: Advanced REST client ignores crossOrigin. This value can only be set on the frontend.
     *
     * @return Returns hello word as a string
     */
    @GetMapping("testme")
    public String testy() {

        return "hello world";
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
        accountService.create(account);

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

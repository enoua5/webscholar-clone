package edu.weber.controller;

import edu.weber.model.Issue;
import edu.weber.service.IssueService;
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
 * Note: This class does not have '@RestController("issue")' API path specified here.
 * The path is specified in the 'config-services/src/resources/shared/issue-service.yaml' file.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class IssueController {

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
    private IssueService issueService;


    /**
     * This method creates a new issue. First, json data from the frontend is converted to a 'Issue.java' model
     * if possible. Then, the issue is saved to the database. This is the same as the issue setup
     *
     * @param issue The individual 'issue' object created with data sent from the frontend.
     */
    @RequestMapping(path = "/createIssue", method = RequestMethod.POST, // This might be something else. (URL WISE)
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @PostMapping("/createIssue")
    public void createNewIssue(@Valid @RequestBody Issue issue, BindingResult result) {

        // Validate issue information (input validation)
        if (result.hasErrors()) {

            //Log Error
            log.error("ERROR: Invalid Data -- SOURCE: createNewIssue()");

            //Throw http error
            invalidData();

        } else {

            // Save the new issue we just created to the database
            issueService.issueRepository.save(issue);
        }
    }


    /**
     * This method updates the individual issue information by using the specified issue id.
     *
     * @param issueId     The key used to find the issue from the database.
     * @param updateIssue The form object sent from the frontend that is converted into a issue model object.
     *                    (Might be something different here)
     */
    @RequestMapping(path = "/update/{issueId}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void saveChanges(@PathVariable int issueId, @RequestBody Issue updateIssue, BindingResult result) {

        //Validate input
        if (result.hasErrors()) {

            // Log error
            log.error("ERROR: Invalid Data -- SOURCE: saveChanges()");

            //Throw http error
            invalidData();
        }

        //Overwrite the existing issue data with the new issue data
        if (!issueService.saveChanges(issueId, updateIssue)) {

            // Log error
            log.error("ERROR: Issue.java could not be saved -- SOURCE: saveChanges()");

            //Throw http error if issue could not be saved
            issueNotFound();
        }
    }


    /**
     * This method deletes the issue by using the specified issue id.
     *
     * @param issueId -- The ID used to find the issue from the database.
     */
    @RequestMapping(path = "/delete/{issueId}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void deleteIssue(@PathVariable int issueId) {

        //Attempts to delete the issue
        if (!issueService.deleteIssue(issueId)) {

            // Log error
            log.error("ERROR: Issue.java could not be deleted -- SOURCE: deleteIssue()");

            //Throw http error if issue could not be deleted
            issueNotFound();
        }

    }


    /**
     * Send an http response error if data sent did not follow model restrictions.
     * (This is the same as the issue model
     */
    public void invalidData() {

        throw new ResponseStatusException(HttpStatus.PARTIAL_CONTENT, "The data sent was incomplete or invalid!");
    }

    /**
     * Send an http response error if the specified issue could not be found.
     */
    public void issueNotFound() {

        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "The issue could not be found!");
    }


    /*
    ----------------------------------------------------------------
    ------------- ARC API testing code lives down here -------------
    ----------------------------------------------------------------
     */


    /**
     * API Test for the Issue Service
     *
     * @return Returns "The Issue Service Was Successful!" as a string
     */
    @GetMapping("/test_me")
    public String testy() {

        log.info("Test page as been accessed -- SOURCE: testme()");

        // This just verifies that the ERROR log level is active
        log.error("No actual error!  Just testing error log level -- SOURCE: testme()");

        return "The Issue Service Was Successful!";
    }


//    /**
//     * This method creates a dummy issue for testing purposes.
//     * Use advanced REST client to access this API.
//     * After running this API, attempt to login through the frontend with the below credentials.
//     *
//     * @return The issue in string form.
//     */
//
//    @PostMapping("/make_test_issue")
//    public String makeTestIssue() {
//        ClientHttpRequestFactory requestFactory = new
//                HttpComponentsClientHttpRequestFactory(HttpClients.createDefault());
//
//        RestTemplate rest = new RestTemplate(requestFactory);
//
//        HttpHeaders headers = new HttpHeaders();
//        String body = "";
//
//        HttpEntity<String> requestEntity = new HttpEntity<String>(body, headers);
//        ResponseEntity<String> responseEntity = rest.exchange("http://host.docker.internal:6001/account/make_test_account_for_issue", HttpMethod.POST, requestEntity, String.class);
//        HttpStatus httpStatus = responseEntity.getStatusCode();
//        int responseStatus = httpStatus.value();
//        String response = responseEntity.getBody();
//        System.out.println("Response status: " + responseStatus);
//        System.out.println(response);
//
//        Account account = IssueService.accountRepository.findAccountByEmail("Akshan@gmail.com");
//        System.out.println(account.toString());
//
//        int reporterId = account.getAccountKey();
//
//        // Test Issue information
//        String status = "Test Status";
//        String summary = "Test Summary Information";
//        String description = "Test Description Information";
//        String severity = "Test Severity";
//        String priority = "Test Priority";
//        String steps = "Test Steps To Recreate";
//
//        // Create the issue: We're using reporter twice since we don't need to make a separate account.
//        Issue issue = new Issue(status, summary, description, severity, priority, steps, reporterId, reporterId);
//
//        // Save the issue to the database
//        issueService.issueRepository.save(issue);
//        // Return success message and issue information
//        return "Success! Issue Created!\nDetails:\n" + issue.toString();
//    }


    /**
     * Returns all issues in currently in the database
     *
     * @return All the issues as a json object.
     */
    @GetMapping("/get_all_issues")
    public List<Issue> getAllIssues() {

        // Find all accounts starting after id = 0
        return issueService.issueRepository.findAllByIssueIdAfter(0);
    }
}

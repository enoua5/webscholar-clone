package edu.weber.controller;

import edu.weber.model.accountScholarship;
import edu.weber.service.accountScholarshipService;
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
 * Note: This class does not have '@RestController("accountScholarship")' API path specified here.
 * The path is specified in the 'config-services/src/resources/shared/account-scholarship-service.yaml' file.
 */

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class accountScholarshipController {

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
    private accountScholarshipService AccountScholarshipService;

    /**
     * This method creates a new accountScholarship. First, json data from the frontend is converted to a 'Scholarship' model
     * if possible. Then, the accountScholarship is saved to the database.
     *
     * @param accountScholarship The 'accountScholarship' object created with data sent from the frontend.
     */
    @RequestMapping(path = "/create", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @PostMapping("/create")
    public void createNewAccountScholarship(@Valid @ModelAttribute accountScholarship AccountScholarship, BindingResult result) {

        //Validate accountScholarship information (input validation)
        if (result.hasErrors()) {

            //Log Error
            log.error("ERROR: Invalid Data -- SOURCE: createNewAccountScholarship()");

            //Throw http error
            invalidData();

        } else {

            //Save the new accountScholarship to the database
            accountScholarshipService.accountScholarshipRepository.save(AccountScholarship);
        }
    }

    /**
     * This method updates the scholarship details by using the specified scholarship id.
     *
     * @param accountScholarshipId     The key used to find the scholarship from the database.
     * @param updateAccountScholarship The form object sent from the frontend that is converted into a scholarship model object.
     */
    @RequestMapping(path = "/update/{comboId}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void saveChanges(@PathVariable int comboId, @ModelAttribute accountScholarship updateAccountScholarship, BindingResult result) {

        //Validate input
        if (result.hasErrors()) {

            // Log error
            log.error("ERROR: Invalid Data -- SOURCE: saveChanges()");

            //Throw http error
            invalidData();
        }

        //Overwrite the existing scholarship data with the new scholarship data
        if (!scholarshipService.saveChanges(scholarshipId, updateAccountScholarship)) {

            // Log error
            log.error("ERROR: accountScholarship could not be saved -- SOURCE: saveChanges()");

            //Throw http error if scholarship could not be saved
            scholarshipNotFound();
        }
    }

    /**
     * This method deletes the scholarship by using the specified scholarship id.
     *
     * @param scholarshipId -- The ID used to find the scholarship from the database.
     */
    @RequestMapping(path = "/delete/{comboId}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void deleteAccountScholarship(@PathVariable int comboId) {

        //Attempts to delete the scholarship
        if (!accountScholarshipService.deleteAccountScholarship(comboId)) {

            // Log error
            log.error("ERROR: accountScholarship could not be deleted -- SOURCE: deleteScholarship()");

            //Throw http error if scholarship could not be deleted
            accountScholarshipNotFound();
        }

    }

    /**
     * Send an http response error if data sent did not follow model restrictions.
     */
    public void invalidData() {

        throw new ResponseStatusException(HttpStatus.PARTIAL_CONTENT, "The data sent was incomplete or invalid!");
    }

    /**
     * Send an http response error if the specified accountScholarship could not be found.
     */
    public void accountScholarshipNotFound() {

        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "The accountScholarship could not be found!");
    }

}
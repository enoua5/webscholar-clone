package edu.weber.controller;

import edu.weber.model.Scholarship;
import edu.weber.service.ScholarshipService;
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
 * Note: This class does not have '@RestController("scholarship")' API path specified here.
 * The path is specified in the 'config-services/src/resources/shared/scholarship-service.yaml' file.
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ScholarshipController {

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
    private ScholarshipService scholarshipService;

    @Autowired
    private void setScholarshipService(ScholarshipService scholarshipService) {
        this.scholarshipService = scholarshipService;
    }


    /**
     * This method creates a new scholarship. First, json data from the frontend is converted to a 'Scholarship' model
     * if possible. Then, the scholarship is saved to the database.
     *
     * @param scholarship The 'Scholarship' object created with data sent from the frontend.
     */
    @RequestMapping(path = "/create", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @PostMapping("/create")
    public void createNewScholarship(@Valid @RequestBody Scholarship scholarship, BindingResult result) {

        //Validate scholarship information (input validation)
        if (result.hasErrors()) {

            //Log Error
            log.error("ERROR: Invalid Data -- SOURCE: createNewScholarship()");

            //Throw http error
            invalidData();

        } else {

            //Save the new scholarship to the database
            scholarshipService.scholarshipRepository.save(scholarship);
        }
    }


    /**
     * This method updates the scholarship details by using the specified scholarship id.
     *
     * @param scholarshipId     The key used to find the scholarship from the database.
     * @param updateScholarship The form object sent from the frontend that is converted into a scholarship model object.
     */
    @RequestMapping(path = "/update/{scholarshipId}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void saveChanges(@PathVariable int scholarshipId, @RequestBody Scholarship updateScholarship, BindingResult result) {

        //Validate input
        if (result.hasErrors()) {

            // Log error
            log.error("ERROR: Invalid Data -- SOURCE: saveChanges()");

            //Throw http error
            invalidData();
        }

        //Overwrite the existing scholarship data with the new scholarship data
        if (!scholarshipService.saveChanges(scholarshipId, updateScholarship)) {

            // Log error
            log.error("ERROR: Scholarship could not be saved -- SOURCE: saveChanges()");

            //Throw http error if scholarship could not be saved
            scholarshipNotFound();
        }
    }

    @RequestMapping(path = "/search", method = RequestMethod.GET)
    public List<Scholarship> searchScholarships(String query) {
        return scholarshipService.searchScholarships(query);
    }


    /**
     * This method deletes the scholarship by using the specified scholarship id.
     *
     * @param scholarshipId -- The ID used to find the scholarship from the database.
     */
    @RequestMapping(path = "/delete/{scholarshipId}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void deleteScholarship(@PathVariable int scholarshipId) {

        //Attempts to delete the scholarship
        if (!scholarshipService.deleteScholarship(scholarshipId)) {

            // Log error
            log.error("ERROR: Scholarship could not be deleted -- SOURCE: deleteScholarship()");

            //Throw http error if scholarship could not be deleted 
            scholarshipNotFound();
        }

    }

    public void getScholarshipById(@PathVariable int scholarshipId) {

        //Attempts to delete the scholarship
        if (!scholarshipService.getScholarshipById(scholarshipId)) {

            // Log error
            log.error("ERROR: A scholarship with this ID does not exist -- SOURCE: getScholarshipById()");

            //Throw http error if scholarship could not be found
            scholarshipNotFound();
        }

    }

    public void getScholarshipByTitle(@PathVariable String scholarshipTitle) {

        //Attempts to delete the scholarship
        if (!scholarshipService.getScholarshipByTitle(scholarshipTitle)) {

            // Log error
            log.error("ERROR: A scholarship with this title does not exist -- SOURCE: getScholarshipByTitle()");

            //Throw http error if scholarship could not be found
            scholarshipNotFound();
        }

    }

    /**
     * Send an http response error if data sent did not follow model restrictions.
     */
    public void invalidData() {

        throw new ResponseStatusException(HttpStatus.PARTIAL_CONTENT, "The data sent was incomplete or invalid!");
    }

    /**
     * Send an http response error if the specified scholarship could not be found.
     */
    public void scholarshipNotFound() {

        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "The scholarship could not be found!");
    }


}

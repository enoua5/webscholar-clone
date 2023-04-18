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
import java.sql.Timestamp;


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
     * @param scholarship The form object sent from the frontend that is converted into a scholarship model object.
     */
    @RequestMapping(path = "/update/{scholarshipId}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void updateScholarship(@PathVariable int scholarshipId, @RequestBody Scholarship scholarship, BindingResult result) {

        //Validate input
        if (result.hasErrors()) {

            // Log error
            log.error("ERROR: Invalid Data -- SOURCE: updateScholarship()");

            //Throw http error
            invalidData();
        }

        //Overwrite the existing scholarship data with the new scholarship data
        if (!scholarshipService.updateScholarship(scholarshipId, scholarship)) {

            // Log error
            log.error("ERROR: Scholarship could not be saved -- SOURCE: updateScholarship()");

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
    public boolean deleteScholarship(@PathVariable int scholarshipId) {
        Boolean deleted = scholarshipService.deleteScholarship(scholarshipId);

        if (!deleted) {
            log.error("ERROR: Scholarship cold not be deleted -- SOURCE: deleteScholarship()");
            scholarshipNotFound();
        }

        return deleted;
    }
    
    /**
     * This method finds the scholarship by using the specified scholarship id.
     *
     * @param scholarshipId -- The ID used to find the scholarship from the database.
     */
    @RequestMapping(path = "/searchById/{scholarshipId}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void getScholarshipById(@PathVariable int scholarshipId) {

        //Attempts to find the scholarship
        if (!scholarshipService.getScholarshipById(scholarshipId)) {
            // Log error
            log.error("ERROR: A scholarship with this ID does not exist -- SOURCE: getScholarshipById()");

            //Throw http error if scholarship could not be found
            scholarshipNotFound();
        }
        return scholarship;
    }

    /**
     * This method finds the scholarship by using the scholarship title.
     *
     * @param scholarshipTitle -- The title used to find the scholarship from the database.
     */
    @RequestMapping(path = "/searchByTitle/{scholarshipTitle}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void getScholarshipByTitle(@PathVariable String scholarshipTitle) {

        //Attempts to find the scholarship
        if (!scholarshipService.getScholarshipByTitle(scholarshipTitle)) {


        if (scholarship == null) {
            log.error("ERROR: A scholarship with this title does not exist -- SOURCE: getScholarshipByTitle()");

            scholarshipNotFound();
        }
        return scholarship;
    }

    /**
     * This method finds the scholarship by using the specified scholarship level.
     *
     * @param scholarshipLevel -- The level used to find the scholarship from the database.
     */
    @RequestMapping(path = "/searchByLevel/{scholarshipLevel}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void getScholarshipByLevel(@PathVariable String scholarshipLevel) {

        //Attempts to find scholarships with specified level
        if (scholarshipService.getScholarshipsByLevel(scholarshipLevel).isEmpty()) {

            // Log error
            log.error("ERROR: A scholarship for this Level does not exist -- SOURCE: getScholarshipByLevel()");

            //Throw http error if scholarship could not be found
            scholarshipNotFound();
        }

    }

    /**
     * This method finds the scholarship by using the specified scholarship organization.
     *
     * @param scholarshipOrganization -- The organization used to find the scholarship from the database.
     */
    @RequestMapping(path = "/searchByOrganization/{scholarshipOrganization}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void getScholarshipByOrganization(@PathVariable String scholarshipOrganization) {

        //Attempts to find scholarships with specified organization
        if (scholarshipService.getScholarshipsByLevel(scholarshipOrganization).isEmpty()) {

            // Log error
            log.error("ERROR: A scholarship for this organization does not exist -- SOURCE: getScholarshipByOrganization()");

            //Throw http error if scholarship could not be found
            scholarshipNotFound();
        }

    }


    /**
     * This method finds the scholarship by using the specified scholarship application deadline.
     *
     * @param scholarshipApplyDeadline -- The application deadline date used to find the scholarship from the database.
     */
    @RequestMapping(path = "/searchByApplyDeadline/{scholarshipApplyDeadline}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void getScholarshipByApplyDeadline(@PathVariable Timestamp scholarshipApplyDeadline) {
        //TODO This should probably be revised to get the scholarships with an application date >= the scholarshipApplyDeadline
        //Attempts to find scholarships with specified application deadline
        if (scholarshipService.getScholarshipsByApplyDeadline(scholarshipApplyDeadline).isEmpty()) {

            // Log error
            log.error("ERROR: A scholarship with this application deadline does not exist -- SOURCE: getScholarshipByApplyDeadline()");

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

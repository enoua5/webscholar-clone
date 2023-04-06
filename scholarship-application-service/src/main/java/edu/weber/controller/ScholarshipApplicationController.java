package edu.weber.controller;

import edu.weber.model.ScholarshipApplication;
import edu.weber.repository.ScholarshipApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.core.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ScholarshipApplicationController {

    private final Logger log = LoggerFactory.getLogger(getClass());

    /**
     * scholarshipApplicationRepository
     * The repository instance created to be used by this controller
     */
    @Autowired
    private ScholarshipApplicationRepository scholarshipApplicationRepository;

    @RequestMapping(
            path="/create",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseStatus(HttpStatus.CREATED)
    public ScholarshipApplication create(@RequestBody ScholarshipApplication scholarshipApplication) {
//        TODO: Figure this out lmao
//        log.debug("accountKey:" + String.valueOf(accountKey));
//        log.debug("scholarshipId:" + String.valueOf(scholarshipId));
//        ScholarshipApplication scholarshipApplication = new ScholarshipApplication(accountKey, scholarshipId);
        return scholarshipApplicationRepository.saveAndFlush(scholarshipApplication);
    }

    @RequestMapping(
            path = "/delete/{id}",
            method = RequestMethod.DELETE
    )
    public void delete(@PathVariable int id) {
        scholarshipApplicationRepository.deleteById(id);
    }

}

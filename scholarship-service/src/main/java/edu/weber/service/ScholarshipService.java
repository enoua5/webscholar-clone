package edu.weber.service;

import edu.weber.model.Scholarship;
import edu.weber.repository.ScholarshipRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

/**
 * This class extends the functionality of 'ScholarshipRepository'. Instead of using the default
 * search queries, we can define our own here.
 */
@Service
public class ScholarshipService {

    /**
     * This is the logger which uses the slf4j logging facade API.
     * The logging framework that slf4j interfaces with is LogBack.
     * Both slf4j and LogBack are available with Spring Boot.
     * If you would like slf4j to interface with a different logging
     * framework (like log4j), consult the slf4j documentation.
     */
    private final Logger log = LoggerFactory.getLogger(getClass());

    /**
     * This object handles queries to the database.
     */
    @Autowired
    public ScholarshipRepository scholarshipRepository;

    /**
     * This method updates the data associated for an existing scholarship.
     *
     * @param scholarshipId The id associated with the scholarship being updated.
     * @param update The new scholarship data being used for updating.
     * @return Returns a success or fail flag depending on if the scholarship can be found.
     */
    public boolean saveChanges(int scholarshipId, Scholarship update){

        //Get the current scholarship
        Scholarship scholarship = scholarshipRepository.findScholarshipByScholarshipId(scholarshipId);

        if (scholarship == null){
            log.error("ERROR: Scholarship does not exist -- SOURCE: saveChanges()");

            return false;
        }

        Assert.notNull(scholarship, "can't find account with name " + scholarshipId);

        //Update the scholarship's data
        scholarship.setTitle(update.getTitle());
        scholarship.setOrganization(update.getOrganization());
        scholarship.setDescription(update.getDescription());
        scholarship.setRequirements(update.getRequirements());
        scholarship.setAmount(update.getAmount());

        //Save the updated scholarship
        scholarshipRepository.save(scholarship);

        return true;
    }

    /**
     * TODO figure out how to make this delete account-scholarships with the same id
     * This method deletes a scholarship using it's given id.
     *
     * @param scholarshipId The id of the scholarship to be deleted.
     * @return Returns a success or fail flag depending on if the scholarship can be found.
     */
    public boolean deleteScholarship(int scholarshipId){

        //Make sure the record exists
        Scholarship scholarship = scholarshipRepository.findScholarshipByScholarshipId(scholarshipId);

        if(scholarship == null){
            log.error("ERROR: Scholarship does not exist -- SOURCE: saveChanges()");

            //Return failure
            return false;
        }

        //Delete scholarship
        scholarshipRepository.deleteScholarshipByScholarshipId(scholarshipId);

        //Return success
        return true;
    }
}

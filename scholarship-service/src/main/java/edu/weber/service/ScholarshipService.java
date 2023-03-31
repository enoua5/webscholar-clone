package edu.weber.service;

import edu.weber.model.Scholarship;
import edu.weber.repository.ScholarshipRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.sql.Timestamp;
import java.util.Collection;

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
    public ScholarshipRepository scholarshipRepository;

    @Autowired
    private void setScholarshipRepository(ScholarshipRepository scholarshipRepository) {
        this.scholarshipRepository = scholarshipRepository;
    }

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

    public boolean deleteScholarship(int scholarshipId){

        //Make sure the record exists
        Scholarship scholarship = scholarshipRepository.findScholarshipByScholarshipId(scholarshipId);

        if(scholarship == null){
            log.error("ERROR: Scholarship does not exist -- SOURCE: deleteScholarship()");

            //Return failure
            return false;
        }

        //Delete scholarship
        scholarshipRepository.deleteScholarshipByScholarshipId(scholarshipId);

        //Return success
        return true;
    }

    public boolean getScholarshipById(int scholarshipId){
        Scholarship scholarship = scholarshipRepository.findScholarshipByScholarshipId(scholarshipId);

        if(scholarship == null){
            log.error("ERROR: A scholarship with that ID does not exist -- SOURCE: getScholarshipById()");

            //Return failure
            return false;
        }

        return true;
    }

    public boolean getScholarshipByTitle(String scholarshipTitle) {
        Scholarship scholarship = scholarshipRepository.findScholarshipByTitle(scholarshipTitle);

        if (scholarship == null) {
            log.error("ERROR: A scholarship with that title does not exist -- SOURCE: getScholarshipByTitle()");

            //Return failure
            return false;
        }

        return true;
    }

    public Collection<Scholarship> getScholarshipsByLevel(String scholarshipLevel) {
        Collection<Scholarship> scholarships = scholarshipRepository.findScholarshipByLevels(scholarshipLevel);

        if (scholarships.isEmpty() || scholarships == null) {
            log.error("ERROR: No scholarships for this level exist -- SOURCE: getScholarshipByLevel()");

            //Return failure
            return null;
        }

        return scholarships;
    }

    public Collection<Scholarship> getScholarshipsByOrganization(String scholarshipOrganization) {
        Collection<Scholarship> scholarships = scholarshipRepository.findScholarshipByOrganization(scholarshipOrganization);

        if (scholarships.isEmpty() || scholarships == null) {
            log.error("ERROR: No scholarships for this organization exist -- SOURCE: getScholarshipByOrganization()");

            //Return failure
            return null;
        }

        return scholarships;
    }

    public Collection<Scholarship> getScholarshipsByApplyDeadline(Timestamp scholarshipApplyDeadline) {
        Collection<Scholarship> scholarships = scholarshipRepository.findScholarshipByApplyDeadline(scholarshipApplyDeadline);

        if (scholarships.isEmpty() || scholarships == null) {
            log.error("ERROR: No scholarships for this application deadline exist -- SOURCE: getScholarshipByApplyDeadline()");

            //Return failure
            return null;
        }

        return scholarships;
    }
}

package edu.weber.service;

import edu.weber.model.Scholarship;
import edu.weber.repository.ScholarshipRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import me.xdrop.fuzzywuzzy.FuzzySearch;
import java.util.ArrayList;
import java.util.List;

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
     * @param updatedScholarship The new scholarship data being used for updating.
     * @return Returns a success or fail flag depending on if the scholarship can be found.
     */
    public boolean updateScholarship(int scholarshipId, Scholarship updatedScholarship){

        //Get the current scholarship
        Scholarship scholarship = scholarshipRepository.findScholarshipByScholarshipId(scholarshipId);

        if (scholarship == null){
            log.error("ERROR: Scholarship does not exist -- SOURCE: updateScholarship()");

            return false;
        }

        Assert.notNull(scholarship, "can't find account with name " + scholarshipId);

        //Update the scholarship's data
        scholarship.setTitle(updatedScholarship.getTitle());
        scholarship.setOrganization(updatedScholarship.getOrganization());
        scholarship.setDescription(updatedScholarship.getDescription());
        scholarship.setRequirements(updatedScholarship.getRequirements());
        scholarship.setAmount(updatedScholarship.getAmount());

        //Save the updated scholarship
        scholarshipRepository.save(scholarship);

        return true;
    }

    // fuzzy search endpoint for scholarships. Simple v1 iteration
    public List<Scholarship> searchScholarships(String query) {
        // get all scholarships
        List<Scholarship> scholarships = scholarshipRepository.findAll();
        List<Scholarship> results = new ArrayList<>();
        for (Scholarship scholarship : scholarships) {
            // check title
            String title = scholarship.getTitle();
            // check org
            String org = scholarship.getOrganization();
            // check desc
            // evaluate if we are worried about including description
            String desc = scholarship.getDescription();
            // append all those fields together to feed into FuzzySearch function
            String fields = title + " " + org  + " " + desc;

            // TODO: configure this to levels, requirements,and awards.

            int ratio = FuzzySearch.tokenSetRatio(fields, query);
            // will include if it is at least a 80% match.
            if (ratio >= 80) {
                results.add(scholarship);
            }
        }
        return results;
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

    public Scholarship getScholarshipById(int scholarshipId){
        Scholarship scholarship = scholarshipRepository.findScholarshipByScholarshipId(scholarshipId);

        if(scholarship == null){
            log.error("ERROR: A scholarship with that ID does not exist -- SOURCE: getScholarshipById()");

            return null;
        }

        return scholarship;
    }

    public Scholarship getScholarshipByTitle(String scholarshipTitle) {
        Scholarship scholarship = scholarshipRepository.findScholarshipByTitle(scholarshipTitle);

        if (scholarship == null) {
            log.error("ERROR: A scholarship with that title does not exist -- SOURCE: getScholarshipByTitle()");

            //Return failure
            return null;
        }

        return scholarship;
    }
}

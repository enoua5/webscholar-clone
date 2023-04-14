package edu.weber.service;

import edu.weber.model.AwardType;
import edu.weber.model.Level;
import edu.weber.model.Requirement;
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

            // needed to prevent duplicate values.
            boolean added = false;

            // get levels iterate over them and evaluate if it should be added.
            List<Level> levels = scholarship.getLevels();
            if (!levels.isEmpty()) {
                for (Level level : levels) {
                    String levelStr = level.getLevel().toString();
                    String levelFields = fields + " " + levelStr;
                    added = addScholarshipToResults(results, scholarship, levelFields, query);
                    if (added) break;
                }
            }
            // exit specific iteration and continue looping
            if (added) continue;

            // get requirements iterate over them and evaluate if it should be added.
            List<Requirement> requirements = scholarship.getRequirements();
            if (!requirements.isEmpty()) {
                for (Requirement req : requirements) {
                    String reqStr = req.getDescription();
                    String reqFields = fields + " " + reqStr;
                    added = addScholarshipToResults(results, scholarship, reqFields, query);
                    if (added) break;
                }
            }
            // exit specific iteration and continue looping
            if (added) continue;

            List<AwardType> awards = scholarship.getAwards();
            if (!awards.isEmpty()) {
                for (AwardType award : awards) {
                    String awardStr = award.getAwardType().toString();
                    String awardFields = fields + " " + awardStr;
                    added = addScholarshipToResults(results, scholarship, awardFields, query);
                    if (added) break;
                }
            }
            // exit specific iteration and continue looping
            if (added) continue;


            addScholarshipToResults(results, scholarship, fields, query);
        }
        return results;
    }

    public boolean addScholarshipToResults(List<Scholarship> results, Scholarship scholarship, String fields, String query) {
        boolean addedToResults = false;
        int ratio = FuzzySearch.tokenSetRatio(fields, query);
        if (ratio >= 80) {
            results.add(scholarship);
            addedToResults = true;
        }

        return addedToResults;
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
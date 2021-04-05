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

    private final Logger log = LoggerFactory.getLogger(getClass());

    //TODO: uncomment the following two lines once the ScholarshipRepsitory is complete
    @Autowired
    public ScholarshipRepository scholarshipRepository;

    //TODO: create methods to implement business logic 
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

        //Save the updated schloarship
        scholarshipRepository.save(scholarship);

        return true;
    }
}

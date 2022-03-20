package edu.weber.service;

import edu.weber.model.Issue;
import edu.weber.repository.IssueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

/**
 * This class extends the functionality of 'IssueRepository'. Instead of using the default
 * search queries, we can define our own here.
 */
@Service
public class IssueService {

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
    public IssueRepository issueRepository;

    /**
     * This method updates the data associated for an existing issue.
     *
     * @param issueId The id associated with the issue being updated.
     * @param update  The new issue data being used for updating.
     * @return Returns a success or fail flag depending on if the issue can be found.
     */
    public boolean saveChanges(int issueId, Issue update) {

        //Get the current scholarship
        Issue issue = issueRepository.findIssueByIssueId(issueId);

        if (issue == null) {
            log.error("ERROR: Issue does not exist -- SOURCE: saveChanges()");

            return false;
        }

        Assert.notNull(issue, "can't find issue with id " + issueId);

        //Update the issue's data
        issue.setStatus(update.getStatus());
        issue.setSummary(update.getSummary());
        issue.setDescription(update.getDescription());
        issue.setSeverity(update.getSeverity());
        issue.setPriority(update.getPriority());
        issue.setReporterId(update.getReporterId());
        issue.setWorkerId(update.getReporterId());

        //Save the updated issue
        issueRepository.save(issue);

        return true;
    }


    public boolean deleteIssue(int issueId) {

        //Make sure the record exists
        Issue issue = issueRepository.findIssueByIssueId(issueId);

        if (issue == null) {
            log.error("ERROR: Issue does not exist -- SOURCE: saveChanges()");

            //Return failure
            return false;
        }

        //Delete scholarship
        issueRepository.deleteIssueByIssueId(issueId);

        //Return success
        return true;
    }
}

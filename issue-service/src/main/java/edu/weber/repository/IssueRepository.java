package edu.weber.repository;

import edu.weber.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * This class connects to the database.
 * Default methods can be built by specifying the wording of the
 * method signature.
 * eg. 'findAccountBy' followed by a variable name 'AccountKey', 'firstName', etc.
 * Note: intelliJ helps you build these methods when you start writing the method signature.
 * Note: You can also create complex queries using the @Query annotation and specifying the sql statement.
 */
@Repository
public interface IssueRepository extends JpaRepository<Issue, Integer> {

    //These are default database search functions

    // Finds an issue through a given issueId
    @Query("select i from Issue i where i.issueId = ?1")
    Issue findIssueByIssueId(int issueId);

    // Deletes an issue through a given issueId
    @Modifying
    @Query("delete from Issue i where i.issueId = ?1")
    void deleteIssueByIssueId(int issueId);

}
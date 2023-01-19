package edu.weber.repository;

import edu.weber.model.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;
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
public interface ScholarshipRepository extends JpaRepository<Scholarship, String>{

    //These are default database search functions

    Scholarship findScholarshipByScholarshipId (int scholarshipKey);

    Scholarship findScholarshipByTitle (String Title);

    /*
    TODO figure out how to delete any account-scholarship objects with the same ID as well.
     */
    void deleteScholarshipByScholarshipId(int id);
}
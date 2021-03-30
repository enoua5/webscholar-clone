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
 */
@Repository
public interface ScholarshipRepository extends JpaRepository<Scholarship, String>{

    //Default functions
    Scholarship findScholarshipByScholarshipId (int scholarshipKey);

    Scholarship findScholarshipByTitle (String Title);

}
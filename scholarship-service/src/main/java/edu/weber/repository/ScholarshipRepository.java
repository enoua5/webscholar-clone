package edu.weber.repository;

import edu.weber.model.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//Hopefully connects to database
@Repository
public interface ScholarshipRepository extends JpaRepository<Scholarship, String>{

    //default functions
    Scholarship findScholarshipByScholarshipKey (int scholarshipKey);

    Scholarship findScholarshipByTitle (String Title);

}
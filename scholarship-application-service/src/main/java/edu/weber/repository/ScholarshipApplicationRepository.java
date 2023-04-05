package edu.weber.repository;

import edu.weber.model.ScholarshipApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScholarshipApplicationRepository extends JpaRepository<ScholarshipApplication, Integer> {
}

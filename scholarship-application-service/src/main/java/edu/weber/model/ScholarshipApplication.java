package edu.weber.model;

import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
public class ScholarshipApplication {

    /**
     * This has the Primary Key Generate a unique Id
     */
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private int scholarshipApplicationId;

    public int getScholarshipApplicationId() {
        return scholarshipApplicationId;
    }

    /**
     * Foreign Key
     * Links to the student account found in the account-service (AccountApp)
     */
    @Column(nullable = false)
    private int accountKey;

    public int getAccountKey() {
        return accountKey;
    }

    public void setAccountKey(int accountKey) {
        this.accountKey = accountKey;
    }

    /**
     * Foreign Key
     * Links to the scholarship found in the scholarship-service (ScholarshipApp)
     */
    @Column(nullable = false)
    private int scholarshipId;

    public int getScholarshipId() {
        return scholarshipId;
    }

    public void setScholarshipId(int scholarshipId) {
        this.scholarshipId = scholarshipId;
    }

    /**
     * Status of the application
     * Approved, Accepted, Pending, Rejected, InProgress, etc...
     */
    @Column
    public String scholarshipApplicationStatus;

    public String getScholarshipApplicationStatus() {
        return scholarshipApplicationStatus;
    }

    public void setScholarshipApplicationStatus(String scholarshipApplicationStatus) {
        this.scholarshipApplicationStatus = scholarshipApplicationStatus;
    }

    /**
     * Date and time that the scholarshipApplication was created (submitted)
     */
    @Column
    @CreationTimestamp
    public LocalDateTime dateSubmitted;

    public LocalDateTime getDateSubmitted() {
        return dateSubmitted;
    }

    public void setDateSubmitted(LocalDateTime dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }

    // Date reviewed was moved to ScholarshipApplicationEvaluation as dateEvaluated.

    /**
     * This is the date that the final decision is made for the ScholarshipApplication
     */
    @Column
    public LocalDateTime dateDecided;

    public LocalDateTime getDateDecided() {
        return dateDecided;
    }

    public void setDateDecided(LocalDateTime dateDecided) {
        this.dateDecided = dateDecided;
    }

    /**
     * Default constructor
     */
    public ScholarshipApplication(){}

    /**
     * Custom constructor. Creates a ScholarshipApplicationEvaluation object.
     * Parameters are values that must not be blank when this object is created.
     * @param accountKey is the student account associated with the ScholarshipApplication
     * @param scholarshipId is the scholarship for which the ScholarshipApplication is being submitted
     * dateSubmitted should be generated on creation
     */
    public ScholarshipApplication(int accountKey, int scholarshipId){
        this.accountKey = accountKey;
        this.scholarshipId = scholarshipId;
    }

    /**
     * This method allows us to see the ScholarshipApplication information in the console.
     * This is helpful for debugging problems or for logging.
     *
     * @return Returns the 'ScholarshipApplication' data formatted as a string.
     */
    @Override
    public String toString(){
        return "ScholarshipApplication{ " +
                "scholarshipApplicationID='" + scholarshipApplicationId + '\'' +
                ", accountKey='" + accountKey + '\'' +
                ", scholarshipId='" + scholarshipId + '\'' +
                ", dateSubmitted='" + dateSubmitted + '\'' +
                ", dateDecided='" + dateDecided + '\'' +
                '}';
    }
}

package edu.weber.model;

import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;

@Entity
public class ScholarshipApplication {

    /**
     * This has the Primary Key Generate a unique Id
     */
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    /**
     * Primary Key
     */
    private int scholarshipApplicationId;

    /**
     * Foreign Key
     * Links to the student account found in the account-service (AccountApp)
     */
    @Column(nullable = false)
    private int accountKey;

    /**
     * Foreign Key
     * Links to the scholarship found in the scholarship-service (ScholarshipApp)
     */
    @Column(nullable = false)
    private int scholarshipId;

    public ScholarshipApplication(){}

    public ScholarshipApplication(int accountKey, int scholarshipId){
        this.accountKey = accountKey;
        this.scholarshipId = scholarshipId;
    }

    public int getScholarshipApplicationId() {
        return scholarshipApplicationId;
    }

    public void setScholarshipApplicationId(int scholarshipApplicationId) {
        this.scholarshipApplicationId = scholarshipApplicationId;
    }

    public int getAccountKey() {
        return accountKey;
    }

    public void setAccountKey(int accountKey) {
        this.accountKey = accountKey;
    }

    public int getScholarshipId() {
        return scholarshipId;
    }

    public void setScholarshipId(int scholarshipId) {
        this.scholarshipId = scholarshipId;
    }
}

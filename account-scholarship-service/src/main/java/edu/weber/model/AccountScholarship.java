//This Model exists to connect Account and Scholarship so individual accounts can be linked to scholarships.
package edu.weber.model;

//import lombok.AccessLevel;
//import lombok.Getter;
//import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;


/**
 * This is a data model. It helps us put data into the backend and send data
 * to the frontend in a standardized format. (Yes, I did just copy-pasta a comment XD)
 */

//@Getter //This uses javax validation to generate the getters and setters for all variables
//@Setter //This uses javax validation to generate the getters and setters for all variables
@Entity
public class AccountScholarship {

    //Gives each combination a unique id
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    //This prevents the javax setter from being generated for this value
//    @Setter(AccessLevel.PRIVATE)
    private int comboId;

    //accountKey of the attached account
    @Column(nullable = false)
    @NotBlank
    private int accountKey;

    //Id of attached scholarship
    @Column(nullable = false)
    @NotBlank
    private int scholarshipId;

    /**
     * The default constructor.
     * Protected as no one should create this object without specifying the non-blank values.
     */
    protected AccountScholarship() {}

    /**
     * Custom constructor that sets all parameters
     * @param accountKey Set the attached account
     * @param scholarshipId Set the attached scholarship
     */
    public AccountScholarship(int accountKey, int scholarshipId){

        this.accountKey = accountKey;
        this.scholarshipId = scholarshipId;

    }

    /**
     * This method allows us to see the AccountScholarship information in the console.
     * This is helpful for debugging problems or for logging.
     *
     * @return Returns the 'AccountScholarship' data formatted as a string.
     */
    @Override
    public String toString(){
        return "AccountScholarship{" +
                "comboId=" + comboId +
                ", accountKey=" + accountKey +
                ", scholarshipId=" + scholarshipId + '}';
    }

    public int getComboId() {
        return comboId;
    }

    public void setComboId(int comboId) {
        this.comboId = comboId;
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

package edu.weber.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

/**
 * This is a data model. It helps us put data into the backend and send data
 * to the frontend in a standardized format. (Yes, I did just copy-pasta a comment XD)
 */

@Getter //This uses javax validation to generate the getters and setters for all variables
@Setter //This uses javax validation to generate the getters and setters for all variables
@Entity
public class accountScholarship {

    //gives each combination of a account and scholarship a unique id
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    @Setter(AccessLevel.PRIVATE)
    private int comboId;

    //accountKey of the attached account
    @Column(nullable = false)
    @NotBlank
    private int accountKey;

    //scholarshipId of the attached scholarship
    @Column(nullable = false)
    @NotBlank
    private int scholarshipId;

    /**
     * The default constructor.
     * Protected as no one should create this object without specifying the non-blank values.
     */
    protected accountScholarship() {}

    /**
     * Custom constructor that sets all parameters
     * @param accountKey set the id of attached account
     * @param scholarshipId set the id of attached scholarship
     */
    public accountScholarship(int accountKey, int scholarshipId){
        this.accountKey = accountKey;
        this.scholarshipId = scholarshipId;
    }

    /**
     * This method allows us to see the scholarship information in the console.
     * This is helpful for debugging problems or for logging.
     *
     * @return Returns the 'accountScholarship' data formatted as a string.
     */
    @Overide
    public String toString(){
        return "accountScholarship{" +
                "comboId=" + comboId +
                ", accountKey=" + accountKey + '\'' +
                ", scholarshipId=" + scholarshipId + '}';
    }

}
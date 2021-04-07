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
public class Scholarship {

    //Gives each scholarship a unique id
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    //This prevents the javax setter from being generated for this value
    @Setter(AccessLevel.PRIVATE)
    private int scholarshipId;

    //Name of the scholarship
    @Column(nullable = false)
    @NotBlank
    private String title;

    //Organization that offers the scholarship
    @Column(nullable = false)
    @NotBlank
    private String organization;

    //Short description of the scholarship
    @Column(nullable = false)
    @NotBlank
    private String description;

    //a list of requirements to have the scholarship
    @Column(nullable = false)
    @NotBlank
    private String requirements;

    //amount of money the scholarship offers?
    @Column(nullable = false)
    @NotBlank
    private double amount;

    //TODO: Add variable array that holds keywords
    //These tags are used to help search for the scholarship.
    //These tags can be used to recommend scholarships to the user using their account tags.

    /**
     * The default constructor.
     * Protected as no one should create this object without specifying the non-blank values.
     */
    protected Scholarship() {}


    /**
     * Custom constructor that sets all parameters
     * @param title Set the title of scholarship
     * @param organization Set the name of the organization offering the scholarship
     * @param description Set details about what the scholarship offers
     * @param requirements Set the requirements needed to apply/receive scholarship
     * @param amount Set the amount awarded if the scholarship is completed
     */
    public Scholarship(String title, String organization, String description, String requirements, double amount) {

        this.title = title;
        this.organization = organization;
        this.description = description;
        this.requirements = requirements;
        this.amount = amount;

    }


    /**
     * This method allows us to see the scholarship information in the console.
     * This is helpful for debugging problems or for logging.
     *
     * @return Returns the 'Scholarship' data formatted as a string.
     */
    @Override
    public String toString() {
        return "Scholarship{" +
                "scholarshipId=" + scholarshipId +
                ", title='" + title + '\'' +
                ", organization='" + organization + '\'' +
                ", description='" + description + '\'' +
                ", requirements='" + requirements + '\'' +
                ", amount=" + amount +
                '}';
    }
}
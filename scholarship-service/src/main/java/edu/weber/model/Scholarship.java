package edu.weber.model;

//import lombok.AccessLevel;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.function.IntFunction;


/**
 * This is a data model. It helps us put data into the backend and send data
 * to the frontend in a standardized format. (Yes, I did just copy-pasta a comment XD)
 */

/*
@Getter //This uses javax validation to generate the getters and setters for all variables
@Setter //This uses javax validation to generate the getters and setters for all variables
*/
@Entity
public class Scholarship {

    //Gives each scholarship a unique id
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    //This prevents the javax setter from being generated for this value
    //@Setter(AccessLevel.PRIVATE)
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
    @OneToMany(mappedBy = "scholarship", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Requirement> requirements;

    //amount of money the scholarship offers?
    @Column(nullable = false)
    @NotBlank
    private BigDecimal amount;

    // Deadline to apply for a scholarship
    // can easily be created with something like Timestamp.valueOf(LocalDateTime.of(2023, Month.DECEMBER, 31,23,59))
    @Column(nullable = false)
    @NotBlank
    private Timestamp applyDeadline;

    // Levels this scholarship allows
    @Column(nullable = false)
    @NotBlank
    @OneToMany(mappedBy = "scholarship", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Level> levels;

    @Column(nullable = false)
    @NotBlank
    @OneToMany(mappedBy = "scholarship", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AwardType> awards;

    //TODO: Add variable array that holds keywords
    //These tags are used to help search for the scholarship.
    //These tags can be used to recommend scholarships to the user using their account tags.

    /**
     * The default constructor.
     * Protected as no one should create this object without specifying the non-blank values.
     */
    protected Scholarship() {}


    /**
     Custom constructor that sets all parameters
     * @param title Set the title of scholarship
     * @param organization Set the name of the organization offering the scholarship
     * @param description Set details about what the scholarship offers
     * @param requirements Set the requirements needed to apply/receive scholarship
     * @param amount Set the amount awarded if the scholarship is completed
     * @param applyDeadline Set the application deadline into Date Format "yyyy/MM/dd HH:mm:ss"
     * @param levelsList Set the levels allowed from ArrayList into a string
     */
    public Scholarship(String title, String organization, String description, List<Requirement> requirements, BigDecimal amount, Timestamp applyDeadline, List<Level> levels, List<AwardType> awards) {

        this.title = title;
        this.organization = organization;
        this.description = description;
        this.requirements = requirements;
        this.amount = amount;
        this.levels = levels;
        this.awards = awards;
        this.applyDeadline = applyDeadline;
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


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Timestamp getApplyDeadline() {
        return applyDeadline;
    }

    public void setApplyDeadline(Timestamp applyDeadline) {
        this.applyDeadline = applyDeadline;
    }

    public List<Level> getLevels() {
        return levels;
    }

    public void setLevels(List<Level> levels) {
        this.levels = levels;
    }

    public List<AwardType> getAwards() {
        return this.awards;
    }

    public void setAwards(List<AwardType> awards) {
        this.awards = awards;
    }

    public List<Requirement> getRequirements() {
        return this.requirements;
    }

    public void setRequirements(List<Requirement> requirements) {
        this.requirements = requirements;
    }
}
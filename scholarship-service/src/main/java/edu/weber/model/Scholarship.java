package edu.weber.model;

//import lombok.AccessLevel;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
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
    private String requirements;

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
    private String levels;

    @Column(nullable = false)
    @NotBlank
    private String awardType;

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
    public Scholarship(String title, String organization, String description, String requirements, BigDecimal amount, Timestamp applyDeadline, Level[] levelsList, AwardType[] awardTypes) {

        this.title = title;
        this.organization = organization;
        this.description = description;
        this.requirements = requirements;
        this.amount = amount;
        this.applyDeadline = applyDeadline;
        setLevels(levelsList);
        setAwardType(awardTypes);

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

    public int getScholarshipId() {
        return scholarshipId;
    }

    public void setScholarshipId(int scholarshipId) {
        this.scholarshipId = scholarshipId;
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

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
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

    public Level[] getLevels() {
        // unpack the string and returns it as a Level array
        // separates the string based on the delimiter -
        String[] parts = levels.split("-");
        Level[] returnArray = new Level[parts.length];
        for (int i = 0; i < parts.length; i++){
            returnArray[i] = getLevel(parts[i]);
        }
        return returnArray;
    }

    /**
     * Returns the level if a string is associated with it
     * Returns Level None if the string does not match any option
     * @param levelString
     * @return
     */
    private Level getLevel(String levelString){
        if (levelString.equals(Level.BACHELOR.toString())) { return Level.BACHELOR; }
        if (levelString.equals(Level.ASSOCIATE.toString())) { return Level.ASSOCIATE; }
        if (levelString.equals(Level.GRADUATE.toString())) { return Level.GRADUATE; }
        if (levelString.equals(Level.PROFESSIONAL.toString())) { return Level.PROFESSIONAL; }
        return Level.NONE;
    }

    public void setLevels(Level[] levelsList) {
        // packs the level list into a string to store into the database
        // delimiter is a - mark
        String tmpLevels = "";
        for (int i = 0; i < levelsList.length; i++){
            if (i != (levelsList.length -1)){
                tmpLevels += levelsList[i].toString() + "-";
            }
            else{
                tmpLevels += levelsList[i].toString();
            }
        }

        this.levels = tmpLevels;
    }

    public AwardType[] getAwardType(){
        // unpack the string and returns it as a Level array
        // separates the string based on the delimiter -
        String[] parts = awardType.split("-");
        AwardType[] returnArray = new AwardType[parts.length];
        for (int i = 0; i < parts.length; i++){
            returnArray[i] = getAwardTypeFromString(parts[i]);
        }
        return returnArray;
    }

    public AwardType getAwardTypeFromString(String awardString){
        if (awardString.equals(AwardType.SCHOLARSHIP.toString())) { return AwardType.SCHOLARSHIP; }
        if (awardString.equals(AwardType.LOAN.toString())) { return AwardType.LOAN; }
        if (awardString.equals(AwardType.GRANT.toString())) { return AwardType.GRANT; }
        if (awardString.equals(AwardType.PRIZE.toString())) { return AwardType.PRIZE; }
        if (awardString.equals(AwardType.FELLOWSHIP.toString())) { return AwardType.FELLOWSHIP; }
        return AwardType.SCHOLARSHIP;
    }

    public void setAwardType(AwardType[] awardList){
        // packs the level list into a string to store into the database
        // delimiter is a - mark
        String tmpAwards = "";
        for (int i = 0; i < awardList.length; i++){
            if (i != (awardList.length -1)){
                tmpAwards += awardList[i].toString() + "-";
            }
            else{
                tmpAwards += awardList[i].toString();
            }
        }

       this.awardType = tmpAwards;
    }
}
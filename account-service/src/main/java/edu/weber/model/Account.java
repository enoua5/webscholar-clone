package edu.weber.model;



import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

/**
 * This is a data model. It helps us put data into the backend and send data
 * to the frontend in a standardized format.
 */

@Entity
public class Account {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    //This prevents the javax setter from being generated for this value
    @Column(nullable = false)
    private int accountKey;

    public int getAccountKey(){
        return accountKey;
    }

    @Column(nullable = false)
    @Email
    private String email;

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }


    @Column(nullable = false)
    @NotBlank
    private String password;

    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }

    @Column(nullable = false)
    @NotBlank
    private String schoolId;
    public String getSchoolId(){
        return schoolId;
    }
    public void setSchoolId(String schoolId){
        this.schoolId = schoolId;
    }

    //TODO: This needs to be changed to 'isLoggedIn' for authentication purposes
    @Column
    @NotNull
    private Boolean active;
    public Boolean getActive(){
        return active;
    }
    public void setActive(boolean active){
        this.active = active;
    }

    @Column
    @NotNull
    private String userType;
    public String getUserType(){
        return userType;
    }
    public void setUserType(String userType){
        this.userType = userType;
    }

    @Column(nullable = false)
    @NotBlank
    private String firstName;
    public String getFirstName(){
        return firstName;
    }
    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    @Column
    private String middleName;
    public String getMiddleName(){
        return middleName;
    }
    public void setMiddleName(String middleName){
        this.middleName = middleName;
    }

    @Column(nullable = false)
    @NotBlank
    private String lastName;
    public String getLastName(){
        return lastName;
    }
    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    @Column
    private String address1;
    public String getAddress1(){
        return address1;
    }
    public void setAddress1(String address1){
        this.address1 = address1;
    }

    @Column
    private String address2;
    public String getAddress2(){
        return address2;
    }
    public void setAddress2(String address2){
        this.address2 = address2;
    }

    @Column
    private String city;
    public String getCity(){
        return city;
    }
    public void setCity(String city){
        this.city = city;
    }

    @Column
    private String state;
    public String getState(){
        return state;
    }
    public void setState(String state){
        this.state = state;
    }

    @Column
    private String zipCode;
    public String getZipCode(){
        return zipCode;
    }
    public void setZipCode(String zipCode){
        this.zipCode = zipCode;
    }

    @Column
    private String school;
    public String getSchool(){
        return school;
    }
    public void setSchool(String school){
        this.school = school;
    }

    @Column
    private String sex;
    public String getSex(){
        return sex;
    }
    public void setSex(String sex){
        this.sex = sex;
    }

    @Column
    private String race;
    public String getRace(){
        return race;
    }
    public void setRace(String race){
        this.race = race;
    }
    @Column
    private String deleteLinkHash;
    public String getDeleteLinkHash(){
        return deleteLinkHash;
    }
    public void setDeleteLinkHash(String deleteLinkHash){
        this.deleteLinkHash = deleteLinkHash;
    }

    @Column
    private LocalDate deleteLinkDate;
    public LocalDate getDeleteLinkDate(){
        return deleteLinkDate;
    }
    public void setDeleteLinkDate(LocalDate deleteLinkDate){
        this.deleteLinkDate = deleteLinkDate;
    }

    @Column
    private String forgotPassHash;
    public String getForgotPassHash(){
        return forgotPassHash;
    }
    public void setForgotPassHash(String forgotPassHash){
        this.forgotPassHash = forgotPassHash;
    }

    @Column
    private LocalDate forgotPassDate;
    public LocalDate getForgotPassDate(){
        return forgotPassDate;
    }
    public void setForgotPassDate(LocalDate forgotPassDate){
        this.forgotPassDate = forgotPassDate;
    }


    //TODO: Add array variable that holds keywords
    //The tags are used to help recommend scholarship to the user.
    //These tags are categories the user is interested in and should correspond to scholarship tags.
    //  This will probably need to be a separate table with a foreign key to the user. That, or do some janky String stuff with "Math,Science," ect and
    //          getting the string, then separating by , (but that is pretty janky)

    //TODO: Make this constructor protected.
    //This object should only be created with the constructor that requires non-blank values.
    //Making this constructor protected only allows child classes to call it.
    /**
     * The default constructor
     */
    public Account(){

        this.email = "";
        this.password = "";
        this.schoolId = "";
        this.active = false;
        this.userType = "student";
        this.firstName = "";
        this.lastName = "";
    }

    /**
     * Custom constructor. Creates an account object.
     * Parameters are values that must not be blank when this object is created.
     * @param email The email associated with the user. Used for logging in and sending emails.
     * @param password The login value set by the user.
     * @param schoolId The students W number given by weber state.
     * @param active
     * @param userType The role access level for this account.
     * @param firstName The users first name.
     * @param lastName The users last name.
     */
    public Account(String email, String password, String schoolId, Boolean active, String userType, String firstName, String lastName){

        this.email = email;
        this.password = password;
        this.schoolId = schoolId;
        this.active = active;
        this.userType = userType;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    /**
     * This method allows us to see the account information in the console.
     * This is helpful for debugging problems or for logging.
     *
     * @return Returns the 'Account' data formatted as a string.
     */
    @Override
    public String toString() {
        return "Account{" +
                "accountKey=" + accountKey +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", schoolId='" + schoolId + '\'' +
                ", active=" + active +
                ", userType='" + userType + '\'' +
                ", firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", address1='" + address1 + '\'' +
                ", address2='" + address2 + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", school='" + school + '\'' +
                ", sex='" + sex + '\'' +
                ", race='" + race + '\'' +
                '}';
    }

}

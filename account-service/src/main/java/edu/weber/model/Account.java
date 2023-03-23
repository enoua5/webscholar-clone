package edu.weber.model;



import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Account {

    //********** SQL KEYS **********

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


    //********** LOGIN / USER INFO **********

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

    @Column
    @NotNull
    private Boolean isLoggedIn;
    public Boolean getIsLoggedIn(){
        return isLoggedIn;
    }
    public void setIsLoggedIn(boolean isLoggedIn){
        this.isLoggedIn = isLoggedIn;
    }

    @Column
    @NotNull
    @Enumerated(EnumType.STRING)
    private AccountRoles userType;
    public AccountRoles getUserType(){
        return userType;
    }
    public void setUserType(AccountRoles userType){
        this.userType = userType;
    }

    //Each user can request one role at a time, stored in the below column
    @Column
    @Enumerated(EnumType.STRING)
    private AccountRoles requestedRole;
    public AccountRoles getRequestedRole() { return requestedRole; }
    public void setRequestedRole(AccountRoles requestedRole) { this.requestedRole = requestedRole; }


    //********** SCHOOL INFO **********

    @Column(nullable = false)
    @NotBlank
    private String schoolId;
    public String getSchoolId(){
        return schoolId;
    }
    public void setSchoolId(String schoolId){
        this.schoolId = schoolId;
    }

    @Column
    private String major;
    public String getMajor() {return major; }
    public void setMajor(String major) {this.major = major; }

    //********** PERSONAL INFO **********

    @Column(nullable = false)
    @NotBlank
    private String firstName;
    public String getFirstName(){
        return firstName;
    }
    public void setFirstName(String firstName){
        this.firstName = firstName;
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

    //********** ACCOUNT UPDATE / DELETE **********
    @Column
    private String deleteLinkHash;
    public String getDeleteLinkHash(){
        return deleteLinkHash;
    }
    public void setDeleteLinkHash(String deleteLinkHash){
        this.deleteLinkHash = deleteLinkHash;
    }

    @Column
    private LocalDateTime deleteLinkDate;
    public LocalDateTime getDeleteLinkDate(){
        return deleteLinkDate;
    }
    public void setDeleteLinkDate(LocalDateTime deleteLinkDate){
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
    private LocalDateTime forgotPassDate;
    public LocalDateTime getForgotPassDate(){
        return forgotPassDate;
    }
    public void setForgotPassDate(LocalDateTime forgotPassDate){
        this.forgotPassDate = forgotPassDate;
    }

    //TODO: Add array variable that holds keywords
    //The tags are used to help recommend scholarship to the user.
    //These tags are categories the user is interested in and should correspond to scholarship tags.
    //  This will probably need to be a separate table with a foreign key to the user. That, or do some janky String stuff with "Math,Science," ect and
    //          getting the string, then separating by , (but that is pretty janky)


    //********** CONSTRUCTOR & TOSTRING **********

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
        this.isLoggedIn = false;
        this.userType = AccountRoles.student;
        this.firstName = "";
        this.lastName = "";
    }

    /**
     * Custom constructor. Creates an account object.
     * Parameters are values that must not be blank when this object is created.
     * @param email The email associated with the user. Used for logging in and sending emails.
     * @param password The login value set by the user.
     * @param schoolId The students W number given by weber state.
     * @param isLoggedIn
     * @param userType The role access level for this account.
     * @param firstName The users first name.
     * @param lastName The users last name.
     */
    public Account(String email, String password, String schoolId, Boolean isLoggedIn, AccountRoles userType, String firstName, String lastName){

        this.email = email;
        this.password = password;
        this.schoolId = schoolId;
        this.isLoggedIn = isLoggedIn;
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
                ", active=" + isLoggedIn +
                ", userType='" + userType + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zipCode='" + zipCode + '\'' +
                '}';
    }

}

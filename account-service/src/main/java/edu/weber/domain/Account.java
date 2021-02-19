package edu.weber.domain;

import javax.persistence.*;

/**
 * This is a data model. It helps us put data into the backend and send data
 * to the frontend in a standardized format.
 */
@Entity
public class Account {

    //TODO: Use lombok to reduce getter and setter code
    //TODO: Use 'javax.validation' to prevent null values

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private int accountKey;
    @Column
    private String email;
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private String schoolId;
    @Column
    private Boolean active;
    @Column
    private String userType;
    @Column
    private String firstName;
    @Column
    private String middleName;
    @Column
    private String lastName;
    @Column
    private String address1;
    @Column
    private String address2;
    @Column
    private String city;
    @Column
    private String state;
    @Column
    private String zipCode;
    @Column
    private String school;
    @Column
    private String sex;
    @Column
    private String race;

    //TODO: Find if this is necessary
    public Account(String email, String username, String password, String schoolId, Boolean active, String userType, String firstName, String middleName, String lastName, String address1, String address2, String city, String state, String zipCode, String school, String sex, String race) {

        this.email = email;
        this.username = username;
        this.password = password;
        this.schoolId = schoolId;
        this.active = active;
        this.userType = userType;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.school = school;
        this.sex = sex;
        this.race = race;
    }

    //TODO: Find if this is necessary
    public Account(String email, String username, String password, String schoolId, Boolean active) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.schoolId = schoolId;
        this.active = active;
    }

    //TODO: Find if this is necessary
    public Account(String email) {
        this.email = email;
    }

    //TODO: Find if this is necessary
    public Account() {
    }

    public int getAccountKey() {
        return accountKey;
    }

    //TODO: Remove this. Generated ID's should be protected and should only be changed by the database.
    public void setAccountKey(int accountKey) {
        this.accountKey = accountKey;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(String schoolId) {
        this.schoolId = schoolId;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getRace() {
        return race;
    }

    public void setRace(String race) {
        this.race = race;
    }

    /**
     * This method allows us to see the account information in the console.
     * This is helpful for debugging account problems when there is an error.
     *
     * @return Returns the 'Account' data formatted as a string.
     */
    @Override
    public String toString() {
        return "Account{" +
                "accountKey=" + accountKey +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
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

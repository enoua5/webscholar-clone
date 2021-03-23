package edu.weber.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

/**
 * This is a data model. It helps us put data into the backend and send data
 * to the frontend in a standardized format.
 */
@Getter
@Setter
@Entity
public class Account {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Setter(AccessLevel.PRIVATE)
    private int accountKey;
    @Column
    @NotBlank
    private String email;
    @Column
    @NotBlank
    private String username;
    @Column
    @NotBlank
    private String password;
    @Column
    @NotBlank
    private String schoolId;
    @Column
    @NotBlank
    private Boolean active;
    @Column
    @NotBlank
    private String userType;
    @Column
    @NotBlank
    private String firstName;
    @Column
    private String middleName;
    @Column
    @NotBlank
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

    public Account() {
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

package edu.weber.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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

    @Column(nullable = false)
    @NotBlank
    private String email;

    @Column(nullable = false)
    @NotBlank
    private String username;

    @Column(nullable = false)
    @NotBlank
    private String password;

    @Column(nullable = false)
    @NotBlank
    private String schoolId;

    @Column
    @NotNull
    private Boolean active;

    @Column(nullable = false)
    @NotBlank
    private String userType;

    @Column(nullable = false)
    @NotBlank
    private String firstName;

    @Column
    private String middleName;

    @Column(nullable = false)
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

    //TODO: Add array variable that holds keywords
    //The tags are used to help recommend scholarship to the user.
    //These tags are categories the user is interested in and should correspond to scholarship tags.

    //TODO: Make this constructor protected
    /**
     * The default constructor
     */
    public Account(){

        this.email = "";
        this.username = "";
        this.password = "";
        this.schoolId = "";
        this.active = false;
        this.userType = "";
        this.firstName = "";
        this.lastName = "";
    }

    /**
     * Custom constructor. Creates an account object.
     * Parameters are values that must not be blank when this object is created.
     * @param email The email associated with the user. Used for logging in and sending emails.
     * @param username The username set by the user.
     * @param password The login value set by the user.
     * @param schoolId The students W number given by weber state
     * @param active
     * @param userType
     * @param firstName The users first name.
     * @param lastName The users last name.
     */
    public Account(String email, String username, String password, String schoolId, Boolean active, String userType, String firstName, String lastName){

        this.email = email;
        this.username = username;
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

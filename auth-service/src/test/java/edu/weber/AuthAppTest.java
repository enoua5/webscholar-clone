package edu.weber;

import edu.weber.auth.AuthApplication;
import edu.weber.auth.model.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

/**
 *  Unit testing for the Auth Service
 */

public class AuthAppTest {

    private AuthApplication authApplication;

    private String testUser_userName = "Valid User Name";

    private String testUser_password = "Hashed Password";

    /**
     *  Tests creating a User object with a non-null userName and password
     */
    @Test
    @DisplayName("New User Valid")
    public void createNewUser_Valid() {
        Assertions.assertDoesNotThrow(new Executable() {
            @Override
            public void execute() throws Throwable {
                new User(testUser_userName, testUser_password);
            }
        },
                "New User with valid userName and password should not throw any Exception");
    }

    /**
     *  Tests trying to create a User object with a null userName
     */
    @Test
    @DisplayName("New User Null Username")
    public void createNewUser_NullUserName() {
        Assertions.assertThrows(IllegalArgumentException.class, new Executable() {
            @Override
            public void execute() throws Throwable {
                new User(null, testUser_password);
            }
        },
                "Should throw IllegalArgumentException rather than instantiate User with null userName");
    }

    /**
     *  Tests trying to create a User object with a null password
     */
    @Test
    @DisplayName("New User Null Password")
    public void createNewUser_NullPassword() {
        Assertions.assertThrows(IllegalArgumentException.class, new Executable() {
                    @Override
                    public void execute() throws Throwable {
                        new User(testUser_userName, null);
                    }
                },
                "Should throw IllegalArgumentException rather than instantiate User with null password");
    }

    /**
     *  Tests trying to create a User object with both a null userName and null password
     */
    @Test
    @DisplayName("New User Null Username and Password")
    public void createNewUser_NullUserName_Password() {
        Assertions.assertThrows(IllegalArgumentException.class, new Executable() {
                    @Override
                    public void execute() throws Throwable {
                        new User(null, null);
                    }
                },
                "Should throw IllegalArgumentException rather than instantiate User with null userName and password");
    }

    /**
     *  Tests User.getUserName()
     */
    @Test
    @DisplayName("Get User userName")
    public void getUser_userName() {
        User testUser = new User(testUser_userName, testUser_password);

        Assertions.assertEquals(testUser_userName, testUser.getUserName(), "userNames should match");
    }

    /**
     *  Test User.getPassword()
     */
    @Test
    @DisplayName("Get User password")
    public void getUser_password() {
        User testUser = new User(testUser_userName, testUser_password);

        Assertions.assertEquals(testUser_password, testUser.getPassword(), "passwords should match");
    }

}

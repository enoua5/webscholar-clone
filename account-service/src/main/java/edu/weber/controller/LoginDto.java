package edu.weber.controller;

/**
 * Used to send login info to the backend.
 * This is more efficient than sending the entire account object
 * everytime login info needs to be verified.
 */
public class LoginDto {

    //TODO: Remove move this from the 'controller' folder to the 'domain' folder. This is not a controller!

    //TODO: Use 'lombok' to clean up getters and setters
    //TODO: Use 'javax.validation' to prevent null values
    private String username;
    private String password;

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
}

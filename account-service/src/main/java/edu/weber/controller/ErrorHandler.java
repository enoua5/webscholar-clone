package edu.weber.controller;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

//TODO: This is a class for custom http error handling
public class ErrorHandler {
    /**
    * Send if an invalid string was passed to requestRole in AccountController
    */
    public static void invalidRole(String role) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Invalid role value: " + role);
    }
    
    /**
     * Send an http response error if the user already has a pending role request.
     */
    public static void requestAlreadyExists() {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "This user has a role request still pending.");
    }

    /**
     * Send an http response error if the specified account could not be found.
     */
    public static void accountNotFound() {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "The account could not be found!");
    }

    /**
     * Send an http response error if the user enters an incorrect password.
     */
    public static void incorrectPassword(){
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "The password is incorrect.");
    }

    /**
     * Send http response error if a new account was not created.
     */
    public static void accountNotCreated() {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "The account could not be created.");
    }

    /**
     * Send an http response error if data sent did not follow model restrictions.
     */
    public static void invalidData() {
        throw new ResponseStatusException(HttpStatus.PARTIAL_CONTENT, "The data sent was incomplete or invalid!");
    }

    /**
     * Send an http response error if the specified email could not be found
     */
    public static void emailNotFound() {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "The email could not be found!");
    }
    
    //TODO: Add any new custom error handling methods here. Ensure methods are static so other classes can call them.
}

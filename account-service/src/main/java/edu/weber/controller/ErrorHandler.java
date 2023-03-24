package edu.weber.controller;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

//TODO: This is a class for custom http error handling
public class ErrorHandler {
    /**
     * Send an http response error if the user already has a pending role request.
     */
    public static void invalidRole(String role) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Invalid role value: " + role);
    }

    public static void requestAlreadyExists() {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "This user has a role request still pending.");
    }
}

package edu.weber.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

//TODO: This is a class for custom http error handling
public class ErrorHandler {
    /**
     * Send an http response error if the specified account could not be found.
     */
    public static void accountNotFound() {

        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "The account could not be found!");
    }

    /**
     * Send an http response error if the specified account could not be found.
     */
    public static void incorrectPassword(){
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "The password is incorrect");
    }
}

package edu.weber.auth.controller;

import edu.weber.auth.config.AuthConfig;
import edu.weber.auth.model.AuthResponse;
import edu.weber.auth.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * This class manages token requests from the Auth Service
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthConfig.JwtAccessTokenGranter tokenGranter;


    /**
     * This is the main token endpoint. A client sends a request here to get a JWT token
     * That token will be used at the authorization endpoint
     *
     * @param user class that holds username+password+role
     * TODO: Figure out how to bypass authentication requirement for this endpoint
     **/
    @PostMapping("/token")
    public ResponseEntity<?> token(@RequestBody User user) {

        // Sends a validation request to the account-service to make sure username and password are good
        String loginStatus =  login(user);

        if (Objects.equals(loginStatus, "login failed")) {
            // User was not found or password was wrong
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        else if (Objects.equals(loginStatus, "unknown error")) {
            // Unknown error. This code should never be reached unless account-service changes the endpoint
            // and messes something up.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unknown Error");
        }
        else {
            // Log in request was successful
            // JWT token will be generated (using method in class found in AuthConfig) and returned
            // TODO: add role to user before passing it
            OAuth2AccessToken accessToken = tokenGranter.generateToken(user);
            return ResponseEntity.ok(new AuthResponse(accessToken));
        }

    }

    /**
     * Sends a validation request to the account-service
     *
     * @param user class that holds username+password+role
     * @return (1) reason why login failed or (2) string with role
     * TODO: This should eventually be changed to return something other than a String
     * TODO: Needs to implement functionality to tell the difference between login fail and account not found
     **/
    private String login(User user) {
        String returnMessage;

        //TODO: When deployed this URL will not work. Needs to automatically get the base account directory
        String url = "http://localhost:6001/account/validate?email={email}&password={password}";
        RestTemplate restTemplate = new RestTemplate();

        // Define the arguments for the /validate endpoint
        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("email", user.getUserName());
        uriVariables.put("password", user.getPassword());

        try {
            // Send the GET request with the URI variables
            ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class, uriVariables);
            returnMessage = responseEntity.getBody();
        } catch (HttpServerErrorException e) {
            if (e.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR) {
                returnMessage = "login failed";
            } else {
                returnMessage = "unknown error";
            }
        }
        return returnMessage;
    }


}

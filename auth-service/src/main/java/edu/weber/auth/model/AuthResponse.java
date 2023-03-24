package edu.weber.auth.model;

import org.springframework.security.oauth2.common.OAuth2AccessToken;


/**
 * This class is a model for responses from the AuthController
 */
public class AuthResponse {
    private OAuth2AccessToken accessToken;

    public AuthResponse(OAuth2AccessToken accessToken) {
        this.accessToken = accessToken;
    }

    public OAuth2AccessToken getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(OAuth2AccessToken accessToken) {
        this.accessToken = accessToken;
    }
}
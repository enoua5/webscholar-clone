package edu.weber.auth.controller;

import edu.weber.auth.service.UserService;
import edu.weber.auth.model.User;
import edu.weber.auth.model.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

/**
 * This class Manages Authentication requests from the Auth Service
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenStore tokenStore;

    @Autowired
    private JwtAccessTokenConverter accessTokenConverter;

    /**
     * Logs in via the auth service to retrieve a JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        // Create an Authentication object using the user's credentials
        OAuth2Authentication authentication = (OAuth2Authentication) authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword())
        );

        // Generates an access token
        OAuth2AccessToken accessToken = accessTokenConverter.enhance(
                new DefaultOAuth2AccessToken(tokenStore.getAccessToken(authentication).getValue()),
                authentication
        );

        // Return the access token
        return ResponseEntity.ok(new AuthResponse(accessToken));
    }
}

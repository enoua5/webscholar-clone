package edu.weber.auth.controller;

import edu.weber.auth.repository.UserRepository;
import edu.weber.auth.model.User;
import edu.weber.auth.model.AuthResponse;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Date;

/**
 * This class manages Authentication requests from the Auth Service
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    /**
     * Logs in via the auth service to retrieve a JWT token
     **/
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User dbUser = userRepository.findByUserName(user.getUserName());
        if (dbUser != null) {
            if (passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
                OAuth2AccessToken accessToken = generateToken(dbUser);
                // Return the access token
                return ResponseEntity.ok(new AuthResponse(accessToken));
            } else {
                // password doesn't match, return unauthorized response
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
            }
        } else {
            // user not found, return unprocessable entity response
            return ResponseEntity.unprocessableEntity().body("User not found");
        }
    }

    // The secret key used to sign the JWT token
    private final String secret = "mweifafd65ewf68awe47f98w4f6a5hj6ty65j4u6gy3il7a92gr1aer98arge49afg12a3weg1aw9ge8ae4g65asdf4a3s2df1wqa69ef8a9sd7as6df521a3w2ef4fwe98f4as56df1aw321fw6115k5jh65gjk54r56Kadf5s2d1fa56we8e8ftt87df4aw2e2w56e6ad5f841n15i1ui5tyut5uty4r1a2a3fd2"; // TODO: Needs to be changed. Not Secure here

    // Define the expiration time of the JWT token
    private final long expirationTime = 3600000; // 1 hour

    // Generate a JWT token based on the user credentials
    public OAuth2AccessToken generateToken(User user) {
        Date expiration = new Date(System.currentTimeMillis() + expirationTime);
        String encodedJwt = Jwts.builder()
                .setSubject(String.valueOf(user.getUserId()))
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();

        // Create an instance of DefaultOAuth2AccessToken and set the JWT token as its value
        DefaultOAuth2AccessToken accessToken = new DefaultOAuth2AccessToken(encodedJwt);
        return accessToken;
    }
}

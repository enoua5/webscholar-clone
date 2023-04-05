package edu.weber.auth.controller;

import edu.weber.auth.config.AuthResourceConfig;
import edu.weber.auth.repository.UserRepository;
import edu.weber.auth.service.UserService;
import edu.weber.auth.model.User;
import edu.weber.auth.model.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

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

    /** TODO: Uncomment imports for JwtBuilder
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
    private final String secret = "my-secret-key"; // TODO: Set up secret key

    // Define the expiration time of the JWT token
    private final long expirationTime = 3600000; // 1 hour

    // Generate a JWT token based on the user credentials
    private OAuth2AccessToken generateToken(User user) {
        // Define the claims for the JWT token
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", user.getUserId());
        claims.put("username", user.getUserName());
        claims.put("roles", user.getUserRole());

        // Define the expiration date for the JWT token
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + expirationTime);

        // Generate the JWT token with the claims and expiration date
        JwtBuilder jwtBuilder = JwtHelper.jwtBuilder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(secret);

        Jwt jwt = jwtBuilder.compact();
        String encodedJwt = jwt.getEncoded();

        // Create an instance of DefaultOAuth2AccessToken and set the JWT token as its value
        DefaultOAuth2AccessToken accessToken = new DefaultOAuth2AccessToken(encodedJwt);

        return accessToken;
    }**/
}

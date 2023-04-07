package edu.weber.auth.config;

import edu.weber.auth.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.OAuth2RequestFactory;
import org.springframework.security.oauth2.provider.client.JdbcClientDetailsService;
import org.springframework.security.oauth2.provider.request.DefaultOAuth2RequestFactory;
import org.springframework.security.oauth2.provider.token.*;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * This class sets up the Authorization Server using Spring Security
 */
@Configuration
@EnableAuthorizationServer
public class AuthConfig extends AuthorizationServerConfigurerAdapter {

    /**
     * JDBC data to configure the client access
     */
    @Autowired
    private DataSource dataSource;

    /**
     * Store and manage tokens used by auth-service
     */
    @Autowired
    private TokenStore tokenStore;

    /**
     * Converts tokens to JWT
     */
    @Autowired
    private JwtAccessTokenConverter accessTokenConverter;

    /**
     * Configures the endpoints of auth-services
     * Sets the Token store as tokenStore
     *
     * @param endpoints AuthorizationServerEndpointsConfigurer
     * @throws Exception if an error occurs while configuring the endpoints
     */
    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        TokenEnhancerChain tokenEnhancerChain = new TokenEnhancerChain();
        tokenEnhancerChain.setTokenEnhancers(Arrays.asList(tokenEnhancer(), accessTokenConverter));

        endpoints
                .tokenStore(tokenStore)
                .accessTokenConverter(accessTokenConverter);
    }

    /**
     * Configures the clients that are authorized to access the server
     * Sets up JDBC-based client details service that reads the client details from the source.
     *
     * @param clients ClientDetailsServiceConfigurer
     * @throws Exception if an error occurs while configuring
     */
    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients
                .jdbc(dataSource);
    }

    /**
     * Set up a bean to return our custom JWT token enhancer class
     *
     * @return A new instance of CustomTokenEnhancer
     */
    @Bean
    public TokenEnhancer tokenEnhancer() {
        return new CustomTokenEnhancer();
    }

    /**
     * This class allows us to add custom claims to our JWT tokens
     */
    public class CustomTokenEnhancer implements TokenEnhancer {
        @Override
        public OAuth2AccessToken enhance(OAuth2AccessToken oAuth2AccessToken, OAuth2Authentication oAuth2Authentication) {
            Map<String, Object> additionalInfo = new HashMap<>();   // Map of additional info to put on the JWT token
            additionalInfo.put("user_role", "student"); // TODO: Get the user's actual role rather than hard-coding student
            ((DefaultOAuth2AccessToken) oAuth2AccessToken).setAdditionalInformation(additionalInfo);
            return oAuth2AccessToken;
        }
    }

    @Bean
    public JwtAccessTokenGranter tokenGranter() {
        AuthorizationServerTokenServices tokenServices = new DefaultTokenServices();
        ClientDetailsService clientDetailsService = new JdbcClientDetailsService(dataSource);
        OAuth2RequestFactory requestFactory = new DefaultOAuth2RequestFactory(clientDetailsService);
        String grantType = "jwt";
        //TODO: Look into implementing/extending these services

        return new JwtAccessTokenGranter(tokenServices, clientDetailsService, requestFactory, grantType);
    }

    public class JwtAccessTokenGranter extends AbstractTokenGranter {

        /**
         * Secret key used for JWT tokens
         */
        private final String secret = "mweifafd65ewf68awe47f98w4f6a5hj6ty65j4u6gy3il7a92gr1aer98arge49afg12a3weg1aw" +
                "9ge8ae4g65asdf4a3s2df1wqa69ef8a9sd7as6df521a3w2ef4fwe98f4as56df1aw321fw6115k5jh65gjk54r56Kadf5s2d1" +
                "fa56we8e8ftt87df4aw2e2w56e6ad5f841n15i1ui5tyut5uty4r1a2a3fd2";
                // TODO: Needs to be changed. Not Secure here

        /**
         * Expiration for JWT tokens
         */
        private final long expirationTime = 3600000; // 1 hour

        public JwtAccessTokenGranter(AuthorizationServerTokenServices tokenServices,
                                     ClientDetailsService clientDetailsService, OAuth2RequestFactory requestFactory,
                                     String grantType) {
            super(tokenServices, clientDetailsService, requestFactory, grantType);
        }

        public OAuth2AccessToken generateToken(User user) {
            Date expiration = new Date(System.currentTimeMillis() + expirationTime);
            String encodedJwt = Jwts.builder()
                    .setSubject(String.valueOf(user.getUserName()))
                    .setExpiration(expiration)
                    .signWith(SignatureAlgorithm.HS512, secret)
                    .compact();

            // Create an instance of DefaultOAuth2AccessToken and set the JWT token as its value
            DefaultOAuth2AccessToken accessToken = new DefaultOAuth2AccessToken(encodedJwt);

            // Use our token enhancer to add our custom claims to the token
            return tokenEnhancer().enhance(accessToken, null);

            //return accessToken;
        }
    }

}

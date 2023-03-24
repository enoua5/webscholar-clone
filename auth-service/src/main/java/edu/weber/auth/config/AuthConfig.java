package edu.weber.auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

import javax.sql.DataSource;
import java.util.Arrays;
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
     * @return
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
            additionalInfo.put("user_role", "student"); // Hard-coded as student for testing purposes
            ((DefaultOAuth2AccessToken) oAuth2AccessToken).setAdditionalInformation(additionalInfo);
            return oAuth2AccessToken;
        }
    }
}

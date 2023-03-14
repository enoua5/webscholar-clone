package edu.weber.auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.approval.UserApprovalHandler;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

import javax.sql.DataSource;

/**
 * This class sets up the Authorization Server using Spring Security
 */

@Configuration
@EnableAuthorizationServer
public class AuthConfig extends AuthorizationServerConfigurerAdapter {

    // JDBC data to configure the client access
    @Autowired
    private DataSource dataSource;

    // Store and manage tokens used by auth-service
    @Autowired
    private TokenStore tokenStore;

    // Converts tokens to JWT
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
        endpoints.tokenStore(tokenStore)
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
}

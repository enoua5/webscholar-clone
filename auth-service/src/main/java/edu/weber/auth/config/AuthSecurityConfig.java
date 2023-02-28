package edu.weber.auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.approval.ApprovalStore;
import org.springframework.security.oauth2.provider.approval.TokenApprovalStore;
import org.springframework.security.oauth2.provider.approval.TokenStoreUserApprovalHandler;
import org.springframework.security.oauth2.provider.request.DefaultOAuth2RequestFactory;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;

/**
 * This class handles who can handle which API and how they can access it.
 * Thus handles the access control for all microservices.
 */
@Configuration
@EnableWebSecurity
public class AuthSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private ClientDetailsService clientDetailsService;

    /**
     * This method takes an incoming http request and applies restrictions to it.
     * These restrictions limit whether a request is accepted by the backend controllers.
     * - The API URL can be specified to narrow the restrictions to certain parts of code.
     * - The API mapping type can be restricted (get, post, delete etc).
     * - The user role can be restricted (student, admin, etc).
     * - Other settings can be restricted as well. Look at the spring documentation.
     * @param http This is the incoming http object that holds the incoming request information.
     * @throws Exception Throws an error if the http request could not be handled.
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        //Set authentication and access level for each API endpoint
        http
                // Enables HTTP Basic authentication for the web application
                .httpBasic()
                .and()
                // Specifies that access control should be applied to all requests to the application's API endpoints
                .authorizeRequests()
                // Allows unrestricted access to any endpoint under the "/actuator" path
                .antMatchers("/actuator/**").permitAll()

                // Todo: Add 'role' access levels
                // Anyone can access this endpoint
                // Allows unrestricted access to any POST request to an endpoint under the "/accounts" path
                .antMatchers(HttpMethod.POST, "/accounts/**").permitAll()
                // Allows unrestricted access to any POST request to an endpoint under the "/accounts" path
                .antMatchers(HttpMethod.GET, "/accounts/**").permitAll()

                // Allows access to the issue-service Testing API
                // Allows unrestricted access to any POST request to an endpoint under the "/issue" path
                .antMatchers(HttpMethod.POST, "/issue/**").permitAll()
                // Allows unrestricted access to any POST request to an endpoint under the "/issue" path
                .antMatchers(HttpMethod.GET, "/issue/**").permitAll()
                //  Requires authentication for all other requests.
                .anyRequest().authenticated()

                .and()
                // Disables Cross-Site Request Forgery (CSRF) protection
                // Todo: This is only for testing purposes. Should be removed. CSRF protection is important
                .csrf().disable()
                // Disables form-based login
                .formLogin().disable()
                //  Application won't track user sessions
                .sessionManagement().disable();
    }

    @Bean
    public TokenStore tokenStore() {
        return new InMemoryTokenStore();
    }

    @Bean
    @Autowired
    public TokenStoreUserApprovalHandler userApprovalHandler(TokenStore tokenStore) {
        TokenStoreUserApprovalHandler handler = new TokenStoreUserApprovalHandler();
        handler.setTokenStore(tokenStore);
        handler.setRequestFactory(new DefaultOAuth2RequestFactory(clientDetailsService));
        handler.setClientDetailsService(clientDetailsService);
        return handler;
    }

    @Bean
    @Autowired
    public ApprovalStore approvalStore(TokenStore tokenStore) throws Exception {
        TokenApprovalStore store = new TokenApprovalStore();
        store.setTokenStore(tokenStore);
        return store;
    }

}

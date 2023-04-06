package edu.weber.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * This class handles who can handle which API and how they can access it.
 * Thus handles the access control for all microservices.
 */
@Configuration
@EnableWebSecurity
public class AuthSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService())
                .passwordEncoder(passwordEncoder());
    }

    /**
     * Used by the AuthController
     */
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    /**
     * This method takes an incoming http request and applies restrictions to it.
     * These restrictions limit whether a request is accepted by the backend controllers.
     * - The API URL can be specified to narrow the restrictions to certain parts of code.
     * - The API mapping type can be restricted (get, post, delete etc).
     * - The user role can be restricted (student, admin, etc).
     * - Other settings can be restricted as well. Look at the spring documentation.
     * @param http This is the incoming http object that holds the incoming request information.
     * @throws Exception Throws an error if the http request could not be handled.
     * TODO: Test to see if this is actually working or just blocking everything
     * TODO: Add functionality with token
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

                // Anyone can access this endpoint
                // Allows unrestricted access to any POST request to an endpoint under the "/token" path
                .antMatchers("/auth/token").permitAll()

                // Allows access to the issue-service Testing API
                // Allows unrestricted access to any POST request to an endpoint under the "/issue" path
                .antMatchers(HttpMethod.POST, "/issue/**").permitAll()
                // Allows unrestricted access to any POST request to an endpoint under the "/issue" path
                .antMatchers(HttpMethod.GET, "/issue/**").permitAll()
                //  Requires authentication for all other requests.
                .anyRequest().authenticated()

                .and()
                // Disables Cross-Site Request Forgery (CSRF) protection
                // TODO: This is only for testing purposes. Should be removed. CSRF protection is important
                .csrf().disable()
                // Disables form-based login
                .formLogin().disable()
                //  Application won't track user sessions
                .sessionManagement().disable();
                //.antMatchers("/auth/**").permitAll() // Allows for authorization. Disabled for testing
    }

}

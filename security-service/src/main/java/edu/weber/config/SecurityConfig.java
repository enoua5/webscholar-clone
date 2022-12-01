package edu.weber.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// TODO
/**
 * This class handles who can handle which API and how they can access it.
 * Thas handles the access control for all micro-services.
 */
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * This method takes an incoming http request and applies restrictions to it.
     * These restrictions limit whether or not a request is accepted by the backend controllers.
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
                .httpBasic()
                .and()
                .authorizeRequests()
                .antMatchers("/actuator/**").permitAll()

                //Todo: Add 'role' access levels
                //Anyone can access this endpoint
                .antMatchers(HttpMethod.POST, "/accounts/**").permitAll()
                .antMatchers(HttpMethod.GET, "/accounts/**").permitAll()

                // Allow's access to the issue-service Testing API
                .antMatchers(HttpMethod.POST, "/issue/**").permitAll()
                .antMatchers(HttpMethod.GET, "/issue/**").permitAll()
                .anyRequest().authenticated()

                .and()
                .csrf().disable()
                .formLogin().disable()
                .sessionManagement().disable();
        //http.csrf().disable();
    }


}

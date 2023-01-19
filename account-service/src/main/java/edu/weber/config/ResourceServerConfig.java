package edu.weber.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

//Todo: Figure out why this exists when we have a 'config-service' microservice already coded. What is this codes purpose.
@Configuration
//@EnableResourceServer
public class ResourceServerConfig extends WebSecurityConfigurerAdapter {


    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors().disable();
        http.authorizeRequests()
                .antMatchers("/").permitAll()
                .anyRequest().permitAll()
                .and()
                .httpBasic()
        ;
    }

}

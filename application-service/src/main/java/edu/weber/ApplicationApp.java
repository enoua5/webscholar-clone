package edu.weber;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ApplicationApp {
    public static void main( String[] args )
    {
        SpringApplication.run(ApplicationApp.class, args);
    }
}

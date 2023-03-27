package edu.weber;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ScholarshipApplicationApp {
    public static void main( String[] args )
    {
        SpringApplication.run(ScholarshipApplicationApp.class, args);
    }
}

package edu.weber;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableEurekaClient
@SpringBootApplication
@EntityScan("edu.weber.model")
public class ScholarshipApplicationApp {
    public static void main( String[] args )
    {
        SpringApplication.run(ScholarshipApplicationApp.class, args);
    }
}

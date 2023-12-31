package edu.weber;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.AutoConfigurationPackage;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableDiscoveryClient
@EnableFeignClients
@EnableCircuitBreaker
//@EnableJpaRepositories(basePackages = {"edu.weber.service"})
@ComponentScan(basePackages = {"edu.weber.service", "edu.weber"})
@EnableJpaRepositories("edu.weber.repository")
@EntityScan(basePackages = "edu.weber.model")
@AutoConfigurationPackage

@SpringBootApplication
public class IssueApp {
    public static void main(String[] args) {
        SpringApplication.run(IssueApp.class, args);
    }
}

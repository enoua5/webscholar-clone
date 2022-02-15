package edu.weber;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
@EnableCircuitBreaker
//@EnableJpaRepositories(basePackages = {"edu.weber.service"})
//@ComponentScan(basePackages = {"edu.weber.service","edu.weber"})
@EnableJpaRepositories("edu.weber.repository")
@EntityScan(basePackages = "edu.weber.domain")

public class AccountApp
{
    private static final Logger logM = LoggerFactory.getLogger(AccountApp.class);
    public static void main( String[] args )
    {
        logM.debug("AccountApp.main() Started Debug");
        SpringApplication.run(AccountApp.class, args);
    }
}

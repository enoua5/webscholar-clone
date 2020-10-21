package edu.weber;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.SpringCloudApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringCloudApplication
@EnableCircuitBreaker
@EnableDiscoveryClient
public class AccountApp
{
    public static void main( String[] args )
    {
        SpringApplication.run(AccountApp.class, args);
    }
}

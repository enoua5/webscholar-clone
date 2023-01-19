package edu.weber.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import edu.weber.config.*;
@SpringBootApplication
@EnableResourceServer
@EnableDiscoveryClient
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AuthApplication {

	public static void main(String[] args) {
		System.setProperty("com.sun.xml.bind.v2.bytecode.ClassTailor.noOptimize", "true");
		SpringApplication.run(AuthConfig.class, args);
	}

}

package com.psn.psn_authentication;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.SpringApplication;

@CrossOrigin
@EnableAutoConfiguration
@EnableConfigurationProperties
@SpringBootApplication
public class PsnAuthenticationApplication {

	public static void main(String[] args) {
		SpringApplication.run(PsnAuthenticationApplication.class, args);
		System.out.println("Start the server");
	}

}

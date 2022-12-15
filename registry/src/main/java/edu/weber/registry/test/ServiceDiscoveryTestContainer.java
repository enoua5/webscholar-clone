package edu.weber.registry.test;

/*
Test container for integration testing with service discovery. This file might be placed in a separate microservice
specifically for unit testing.
 */

import org.jetbrains.annotations.NotNull;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.lifecycle.Startables;

import java.util.stream.Stream;

public class ServiceDiscoveryTestContainer {

    public static class Initializer implements ApplicationContextInitializer {

        public static GenericContainer eurekaServer =
                new GenericContainer("springcloud/eureka").withExposedPorts(8765);

        @Override
        public void initialize(@NotNull ConfigurableApplicationContext configurableApplicationContext) {

            Startables.deepStart(Stream.of(eurekaServer)).join();

            TestPropertyValues
                    .of("eureka.client.serviceUrl.defaultZone=http://localhost:"
                            + eurekaServer.getFirstMappedPort().toString()
                            + "/eureka")
                    .applyTo(configurableApplicationContext);
        }
    }


}

#This file builds a custom image to run the specified spring boot application micro-service

#This is the base image
FROM java:8-jre
MAINTAINER Alexander Lukyanchikov <sqshq@sqshq.com>

#This adds the jar file built by maven into the images app folder
ADD ./target/security-service.jar /app/

#This tells the container how to run the jar file we added
CMD ["java", "-Xmx300m", "-jar", "/app/security-service.jar"]

HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:5000/actuator/health || exit 1

#This tells the container to open port 5000 to the docker host
#The docker-compose.yml maps this port from the internal docker network to the localhost
EXPOSE 5000
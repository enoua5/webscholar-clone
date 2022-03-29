#This file builds a custom image to run the specified spring boot application micro-service

#This is the base image
FROM java:8-jre

#This adds the jar file built by maven into the images app folder
ADD ./target/config-service.jar /app/

#This tells the container how to run the jar file we added
CMD ["java", "-Xmx300m", "-jar", "/app/config-service.jar"]

HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:8888/actuator/health || exit 1

#This tells the container to open port 8888 to the docker host
#The docker-compose.yml maps this port from the internal docker network to the localhost
EXPOSE 8888
# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the target directory into the container
COPY target/*.jar app.jar

# Expose port 8080 for the Spring Boot application
EXPOSE 8080

# Run the JAR file when the container is started
CMD ["java", "-jar", "app.jar"]

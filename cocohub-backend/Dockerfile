# STAGE 1: BUILD
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# STAGE 2: RUNTIME
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/cocohub-backend-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=$PORT"]

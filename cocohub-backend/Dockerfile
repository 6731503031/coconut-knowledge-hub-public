# STAGE 1: BUILD
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
# copy เฉพาะโฟลเดอร์ backend
COPY cocohub-backend/ /app
# build JAR
RUN mvn clean package -DskipTests

# STAGE 2: RUNTIME
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# copy JAR จาก stage build
COPY --from=build /app/target/cocohub-backend-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080
# รองรับ PORT ที่ Render กำหนด
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=$PORT"]

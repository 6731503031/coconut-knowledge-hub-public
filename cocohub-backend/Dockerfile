#แก้ไข: เปลี่ยนจาก openjdk:21-jdk-slim ที่ค้นหาไม่เจอ เป็น maven:3.9.6-eclipse-temurin-21

FROM maven:3.9.6-eclipse-temurin:21-jdk-jfr AS build

#กำหนด Working Directory ภายใน Container

WORKDIR /app

#1. คัดลอก pom.xml และ Source Code

#เนื่องจากคุณไม่มีขั้นตอน COPY แยกสำหรับ pom.xml และ src/ เหมือนในตัวอย่างแรก

#การ COPY ทั้งหมด (. /app) จะทำงานได้ ถ้าคุณมั่นใจว่า Maven จะเจอ Main Class

COPY . /app

#2. ลบขั้นตอน RUN apt-get install -y maven ออก

#เนื่องจาก Image นี้มี Maven อยู่แล้ว (FROM maven:...)

#3. สั่ง Build โค้ด (สร้าง Executable JAR)

#แก้ไข: เพิ่มคำสั่ง clean ก่อน package เพื่อให้แน่ใจว่าได้ build ใหม่หมดจด

#และระบุ main class ใน pom.xml แทนการใช้ -Dstart-class ใน command line

RUN mvn clean package -DskipTests

#-----------------------------------------------------------------

#STAGE 2: RUNTIME (ใช้ Image JRE 21 ขนาดเล็ก)

#-----------------------------------------------------------------

#แก้ไข: เปลี่ยนจาก openjdk:21-jdk-slim เป็น eclipse-temurin:21-jre-alpine ซึ่งมีอยู่จริง

FROM eclipse-temurin:21-jre-alpine

#กำหนด Working Directory สำหรับรัน

WORKDIR /app

#คัดลอก JAR ไฟล์ที่สร้างเสร็จแล้วจาก Stage 'build'

#ชื่อ JAR อ้างอิงจาก pom.xml: cocohub-backend-0.0.1-SNAPSHOT.jar

COPY --from=build /app/target/cocohub-backend-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

#กำหนดให้ Container รัน JAR ไฟล์เมื่อเริ่มต้น

ENTRYPOINT ["java", "-jar", "app.jar"]
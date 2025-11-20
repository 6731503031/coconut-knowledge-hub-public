[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/acBO14Rf)
Project
=============
Please use this template for your project.

List your group's member's below with ID and name.
# Member ID
- 6731503031 Ratthaphum Wanthamat
- 6731503038 Waiyapruek Thongin
- 6731503104 Nuttida Butthanoo
- 6731503105 Thanchanok kakaew
- 6731503114 Pattharapol Prommin
- 6731503120 Wirakorn Khumwiset

  ...


  ...
 1. โปรแกรมที่ต้องติดตั้ง (Programs to Install)
(ติดตั้งแค่ครั้งเดียว)

VS Code

Git

Docker Desktop (แก้คำผิด)

JDK 21 (ต้องตั้งค่า JAVA_HOME path)

Maven (ต้องตั้งค่า MAVEN_HOME และ PATH)

Node.js (LTS)

2. ขั้นตอนการรัน (How to Run)
1. Clone โปรเจกต์

Bash

git clone https://github.com/softeng-mfu/99-project-coconut-knowledge-hub.git
cd 99-project-coconut-knowledge-hub
2. รัน Database (ด้วย Docker)

(ต้องมั่นใจว่า Docker Desktop เปิดอยู่)

(ต้องมั่นใจว่า XAMPP/MySQL ตัวอื่น ปิด อยู่ เพื่อไม่ให้พอร์ต 3306 ชนกัน)

Bash

docker-compose up -d
3. Import ข้อมูล

รอ 20 วินาที (ให้ MySQL บูตเสร็จก่อน)

(ต้องมั่นใจว่าไฟล์ .sql ของคุณชื่อ cocohub_db_final.sql จริงๆ)

PowerShell

# สำหรับ PowerShell (Windows)
Get-Content "cocohub_db_final.sql" | docker exec -i mysql-cocohub mysql -u root cocohub_db
(ถ้ามัน "เงียบ" (Nothing happened) = ทำงานสำเร็จ!)

4. รัน Backend (ใน Terminal ที่ 1)

(เปิด Terminal อันที่ 1)

Bash

cd cocohub-backend
mvn spring-boot:run
(รอจนเห็น Tomcat started on port(s): 8080... แล้ว "ปล่อย Terminal นี้ทิ้งไว้")

5. รัน Frontend (ใน Terminal ที่ 2)

(เปิด Terminal อันใหม่ แยกต่างหาก)

Bash

cd cocohub-frontend
npm install  # (ทำแค่ครั้งแรก)
npm run dev
( "ปล่อย Terminal นี้ทิ้งไว้")

3. URL สำหรับเข้าใช้งาน
Frontend (หน้าร้าน): http://localhost:5173

phpMyAdmin (แก้ Database): http://localhost:8081

Username: root

Password: (เว้นว่างไว้)
  ...


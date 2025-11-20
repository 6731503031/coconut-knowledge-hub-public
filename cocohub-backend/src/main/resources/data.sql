SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE User;
TRUNCATE TABLE Variety;
TRUNCATE TABLE Product;
TRUNCATE TABLE Article;
TRUNCATE TABLE Price;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO User (user_id, email, password_hash, display_name, user_type, phone_number, province, registered_date, status) 
VALUES 
('U001', 'entrepreneur@cocohub.com', '$2a$10$dummyHash...', 'สมศรี มีสุข', 'Entrepreneur', '0812345678', 'ชุมพร', '2025-11-01T10:30:00', 'Active'),
('U002', 'farmer@cocohub.com', '$2a$10$dummyHash...', 'สมชาย ใจดี', 'Farmer', '0898765432', 'ประจวบคีรีขันธ์', '2025-11-02T14:00:00', 'Active');

INSERT INTO Variety (id, name, type, description, climate_zone, `usage`) 
VALUES 
('V001', 'มะพร้าวน้ำหอม (Nam Hom)', 'Dwarf', 'เป็นพันธุ์ที่นิยมปลูกมากที่สุดในประเทศไทยเพื่อบริโภคผลสด', 'Tropical', 'ดื่มน้ำ, ทำขนม'),
('V002', 'มะพร้าวพันธุ์กะทิ (Makapuno)', 'Tall', 'มีเนื้อหนา ฟู นุ่ม ใช้สำหรับทำกะทิและขนมหวานโดยเฉพาะ', 'Tropical', 'ทำกะทิ, ขนมหวาน'),
('V003', 'มะพร้าวพันธุ์สวีลูกผสม 1 (Hybrid)', 'Hybrid', 'ผลผลิตสูง ทนทานต่อสภาพอากาศ', 'Tropical, Coastal', 'แปรรูปน้ำมัน, กะทิ');

INSERT INTO Product (id, name, category, description, price, unit, rating, manufacturer_id, image_url, stock_quantity) 
VALUES 
('P001', 'น้ำมันมะพร้าวสกัดเย็น ออร์แกนิค', 'Processed', 'น้ำมันมะพร้าวบริสุทธิ์ 100% ไม่ผ่านความร้อน', 250.00, 'ขวด 500ml', 4.8, 'U001', 'https://example.com/images/coconut_oil.jpg', 100),
('P002', 'มะพร้าวน้ำหอมส่งออก (เกรด A)', 'Fresh', 'มะพร้าวน้ำหอมจากสวน อ.บ้านแพ้ว จ.สมุทรสาคร', 360.00, 'กล่อง 12 ลูก', 4.5, 'U001', 'https://example.com/images/fresh_coconut.jpg', 200),
('P003', 'เครื่องขูดมะพร้าวไฟฟ้า', 'Equipment', 'เครื่องขูดมะพร้าวสำหรับครัวเรือนและร้านอาหาร', 1500.00, 'เครื่อง', 4.2, 'U001', 'https://example.com/images/grater.jpg', 50);

INSERT INTO Article (id, title, category, author, publish_date, content, image_url) 
VALUES 
('A001', '5 ประโยชน์ของน้ำมันมะพร้าวสกัดเย็น', 'Guide', 'กอง บก. CocoHub', '2025-11-10T09:00:00', 'น้ำมันมะพร้าวสกัดเย็นมีประโยชน์มากมาย... (เนื้อหาบทความ) ...', 'https://example.com/images/article_oil.jpg'),
('A002', 'สถานการณ์ราคามะพร้าวไตรมาส 4', 'News', 'ศูนย์วิจัย CocoHub', '2025-11-12T15:00:00', 'ราคามะพร้าวในตลาดโลกมีแนวโน้มสูงขึ้น... (เนื้อหาข่าว) ...', 'https://example.com/images/article_market.jpg');

INSERT INTO Price (date, central_price, south_price, northeast_price) 
VALUES 
('2025-11-01', 15.8, 17.0, 16.5),
('2025-11-02', 15.9, 17.1, 16.5),
('2025-11-03', 16.0, 17.0, 16.6);
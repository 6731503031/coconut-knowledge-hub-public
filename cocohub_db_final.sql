-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Nov 17, 2025 at 12:59 AM
-- Server version: 8.4.7
-- PHP Version: 8.3.26
SET FOREIGN_KEY_CHECKS=0;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cocohub_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` enum('Guide','News','Research') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publish_date` datetime(6) DEFAULT NULL,
  `title` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_id` int DEFAULT NULL,
  `published_date` date DEFAULT NULL,
  `category` enum('Guide','News','Research') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publish_date` datetime(6) DEFAULT NULL,
  `title` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `external_url` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `author_id`, `published_date`, `category`, `created_at`, `author`, `image_url`, `publish_date`, `title`, `external_url`) VALUES
('1', 1, '2025-11-10', 'News', '2025-11-14 15:41:49', 'matichon', 'https://www.matichon.co.th/wp-content/uploads/2025/07/ovo18-wed-1024x538.jpg', '2025-11-13 12:15:41.000000', 'ราคาดิ่งเหลือ4บาท! มะพร้าวน้ำหอมราชบุรีวิกฤตหนัก เกษตรกรวอนรัฐช่วยเหลือเร่งแก้ปัญหา\n', 'https://www.matichon.co.th/region/news_5278438'),
('2', 2, '2025-11-12', 'Guide', '2025-11-14 15:41:49', 'sanook', 'https://s.isanook.com/ns/0/ud/1962/9811082/new-thumbnail1200x720_v2-20.jpg?ip/crop/w1200h700/q80/webp', '2025-11-03 11:16:37.000000', 'There are two groups of people who should not drink coconut water, as it is life-threatening. They are not diabetic patients, as many people believe.\r\n', 'https://www.sanook.com/news/9811082/'),
('3', 3, '2025-11-12', 'Research', '2025-11-14 15:41:49', 'Weerachai Tunjaroen', 'https://www.phtnet.org/wp-content/uploads/2017/08/article-coconut-thai.jpg', '2025-11-17 07:06:48.000000', 'The empirical study of factors influencing coconut price in Thailand', 'https://www.phtnet.org/2017/03/343/');

-- --------------------------------------------------------

--
-- Table structure for table `article_translations`
--

CREATE TABLE `article_translations` (
  `id` bigint NOT NULL,
  `article_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lang_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `summary` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_url` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `article_translations`
--

INSERT INTO `article_translations` (`id`, `article_id`, `lang_code`, `title`, `content`, `summary`, `image_url`, `external_url`) VALUES
(1, '1', 'en', 'The price has plummeted to 4 baht! Ratchaburi\'s sweet coconuts are in a serious crisis. Farmers are asking the government for help in solving the problem.', 'A severe crisis has prompted calls for government assistance to address the issue of falling coconut prices and a large amount of unsold products. Meanwhile, the Mayor of Ratchaburi Provincial Administrative Organization visited the area and proposed establishing a \"Ratchaburi Provincial Agricultural Product Distribution Center\" near production sites.\r\n\r\nOn July 16th, reporters reported on the progress of the situation in which coconut farmers in Ratchaburi Province are facing a severe price crisis. The farm gate price has dropped to just 3-4 baht per coconut, far below the average production cost of 6 baht per coconut. This has severely impacted farmers. While approximately 6 million coconuts are exported domestically and internationally, with markets in China, the United States, and Australia remaining, approximately 2 million coconuts remain unsold daily.\r\n\r\nThe Thai Coconut Association is coordinating with relevant government and private agencies to address the situation. They have requested the Ministry of Commerce to find ways to distribute the produce and open new markets. They have also requested cooperation from the Ministry of Industry to coordinate with factories to purchase additional produce.', NULL, 'https://www.matichon.co.th/wp-content/uploads/2025/07/ovo18-wed-1024x538.jpg', 'https://www.matichon.co.th/region/news_5278438'),
(2, '1', 'th', 'ราคาดิ่งเหลือ4บาท! มะพร้าวน้ำหอมราชบุรีวิกฤตหนัก เกษตรกรวอนรัฐช่วยเหลือเร่งแก้ปัญหา\r\n', 'วิกฤตหนัก วอนรัฐเข้าช่วยเหลือ เร่งแก้ปัญหาเกษตรกรประสบปัญหามะพร้าวน้ำหอมราคาตกต่ำ สินค้าตกค้างจำนวนมาก ขณะที่นายกองค์การบริหารส่วนจังหวัดราชบุรีลงพื้นที่ เสนอเตรียมจัดตั้ง “ ศูนย์จำหน่ายสินค้าเกษตรจังหวัดราชบุรี ” บริเวณพื้นที่ใกล้แหล่งผลิต\r\n\r\nเมื่อวันที่ 16 กรกฎาคม ผู้สื่อข่าวรายงานความคืบหน้า กรณีเกษตรกรปลูกมะพร้าวน้ำหอมในพื้นที่ จ.ราชบุรี กำลังเผชิญวิกฤตราคามะพร้าวน้ำหอมตกต่ำอย่างรุนแรง โดยราคาหน้าสวนลดลงเหลือเพียง 3 – 4 บาทต่อผล ต่ำกว่าต้นทุนการผลิตที่เฉลี่ยอยู่ที่ 6 บาทต่อผล ส่งผลให้เกษตรกรเดือดร้อนอย่างหนัก ขณะที่ผลผลิตส่งออกขายทั้งภายในประเทศและต่างประเทศประมาณ 6 ล้านผลต่อวัน มีตลาดจีน อเมริกา ออสเตรเลีย แต่ยังมีผลผลิตตกค้างประมาณ 2 ล้านผลต่อวัน\r\n\r\nโดยสมาคมมะพร้าวน้ำหอมไทย ได้เร่งประสานหน่วยงานที่เกี่ยวข้อง ทั้งภาครัฐและเอกชน เพื่อเร่งแก้ไขสถานการณ์ โดยขอให้กระทรวงพาณิชย์หาแนวทางกระจายผลผลิต และเปิดตลาดรองรับใหม่ พร้อมทั้งขอความร่วมมือจากกระทรวงอุตสาหกรรมในการประสานโรงงานรับซื้อผลผลิตเพิ่มเติม\r\n', NULL, 'https://www.matichon.co.th/wp-content/uploads/2025/07/ovo18-wed-1024x538.jpg', 'https://www.matichon.co.th/region/news_5278438'),
(3, '3', 'en', 'The empirical study of factors influencing coconut price in Thailand\r\n', 'Coconut water is a cash crop that generates high income for farmers and is popular among both Thais and foreigners. In addition to its sweet flavor and aroma, coconut water is unique from coconuts from other countries. It is also rich in minerals and nutrients beneficial to the body, such as potassium, iron, sodium, calcium, magnesium, phosphorus, and amino acids that the body can use immediately. Therefore, it is popular with consumers around the world.', '', 'https://www.phtnet.org/wp-content/uploads/2017/08/article-coconut-thai.jpg', 'https://www.phtnet.org/2017/03/343/'),
(4, '3', 'th', 'วิเคราะห์ปัจจัยที่มีผลต่อตลาดมะพร้าวไทย เช่น ราคาตลาดโลก ดัชนีผู้บริโภค ค่าเงิน ฯลฯ\r\n', 'มะพร้าวน้ำหอม เป็นพืชเศรษฐกิจชนิดหนึ่งที่สามารถทำรายได้สูงให้กับเกษตรกร และเป็นที่นิยมของทั้งชาวไทยและชาวต่างประเทศ นอกจากน้ำมะพร้าวน้ำหอมจะมีรสหวานมีกลิ่นหอมแตกต่างจากมะพร้าวของประเทศอื่นแล้ว ยังอุดมไปด้วยแร่ธาตุ และสารอาหารที่มีประโยชน์ต่อร่างกาย เช่น โปแทสเซียม เหล็ก โซเดียม แคลเซียม แมกนีเซียม ฟอสฟอรัส และกรดอะมิโน ที่ร่างกายสามารถนำไปใช้ได้ทันที จึงไม่แปลกที่จะเป็นที่นิยมของผู้บริโภคทั่วโลก', '', 'https://www.phtnet.org/wp-content/uploads/2017/08/article-coconut-thai.jpg', 'https://www.phtnet.org/2017/03/343/'),
(5, '2', 'th', 'คน 2 กลุ่มที่ไม่ควรดื่ม \"น้ำมะพร้าว\" เสี่ยงอันตรายถึงชีวิต ไม่ใช่ผู้ป่วยเบาหวาน อย่างที่หลายคนเข้าใจ\r\n', 'แม้ “น้ำมะพร้าว” จะเป็นเครื่องดื่มจากธรรมชาติที่มีประโยชน์ต่อสุขภาพ ช่วยเติมน้ำหล่อเลี้ยงร่างกาย และอุดมด้วยแร่ธาตุสำคัญอย่างโพแทสเซียม แมกนีเซียม และวิตามินหลายชนิด แต่รู้หรือไม่? สำหรับบางคน การดื่มน้ำมะพร้าวอาจก่อให้เกิดผลเสียต่อร่างกายมากกว่าผลดี โดยเฉพาะใน 2 กลุ่มเสี่ยง ที่แพทย์เตือนว่า ควรระวังหรือหลีกเลี่ยงการดื่มน้ำมะพร้าว', '', 'https://s.isanook.com/ns/0/ud/1962/9811082/new-thumbnail1200x720_v2-20.jpg?ip/crop/w1200h700/q80/webp', 'https://www.sanook.com/news/9811082/'),
(6, '2', 'en', 'There are two groups of people who should not drink coconut water, as it is life-threatening. They are not diabetic patients, as many people believe.', 'Although coconut water is a natural beverage that is beneficial to health, helps replenish water and is rich in important minerals such as potassium, magnesium and many vitamins, did you know that for some people, drinking coconut water can cause more harm than good? This is especially true for two at-risk groups, who doctors have warned should be careful or avoid drinking coconut water.', '', 'https://s.isanook.com/ns/0/ud/1962/9811082/new-thumbnail1200x720_v2-20.jpg?ip/crop/w1200h700/q80/webp', 'https://www.sanook.com/news/9811082/');

-- --------------------------------------------------------

--
-- Table structure for table `market_prices`
--

CREATE TABLE `market_prices` (
  `id` int NOT NULL,
  `price_date` date NOT NULL,
  `central_price` decimal(38,2) DEFAULT NULL,
  `south_price` decimal(38,2) DEFAULT NULL,
  `northeast_price` decimal(38,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `market_prices`
--

INSERT INTO `market_prices` (`id`, `price_date`, `central_price`, `south_price`, `northeast_price`) VALUES
(1, '2025-11-01', 15.50, 14.80, 16.00),
(2, '2025-11-02', 15.75, 14.90, 16.10),
(3, '2025-11-03', 15.60, 15.00, 16.05),
(4, '2025-11-04', 16.00, 16.80, 20.00),
(5, '2025-11-05', 5.00, 10.00, 30.00);

-- --------------------------------------------------------

--
-- Table structure for table `price`
--

CREATE TABLE `price` (
  `date` date NOT NULL,
  `central_price` decimal(38,2) DEFAULT NULL,
  `northeast_price` decimal(38,2) DEFAULT NULL,
  `south_price` decimal(38,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category` enum('Equipment','Fresh','Processed') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT NULL,
  `stock_quantity` int DEFAULT NULL,
  `unit` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manufacturer_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `sku`, `price`, `created_at`, `category`, `image_url`, `rating`, `stock_quantity`, `unit`, `manufacturer_id`) VALUES
('39011a78-535c-4178-ae72-c77af1c47365', NULL, 20.00, '2025-11-15 23:55:07', 'Fresh', '/uploads/ed51a6cc-2664-4ac4-ae97-791d1e135c24.jpg', NULL, 1, 'piece', 'U-707677f5-477e-4278-9462-f68415c36fa1'),
('P-CO-001', 'P-CO-001', 150.00, '2025-11-14 15:41:49', 'Fresh', 'https://www.kauveryhospitalsbangalore.com/assets/uploads/blog/mobbannercoconut_682f25e75fe33_6835938fa201c.webp', 4.5, 100, 'bottle', 'U-707677f5-477e-4278-9462-f68415c36fa1'),
('P-FR-002', 'P-FR-002', 35.00, '2025-11-14 15:41:49', 'Processed', 'https://img.kapook.com/u/2017/wanchalerm/Health_01_60/co3.jpg', 4.0, 200, 'piece', 'U-707677f5-477e-4278-9462-f68415c36fa1');

-- --------------------------------------------------------

--
-- Table structure for table `products_backup`
--

CREATE TABLE `products_backup` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category` enum('Equipment','Fresh','Processed') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT NULL,
  `stock_quantity` int DEFAULT NULL,
  `unit` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manufacturer_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products_backup`
--

INSERT INTO `products_backup` (`id`, `sku`, `price`, `created_at`, `category`, `image_url`, `rating`, `stock_quantity`, `unit`, `manufacturer_id`) VALUES
('P-CO-001', 'P-CO-001', 150.00, '2025-11-14 15:41:49', 'Fresh', 'https://www.kauveryhospitalsbangalore.com/assets/uploads/blog/mobbannercoconut_682f25e75fe33_6835938fa201c.webp', 4.5, 100, 'bottle', 'U-707677f5-477e-4278-9462-f68415c36fa1'),
('P-FR-002', 'P-FR-002', 35.00, '2025-11-14 15:41:49', 'Processed', 'https://example.com/image2.jpg', 4.0, 200, 'piece', 'U-63071f6d-4340-467a-b0a4-395ea5173a95');

-- --------------------------------------------------------

--
-- Table structure for table `product_translations`
--

CREATE TABLE `product_translations` (
  `id` bigint NOT NULL,
  `product_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lang_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `ingredients` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_translations`
--

INSERT INTO `product_translations` (`id`, `product_id`, `lang_code`, `title`, `description`, `ingredients`) VALUES
(1, 'P-CO-001', 'en', 'Cold Pressed Coconut Oil', '100% Organic cold-pressed virgin coconut oil.', NULL),
(2, 'P-CO-001', 'th', 'น้ำมันมะพร้าวสกัดเย็น', 'น้ำมันมะพร้าวบริสุทธิ์สกัดเย็นออร์แกนิค 100%', NULL),
(3, 'P-FR-002', 'en', 'Fresh Young Coconut', 'Fresh aromatic young coconut, ready to drink.', NULL),
(4, 'P-FR-002', 'th', 'มะพร้าวอ่อนสด', 'มะพร้าวอ่อนสดหอมพร้อมดื่ม', NULL),
(23, '39011a78-535c-4178-ae72-c77af1c47365', 'en', 'Coconut Opener', 'open this', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` bigint NOT NULL,
  `product_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `product_id`, `user_id`, `score`, `created_at`, `comment`) VALUES
(1, 'P-CO-001', 'U-707677f5-477e-4278-9462-f68415c36fa1', 5, '2025-11-16 05:33:28', ''),
(2, 'P-CO-001', 'U-63071f6d-4340-467a-b0a4-395ea5173a95', 4, '2025-11-16 05:33:28', NULL),
(3, 'P-FR-002', 'U-707677f5-477e-4278-9462-f68415c36fa1', 4, '2025-11-16 05:33:28', NULL),
(6, '1', 'U-707677f5-477e-4278-9462-f68415c36fa1', 5, '2025-11-16 06:06:14', NULL),
(7, '2', 'U-707677f5-477e-4278-9462-f68415c36fa1', 4, '2025-11-16 06:06:14', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ratings_backup`
--

CREATE TABLE `ratings_backup` (
  `id` bigint NOT NULL DEFAULT '0',
  `product_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registered_date` datetime(6) DEFAULT NULL,
  `status` enum('Active','Pending','Suspended') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` enum('Admin','Entrepreneur','Farmer') COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `display_name`, `email`, `password_hash`, `phone_number`, `province`, `registered_date`, `status`, `user_type`) VALUES
('U-6daee0ab-7bfe-4e7c-bc95-89a47687e60e', 'admin', 'admin@gmail.com', '$2a$10$0A28xH5.QmCsnjxOodYKKu9S5ccb.kTw65bZz.c1D7EaMvAyD4iEm', '123456', 'LA', '2025-11-14 16:59:05.000000', 'Active', 'Admin'),
('U-707677f5-477e-4278-9462-f68415c36fa1', 'Film', 'film@gmail.com', '$2a$10$a1IqC34/LRraV4e5BeZWR.uVBwlmw0PX9luqyAYwR06v/dRdKcE0C', '1245', 'Th', '2025-11-14 21:37:08.000000', 'Active', 'Entrepreneur');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `user_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` enum('Farmer','Entrepreneur','Admin') COLLATE utf8mb4_unicode_ci NOT NULL,
  `province` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('Active','Pending','Suspended') COLLATE utf8mb4_unicode_ci DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `email`, `password`, `display_name`, `user_type`, `province`, `status`, `created_at`) VALUES
(1, 'U-admin-001', 'admin@cocohub.com', '$2a$10$...hash..password...', '??????????????????', 'Admin', NULL, 'Active', '2025-11-14 15:41:49'),
(2, 'U-farmer-001', 'farmer@cocohub.com', '$2a$10$...hash..password...', '??????????????? ???????????????', 'Farmer', NULL, 'Active', '2025-11-14 15:41:49'),
(3, 'U-ent-001', 'entrepreneur@cocohub.com', '$2a$10$...hash..password...', '?????????????????? ???????????????', 'Entrepreneur', NULL, 'Active', '2025-11-14 15:41:49');

-- --------------------------------------------------------

--
-- Table structure for table `varieties`
--

CREATE TABLE `varieties` (
  `id` int NOT NULL,
  `variety_type` enum('Dwarf','Tall','Hybrid') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `climate_zone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('Dwarf','Hybrid','Tall') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `map_image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `origin_story` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `varieties`
--

INSERT INTO `varieties` (`id`, `variety_type`, `created_at`, `climate_zone`, `type`, `image_url`, `map_image_url`, `origin_story`) VALUES
(1, 'Tall', '2025-11-14 15:41:49', NULL, 'Tall', 'https://www.technologychaoban.com/wp-content/uploads/2017/07/13-3-768x1024.jpg', NULL, NULL),
(2, 'Dwarf', '2025-11-14 15:41:49', NULL, 'Dwarf', 'https://itp1.itopfile.com/ImageServer/4d287d4aaa167f39/0/0/65809z-z597425844447.jpg', NULL, NULL),
(3, 'Hybrid', '2025-11-14 15:41:49', NULL, 'Hybrid', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4-ArVH-swM4SMap39MiM1RnQhx76iswGVPQ&s', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `variety`
--

CREATE TABLE `variety` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `climate_zone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('Dwarf','Hybrid','Tall') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usage` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `map_image_url` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `origin_story` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `variety_translations`
--

CREATE TABLE `variety_translations` (
  `id` bigint NOT NULL,
  `variety_id` int NOT NULL,
  `lang_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci,
  `origin_story` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `map_image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `variety_translations`
--

INSERT INTO `variety_translations` (`id`, `variety_id`, `lang_code`, `name`, `details`, `origin_story`, `image_url`, `map_image_url`) VALUES
(1, 1, 'en', 'Native Tall Coconut', '🔬 Botanical characteristics\r\nGrowth habit: Tall (15–25 m), robust, long lifespan 60–80 years\r\nLeaves: Large, curved fronds\r\nFruit: Large round fruit, thick fibrous husk, thick endosperm\r\nGrowth cycle: Late-bearing (6–8 years)\r\nRoots: Extensive fibrous root system, highly drought-tolerant\r\n\r\n\r\n🌱 Genetic & environmental traits\r\nHigh adaptability to climate variations\r\nGood tolerance to pests and diseases\r\nProduces high copra (dried coconut meat)\r\n', '🌱 Upstream (Cultivation)\r\nGrown widely in southern and eastern Thailand: Chumphon, Surat Thani, Rayong.\r\nTall variety; planting distance 8×8 or 9×9 m.\r\nLong lifespan (60–80 years); starts fruiting at 6–8 years.\r\nHighly drought-tolerant and suitable for large-scale plantations.\r\n\r\n\r\n🏭 Midstream (Processing)\r\nMainly used for mature coconut processing, including:\r\nCoconut milk (fresh, canned, UHT)\r\nDesiccated coconut\r\nCoconut oil (RBD and virgin)\r\nHusk used for coir fiber and handicrafts.\r\n\r\n\r\n🌏 Downstream\r\nMajor raw material for Thailand’s coconut-processing industry.\r\nExport products:\r\nCanned coconut milk\r\nVirgin coconut oil\r\nDried coconut products (chips, desiccated coconut)\r\n', NULL, 'https://lh3.googleusercontent.com/d/13f_RvH474B8bnmRN5qjs6pR_zidz56lu'),
(2, 1, 'th', 'พันธุ์พื้นเมือง (ต้นสูง)', '🔬 ลักษณะทางพฤกษศาสตร์\r\nลักษณะการเจริญเติบโต: ต้นสูง 15–25 เมตร อายุยาว 60–80 ปี\r\nใบ: ทรงพุ่มใหญ่ ใบโค้ง\r\nผล: ผลใหญ่ เปลือกหนา เนื้อเยอะ\r\nการให้ผล: ช้า 6–8 ปีหลังปลูก\r\nระบบราก: แข็งแรง ขยายกว้าง ทนแล้งดี\r\n\r\n\r\n🌱 ลักษณะทางพันธุกรรม\r\nปรับตัวกับดินและภูมิอากาศได้ดี\r\nให้ผลผลิตเนื้อแห้งสูง เหมาะทำน้ำมัน\r\n', '🌱 ต้นน้ำ (การปลูก)\r\nปลูกมากในภาคใต้และภาคตะวันออก เช่น ชุมพร สุราษฎร์ธานี ระยอง\r\nระยะปลูกกว้าง 8×8 หรือ 9×9 เมตร เพราะต้นสูงและทรงพุ่มใหญ่\r\nให้ผลช้ากว่าพันธุ์เตี้ย (6–8 ปี) แต่ให้ผลนานและทนแล้ง\r\nมักปลูกเป็นสวนมะพร้าวเชิงเดี่ยว หรือสวนมะพร้าวผสมปาล์มน้ำมัน/พืชอื่น\r\n\r\n\r\n🏭 กลางน้ำ (แปรรูป)\r\nใช้ผลแก่ทำ:\r\nกะทิสด / กะทิกระป๋อง / UHT\r\nมะพร้าวขูดแห้ง (Desiccated coconut)\r\nน้ำมันมะพร้าว (ทั้งแบบ RBD และสกัดเย็นจากเนื้อแก่)\r\nเปลือกแข็งใช้ทำงานหัตถกรรม ส่วนกาบมะพร้าวใช้ทำเส้นใยมะพร้าว (coir)\r\n\r\n\r\n🌏 ปลายน้ำ\r\nส่งวัตถุดิบเข้าสู่โรงงานแปรรูปอาหารทั้งในประเทศและส่งออก\r\nผลิตภัณฑ์หลักที่ออกสู่ตลาดโลก:\r\nกะทิกระป๋อง, กะทิกล่อง\r\nน้ำมันมะพร้าว, มะพร้าวแปรรูปแห้ง\r\nเป็น “ฐานวัตถุดิบหลัก” ของอุตสาหกรรมมะพร้าวไทย\r\n', NULL, 'https://lh3.googleusercontent.com/d/13f_RvH474B8bnmRN5qjs6pR_zidz56lu'),
(3, 2, 'en', 'Nam Hom (Aromatic Dwarf)', '🔬 Botanical characteristics\nGrowth habit: Dwarf coconut; trunk short, smooth; height 8–12 m\nLeaves: Pinnate leaves 4–6 m long; leaflets narrow and upright\nInflorescence: Monoecious; male first, then female flowers\nFruit morphology: Medium-sized oval fruit; green or light green; thin husk\nEndosperm: Soft, sweet, aromatic liquid due to high volatile compounds\nGrowth cycle: Early-bearing (3–4 years after planting)\n\n\n\n🌱 Genetic & environmental traits\nHigh aromatics (2-acetyl-1-pyrroline)\nPrefers well-drained loamy soil; sensitive to salinity and drought\n', '🌱 Upstream (Cultivation)\r\nBest grown in lowland areas with loamy, well-drained soil (Samut Sakhon, Ratchaburi, Nakhon Pathom).\r\nPlanting distance: 6×6 or 7×7 m for easy maintenance and harvesting.\r\nRequires consistent irrigation (canals or drip systems preferred).\r\nEarly fruiting at 3–4 years; harvested mainly as young drinking coconuts.\r\nRequires pest control (rhinoceros beetle, black-headed caterpillar).\r\n\r\n\r\n🏭 Midstream (Processing)\r\nSorted and graded as fresh aromatic coconuts.\r\nProcessed into:\r\nBottled coconut water (pasteurized / UHT)\r\nCoconut jelly or coconut-based desserts\r\nReady-to-drink coconut beverages\r\nCoconut husks used for compost or coconut charcoal.\r\n\r\n\r\n🌏 Downstream (Market / Export)\r\nDomestic: cafés, restaurants, fruit shops, retail markets.\r\nExport markets: China, Japan, Korea, Middle East.\r\nHigh-end coconut water products exported to Japan and Europe.\r\n', NULL, 'https://lh3.googleusercontent.com/d/1XUM8QWnh1uF02LMKr-Ga4wfNN8JeM9UE'),
(4, 2, 'th', 'พันธุ์น้ำหอม (ต้นเตี้ย)', '🔬 ลักษณะทางพฤกษศาสตร์\r\nลักษณะการเจริญเติบโต: ต้นเตี้ย (Dwarf Type) ลำต้นเรียบ สูงประมาณ 8–12 เมตร\r\nใบ: ใบประกอบแบบขนนก ยาว 4–6 เมตร ใบย่อยเรียงตัวแน่น\r\nช่อดอก: แยกเพศในต้นเดียว (Monoecious) ดอกตัวผู้บานก่อนตัวเมีย\r\nผล: ขนาดกลาง รูปทรงกลมรี เปลือกบาง สีเขียวอ่อน\r\nน้ำในผล: หอมหวาน เนื่องจากมีสารระเหย “2-acetyl-1-pyrroline”\r\nการให้ผล: ให้ผลเร็ว 3–4 ปีหลังปลูก\r\n\r\n\r\n🌱 ลักษณะทางพันธุกรรมและสิ่งแวดล้อม\r\nพันธุ์น้ำหอมมียีนเกี่ยวข้องกับ “กลิ่นหอม”\r\nชอบดินร่วน น้ำดี ระบายน้ำดี\r\nไม่ทนดินเค็มและแล้งจัด\r\n', '🌱 ต้นน้ำ (การปลูก)\r\nเหมาะกับพื้นที่ลุ่ม ดินร่วน น้ำไม่ท่วมขัง เช่น สมุทรสาคร ราชบุรี นครปฐม\r\nระยะปลูกโดยทั่วไป 6×6 หรือ 7×7 เมตร เพื่อให้ดูแลง่ายและปีนเก็บสะดวก\r\nต้องการน้ำสม่ำเสมอ แนะนำมีร่องน้ำหรือระบบน้ำหยด\r\nให้ผลผลิตประมาณปีที่ 3–4 หลังปลูก เก็บผลอ่อนสำหรับดื่ม\r\nต้องควบคุมโรคแมลง เช่น ด้วงแรด หนอนหัวดำ และโรคใบจุด\r\n\r\n\r\n🏭 กลางน้ำ (แปรรูป)\r\nเก็บเกี่ยวเป็น ผลอ่อน สำหรับดื่มน้ำสด และคัดเกรดส่งโรงคัดบรรจุ\r\nแปรรูปเป็น:\r\nน้ำมะพร้าวบรรจุขวด / กล่อง UHT\r\nเจลลี่มะพร้าว / วุ้นมะพร้าว\r\nเครื่องดื่มผสมมะพร้าว (mocktail, smoothie, functional drink)\r\nเปลือกและกากใช้ทำปุ๋ยหมัก หรือถ่านมะพร้าว\r\n\r\n\r\n🌏 ปลายน้ำ (ตลาด–ส่งออก)\r\nตลาดในประเทศ: ร้านเครื่องดื่ม, คาเฟ่, ร้านอาหาร, ซูเปอร์มาร์เก็ต\r\nส่งออกผลสด (เจาะจุก ปอกหัว / ปอกทรงเพชร) ไปยัง:\r\nจีน, เกาหลีใต้, ญี่ปุ่น, กลุ่มประเทศตะวันออกกลาง ฯลฯ\r\nผลิตภัณฑ์น้ำมะพร้าวพร้อมดื่ม ส่งออกไปตลาดพรีเมียม เช่น ญี่ปุ่น ยุโรป\r\n', NULL, 'https://lh3.googleusercontent.com/d/1XUM8QWnh1uF02LMKr-Ga4wfNN8JeM9UE'),
(5, 3, 'en', 'Pak Chong Aromatic Hybrid', '🔬 Botanical characteristics\r\nMedium height, semi-dwarf\r\nFruits medium-large; strong fragrance like Nam Hom\r\nFruit stalks thick; clusters dense\r\nGood tolerance to drought and pests\r\n\r\n🌱 Genetic traits\r\nAromatic gene inherited from Nam Hom\r\nHigh vigor and yield like Pak Chong 60\r\n', 'Upstream (Cultivation)\r\nHybrid of aromatic dwarf × tall coconut.\r\nMedium height, high yield, aromatic water.\r\nSuitable for export-focused farms and large plantations.\r\n\r\n\r\n🏭 Midstream (Processing)\r\nUsed mainly as fresh aromatic drinking coconut.\r\nAlso used for premium bottled coconut water.\r\nMature fruits partially suitable for coconut milk extraction.\r\n\r\n\r\n🌏 Downstream\r\nExport markets: China, Japan, Korea.\r\nPopular for premium fresh coconut water products.\r\n', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4-ArVH-swM4SMap39MiM1RnQhx76iswGVPQ&s', 'https://lh3.googleusercontent.com/d/1v9LfhtIyUV5kWCIdH2fFCSSjQQGSlVsQ'),
(6, 3, 'th', 'มะพร้าวน้ำหอมปากช่อง', '🔬 ลักษณะทางพฤกษศาสตร์\r\nลูกผสมระหว่าง มะพร้าวเตี้ยน้ำหอม × มะพร้าวต้น\r\nต้นสูงปานกลาง ออกผลดก\r\nผลขนาดกลาง–ใหญ่ กลิ่นหอมแรงเหมือนน้ำหอม\r\n\r\n\r\n🌱 ลักษณะทางพันธุกรรม\r\nรับยีนกลิ่นหอมจาก “น้ำหอม”\r\nรับความแข็งแรงและความทนโรคจากพันธุ์สูง\r\n', '🌱 ต้นน้ำ (การปลูก)\r\nเหมาะกับสวนที่ต้องการ “ทั้งหอม + ให้ผลดก + ต้นไม่สูงมาก”\r\nปลูกได้หลายภาค หากจัดการน้ำดี\r\nเหมาะสำหรับเกษตรกรที่ตั้งใจทำสวนเพื่อป้อนโรงคัดบรรจุหรือตลาดส่งออก\r\n\r\n\r\n🏭 กลางน้ำ (แปรรูป)\r\nเน้นเก็บผลอ่อนสำหรับ:\r\nน้ำมะพร้าวพร้อมดื่ม\r\nผลสดคัดเกรดสำหรับส่งออก\r\nสามารถใช้ผลแก่ผลิตกะทิได้ในระดับหนึ่ง\r\n\r\n\r\n🌏 ปลายน้ำ\r\nเชื่อมกับตลาดส่งออกผลสด เช่น จีน ญี่ปุ่น เกาหลี\r\nใช้เป็นวัตถุดิบให้น้ำมะพร้าวพรีเมียมในรูปแบบบรรจุขวด/กล่อง\r\n', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4-ArVH-swM4SMap39MiM1RnQhx76iswGVPQ&s', 'https://lh3.googleusercontent.com/d/1v9LfhtIyUV5kWCIdH2fFCSSjQQGSlVsQ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `article_translations`
--
ALTER TABLE `article_translations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_id` (`article_id`);

--
-- Indexes for table `market_prices`
--
ALTER TABLE `market_prices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_price_date` (`price_date`);

--
-- Indexes for table `price`
--
ALTER TABLE `price`
  ADD PRIMARY KEY (`date`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `FKdm0ysi47rvvjr6nwxjidupbgf` (`manufacturer_id`);

--
-- Indexes for table `product_translations`
--
ALTER TABLE `product_translations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_ratings_product` (`product_id`),
  ADD KEY `idx_ratings_user` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `varieties`
--
ALTER TABLE `varieties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `variety`
--
ALTER TABLE `variety`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `variety_translations`
--
ALTER TABLE `variety_translations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `variety_id` (`variety_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article_translations`
--
ALTER TABLE `article_translations`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `market_prices`
--
ALTER TABLE `market_prices`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product_translations`
--
ALTER TABLE `product_translations`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `varieties`
--
ALTER TABLE `varieties`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `variety_translations`
--
ALTER TABLE `variety_translations`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `article_translations`
--
ALTER TABLE `article_translations`
  ADD CONSTRAINT `article_translations_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FKdm0ysi47rvvjr6nwxjidupbgf` FOREIGN KEY (`manufacturer_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `product_translations`
--
ALTER TABLE `product_translations`
  ADD CONSTRAINT `product_translations_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `fk_ratings_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ratings_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `variety_translations`
--
ALTER TABLE `variety_translations`
  ADD CONSTRAINT `variety_translations_ibfk_1` FOREIGN KEY (`variety_id`) REFERENCES `varieties` (`id`) ON DELETE CASCADE;
COMMIT;
SET FOREIGN_KEY_CHECKS=1;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

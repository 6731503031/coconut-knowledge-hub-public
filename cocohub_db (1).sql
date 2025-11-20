-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2025 at 09:53 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12
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
  `id` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `category` enum('Guide','News','Research') DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  `publish_date` datetime(6) DEFAULT NULL,
  `title` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` varchar(255) NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `published_date` date DEFAULT NULL,
  `category` enum('Guide','News','Research') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author` varchar(255) DEFAULT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  `publish_date` datetime(6) DEFAULT NULL,
  `title` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `author_id`, `published_date`, `category`, `created_at`, `author`, `image_url`, `publish_date`, `title`) VALUES
('1', 1, '2025-11-10', 'News', '2025-11-14 15:41:49', NULL, NULL, NULL, ''),
('2', 2, '2025-11-12', 'Research', '2025-11-14 15:41:49', NULL, NULL, NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `article_translations`
--

CREATE TABLE `article_translations` (
  `id` bigint(20) NOT NULL,
  `article_id` varchar(255) NOT NULL,
  `lang_code` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `summary` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `article_translations`
--

INSERT INTO `article_translations` (`id`, `article_id`, `lang_code`, `title`, `content`, `summary`) VALUES
(1, '1', 'en', 'Coconut Prices Surge in Q4', 'Market analysts report a 15% increase...', NULL),
(2, '1', 'th', 'ราคามะพร้าวพุ่งสูงในไตรมาสที่ 4', 'นักวิเคราะห์ตลาดรายงานว่าราคาเพิ่มขึ้น 15%...', NULL),
(3, '2', 'en', 'New Study on Dwarf Coconut Yields', 'Research indicates new fertilization techniques...', NULL),
(4, '2', 'th', 'วิจัยใหม่เกี่ยวกับผลผลิตมะพร้าวต้นเตี้ย', 'งานวิจัยชี้ให้เห็นว่าเทคนิคการให้ปุ๋ยแบบใหม่...', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `market_prices`
--

CREATE TABLE `market_prices` (
  `id` int(11) NOT NULL,
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
  `id` varchar(255) NOT NULL,
  `sku` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `category` enum('Equipment','Fresh','Processed') DEFAULT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `manufacturer_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `sku`, `price`, `created_at`, `category`, `image_url`, `rating`, `stock_quantity`, `unit`, `manufacturer_id`) VALUES
('39011a78-535c-4178-ae72-c77af1c47365', NULL, 20.00, '2025-11-15 23:55:07', 'Fresh', '/uploads/ed51a6cc-2664-4ac4-ae97-791d1e135c24.jpg', NULL, 1, 'piece', 'U-707677f5-477e-4278-9462-f68415c36fa1'),
('659670ff-7554-411b-bc17-9b75f068de60', NULL, 7.00, '2025-11-15 23:52:51', 'Fresh', NULL, NULL, 1, 'piece', 'U-6f70891b-a536-4ae6-8bab-e02e239c657e'),
('720bd5b3-fbcb-4948-88f1-70e04fd1d475', NULL, 89.00, '2025-11-16 16:47:54', 'Equipment', NULL, NULL, 10, 'ชิ้น', 'U-707677f5-477e-4278-9462-f68415c36fa1'),
('P-CO-001', 'P-CO-001', 150.00, '2025-11-14 15:41:49', 'Fresh', 'https://www.kauveryhospitalsbangalore.com/assets/uploads/blog/mobbannercoconut_682f25e75fe33_6835938fa201c.webp', 4.5, 100, 'bottle', 'U-707677f5-477e-4278-9462-f68415c36fa1'),
('P-FR-002', 'P-FR-002', 35.00, '2025-11-14 15:41:49', 'Processed', 'https://example.com/image2.jpg', 4.0, 200, 'piece', 'U-707677f5-477e-4278-9462-f68415c36fa1');

-- --------------------------------------------------------

--
-- Table structure for table `products_backup`
--

CREATE TABLE `products_backup` (
  `id` varchar(255) NOT NULL,
  `sku` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `category` enum('Equipment','Fresh','Processed') DEFAULT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `manufacturer_id` varchar(255) DEFAULT NULL
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
  `id` bigint(20) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `lang_code` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `ingredients` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_translations`
--

INSERT INTO `product_translations` (`id`, `product_id`, `lang_code`, `title`, `description`, `ingredients`) VALUES
(1, 'P-CO-001', 'en', 'Cold Pressed Coconut Oil', '100% Organic cold-pressed virgin coconut oil.', NULL),
(2, 'P-CO-001', 'th', 'น้ำมันมะพร้าวสกัดเย็น', 'น้ำมันมะพร้าวบริสุทธิ์สกัดเย็น 100% ออร์แกนิค', NULL),
(3, 'P-FR-002', 'en', 'Fresh Young Coconut', 'Fresh aromatic young coconut, ready to drink.', NULL),
(4, 'P-FR-002', 'th', 'มะพร้าวน้ำหอม', 'มะพร้าวน้ำหอมสด ส่งตรงจากสวน พร้อมดื่ม', NULL),
(22, '659670ff-7554-411b-bc17-9b75f068de60', 'en', 'Opener', 'asdwasd', NULL),
(23, '39011a78-535c-4178-ae72-c77af1c47365', 'en', 'Coconut Opener', 'open this', NULL),
(24, '720bd5b3-fbcb-4948-88f1-70e04fd1d475', 'en', 'อิหยังวะ', '...', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` bigint(20) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `comment` varchar(1000) DEFAULT NULL
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
  `id` bigint(20) NOT NULL DEFAULT 0,
  `product_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `comment` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(255) NOT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `registered_date` datetime(6) DEFAULT NULL,
  `status` enum('Active','Pending','Suspended') DEFAULT NULL,
  `user_type` enum('Admin','Entrepreneur','Farmer') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `display_name`, `email`, `password_hash`, `phone_number`, `province`, `registered_date`, `status`, `user_type`) VALUES
('U-6daee0ab-7bfe-4e7c-bc95-89a47687e60e', 'admin', 'admin@gmail.com', '$2a$10$0A28xH5.QmCsnjxOodYKKu9S5ccb.kTw65bZz.c1D7EaMvAyD4iEm', '123456', 'LA', '2025-11-14 16:59:05.000000', 'Active', 'Admin'),
('U-6f70891b-a536-4ae6-8bab-e02e239c657e', 'ponohub', 'pono@gmail.com', '$2a$10$YJr1oooTJ7ymkswgdw.6aeofQLdQozOHCXFMMdEUl5R4M.NgHLGXu', '123456789', 'll', '2025-11-15 23:52:33.000000', 'Active', 'Entrepreneur'),
('U-707677f5-477e-4278-9462-f68415c36fa1', 'Film', 'film@gmail.com', '$2a$10$a1IqC34/LRraV4e5BeZWR.uVBwlmw0PX9luqyAYwR06v/dRdKcE0C', '1245', 'Th', '2025-11-14 21:37:08.000000', 'Active', 'Entrepreneur'),
('U-b7d47710-7f9c-4dad-a2f5-a3be9a6a04bb', 'SeaGay', 'seagay@gay.com', '$2a$10$SztwJKKmhEu.O16cta6OZ.ckuL3d.nSQ0rF2.Iih0kZFPT72cAb/y', '0000000000', 'LG', '2025-11-15 21:48:32.000000', 'Active', 'Farmer');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `user_type` enum('Farmer','Entrepreneur','Admin') NOT NULL,
  `province` varchar(100) DEFAULT NULL,
  `status` enum('Active','Pending','Suspended') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `email`, `password`, `display_name`, `user_type`, `province`, `status`, `created_at`) VALUES
(1, 'U-admin-001', 'admin@cocohub.com', '$2a$10$...hash..password...', 'แอดมิน', 'Admin', NULL, 'Active', '2025-11-14 15:41:49'),
(2, 'U-farmer-001', 'farmer@cocohub.com', '$2a$10$...hash..password...', 'สมชาย ทำสวน', 'Farmer', NULL, 'Active', '2025-11-14 15:41:49'),
(3, 'U-ent-001', 'entrepreneur@cocohub.com', '$2a$10$...hash..password...', 'สมหญิง ขายดี', 'Entrepreneur', NULL, 'Active', '2025-11-14 15:41:49');

-- --------------------------------------------------------

--
-- Table structure for table `varieties`
--

CREATE TABLE `varieties` (
  `id` int(11) NOT NULL,
  `variety_type` enum('Dwarf','Tall') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `climate_zone` varchar(255) DEFAULT NULL,
  `type` enum('Dwarf','Hybrid','Tall') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `varieties`
--

INSERT INTO `varieties` (`id`, `variety_type`, `created_at`, `climate_zone`, `type`) VALUES
(1, 'Tall', '2025-11-14 15:41:49', NULL, 'Tall'),
(2, 'Dwarf', '2025-11-14 15:41:49', NULL, 'Dwarf');

-- --------------------------------------------------------

--
-- Table structure for table `variety`
--

CREATE TABLE `variety` (
  `id` varchar(255) NOT NULL,
  `climate_zone` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('Dwarf','Hybrid','Tall') DEFAULT NULL,
  `usage` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `variety_translations`
--

CREATE TABLE `variety_translations` (
  `id` bigint(20) NOT NULL,
  `variety_id` int(11) NOT NULL,
  `lang_code` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `details` text DEFAULT NULL,
  `origin_story` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `variety_translations`
--

INSERT INTO `variety_translations` (`id`, `variety_id`, `lang_code`, `name`, `details`, `origin_story`) VALUES
(1, 1, 'en', 'Thai Tall', 'A robust variety, popular for copra production.', NULL),
(2, 1, 'th', 'พันธุ์พื้นเมือง (ต้นสูง)', 'พันธุ์ทนทาน นิยมใช้ในการผลิตเนื้อมะพร้าวแห้ง', NULL),
(3, 2, 'en', 'Nam Hom (Aromatic Dwarf)', 'Famous for its sweet aromatic water.', NULL),
(4, 2, 'th', 'พันธุ์น้ำหอม (ต้นเตี้ย)', 'มีชื่อเสียงเรื่องน้ำที่หวานและมีกลิ่นหอม', NULL);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `market_prices`
--
ALTER TABLE `market_prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product_translations`
--
ALTER TABLE `product_translations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `varieties`
--
ALTER TABLE `varieties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `variety_translations`
--
ALTER TABLE `variety_translations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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

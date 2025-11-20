-- Migration: add image/map/process columns for variety entities
-- Adds columns only if they do not already exist. No columns are removed.
-- Run on your MySQL/MariaDB database that holds the cocohub schema.

SET FOREIGN_KEY_CHECKS=0;

-- Add columns to `variety` (primary detail table)
ALTER TABLE `variety` ADD COLUMN IF NOT EXISTS `image_url` VARCHAR(1024) DEFAULT NULL;
ALTER TABLE `variety` ADD COLUMN IF NOT EXISTS `map_image_url` VARCHAR(1024) DEFAULT NULL;
ALTER TABLE `variety` ADD COLUMN IF NOT EXISTS `origin_story` TEXT DEFAULT NULL;

-- Add columns to `variety_translations` (locale-specific fields)
ALTER TABLE `variety_translations` ADD COLUMN IF NOT EXISTS `image_url` VARCHAR(1024) DEFAULT NULL;
ALTER TABLE `variety_translations` ADD COLUMN IF NOT EXISTS `map_image_url` VARCHAR(1024) DEFAULT NULL;

-- Add columns to `varieties` (if the project uses that table for other metadata)
ALTER TABLE `varieties` ADD COLUMN IF NOT EXISTS `image_url` VARCHAR(1024) DEFAULT NULL;
ALTER TABLE `varieties` ADD COLUMN IF NOT EXISTS `map_image_url` VARCHAR(1024) DEFAULT NULL;
ALTER TABLE `varieties` ADD COLUMN IF NOT EXISTS `origin_story` TEXT DEFAULT NULL;

SET FOREIGN_KEY_CHECKS=1;

-- Quick sanity-check selects (optional) - uncomment to run
-- SELECT COUNT(*) AS have_image_from_variety FROM variety WHERE image_url IS NOT NULL;
-- SELECT COUNT(*) AS have_map_from_variety FROM variety WHERE map_image_url IS NOT NULL;
-- SELECT COUNT(*) AS have_origin_from_variety_translations FROM variety_translations WHERE origin_story IS NOT NULL;

-- Notes:
-- - This uses `ADD COLUMN IF NOT EXISTS`, which is supported by MariaDB 10.3+ and MySQL 8+.
-- - If your server does not support `IF NOT EXISTS` for ADD COLUMN, run these checks first:
--     SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'variety' AND COLUMN_NAME = 'image_url';
--   and then run the ALTER only when the count is 0.
-- - After adding columns, update the backend entity classes and DTOs to include these fields so the frontend can read and write them.
-- - If you want me to populate these columns from another source (e.g., migrate existing product images or placeholders), tell me and I can add an UPDATE step.

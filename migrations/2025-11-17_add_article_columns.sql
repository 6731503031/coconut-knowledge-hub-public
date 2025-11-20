-- Migration: Add missing columns to articles and article_translations tables
-- Date: 2025-11-17
-- Purpose: Add image_url, map_image_url, and external_url columns for article management

-- Add columns to article_translations table
ALTER TABLE `article_translations`
ADD COLUMN `image_url` varchar(1024) DEFAULT NULL;

ALTER TABLE `article_translations`
ADD COLUMN `map_image_url` varchar(1024) DEFAULT NULL;

-- Add external_url column to articles table for "For more detail" links
ALTER TABLE `articles`
ADD COLUMN `external_url` varchar(1024) DEFAULT NULL;

-- Optional: Copy image_url from articles to article_translations for existing records
-- (Uncomment if you want to sync existing images)
-- UPDATE article_translations at
-- INNER JOIN articles a ON at.article_id = a.id
-- SET at.image_url = a.image_url
-- WHERE at.image_url IS NULL AND a.image_url IS NOT NULL;

-- Run this if you already had the old schema (students without notes, no contact_messages).
-- Backup first. Then execute in phpMyAdmin or mysql CLI.

USE `computer_collegiate`;

ALTER TABLE `students`
  ADD COLUMN `notes` TEXT NULL COMMENT 'Optional message from admissions inquiry' AFTER `course`;

CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(190) NOT NULL,
  `email` VARCHAR(190) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `contact_email_idx` (`email`),
  KEY `contact_created_idx` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

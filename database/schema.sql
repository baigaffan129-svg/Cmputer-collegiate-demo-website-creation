-- Computer Collegiate — full MySQL schema (XAMPP / phpMyAdmin)
-- Import: mysql -u root -p < schema.sql
-- Or run statements in phpMyAdmin SQL tab.

CREATE DATABASE IF NOT EXISTS `computer_collegiate`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `computer_collegiate`;

-- Registrations / admissions (same table; optional notes for inquiry text)
DROP TABLE IF EXISTS `contact_messages`;
DROP TABLE IF EXISTS `students`;

CREATE TABLE `students` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(190) NOT NULL,
  `email` VARCHAR(190) NOT NULL,
  `phone` VARCHAR(64) NOT NULL,
  `course` VARCHAR(190) NOT NULL,
  `notes` TEXT NULL COMMENT 'Optional message from admissions inquiry',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `students_email_unique` (`email`),
  KEY `students_course_idx` (`course`),
  KEY `students_created_idx` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Public contact form (Contact page)
CREATE TABLE `contact_messages` (
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

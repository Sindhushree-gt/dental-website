-- SmileVista Dental Database Schema

CREATE DATABASE IF NOT EXISTS smilevista_db;
USE smilevista_db;

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100),
  date DATE NOT NULL,
  time VARCHAR(20) NOT NULL,
  service VARCHAR(50),
  issue TEXT,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Lead Tracking (Step 3/4)
CREATE TABLE IF NOT EXISTS ai_leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_name VARCHAR(100),
  lead_type VARCHAR(50), -- e.g., 'smile-preview', 'treatment-recommend'
  details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

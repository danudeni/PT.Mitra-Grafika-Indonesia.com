-- Active: 1789734794719@@127.0.0.1@3306
CREATE DATABASE mgi_company;
USE mgi_company;
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    company VARCHAR(150),
    message TEXT NOT NULL,--
    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP

);
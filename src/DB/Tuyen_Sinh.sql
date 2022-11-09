DROP TABLE IF EXISTS tuyen_Sinh;
CREATE DATABASE tuyen_Sinh DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE tuyen_Sinh;

CREATE TABLE IF NOT EXISTS account (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    fullname VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    role INT NOT NULL,
    status INT NOT NULL
    );

INSERT INTO account (username, password, email, fullname, phone, address, role, status) VALUES
('admin', '123456', 'cothechuquyen@gmail.com', 'Nguyen Xuan Quyen', '0379172188', 'Ha Noi', 0, 1);


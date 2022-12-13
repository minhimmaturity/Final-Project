-- DROP TABLE IF EXISTS tuyen_Sinh;
CREATE DATABASE tuyen_Sinh DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE tuyen_Sinh;


CREATE TABLE IF NOT EXISTS account (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    fullname VARCHAR(50) NOT NULL,
    address VARCHAR(50),
    role INT NOT NULL,
    status INT NOT NULL
    );

INSERT INTO account (phone, password, email, fullname, address, role, status) VALUES
('0379172187','123456', 'cothechuquyen@gmail.com', 'Nguyen Xuan Quyen', 'Ha Noi', 0, 1);




CREATE TABLE IF NOT EXISTS Student (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    role VARCHAR(50) NOT NULL,
    fullname VARCHAR(50) NOT NULL,
    gender VARCHAR(50),
    birthday VARCHAR(50),
    hightSchool VARCHAR(50),
    graduationYear VARCHAR(50),
    address VARCHAR(50),
    email VARCHAR(50),
    phone VARCHAR(50) NOT NULL UNIQUE,
    linkFacebook VARCHAR(50),
    phoneNumberFather VARCHAR(50),
    nameFather VARCHAR(50),
    phoneNumberMother VARCHAR(50),
    nameMother VARCHAR(50),
    emailFather VARCHAR(50),
    emailMother VARCHAR(50),
    sponsorName VARCHAR(50),
    emailSponsor VARCHAR(50),
    giayChungNhanTotNghiep VARCHAR(100),
    bangTotNghiep VARCHAR(100),
    anhChanDung VARCHAR(100),
    giayKhaiSinh VARCHAR(100),
    hocBaTHPT VARCHAR(100),
    cccd VARCHAR(100),
    chungChiTiengAnh VARCHAR(100),
    cacGiayToKhac VARCHAR(100),
	FOREIGN KEY (`phone`) REFERENCES account(phone))


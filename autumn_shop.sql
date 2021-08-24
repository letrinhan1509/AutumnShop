-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2021 at 01:00 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `autumn_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `manv` int(10) NOT NULL,
  `admin` varchar(200) NOT NULL,
  `matkhau` varchar(100) NOT NULL,
  `tennv` varchar(100) NOT NULL,
  `tenhinh` varchar(100) NOT NULL,
  `hinh` varchar(250) DEFAULT NULL,
  `diachi` varchar(100) NOT NULL,
  `sodienthoai` varchar(10) NOT NULL,
  `quyen` varchar(30) NOT NULL,
  `trangthai` int(2) DEFAULT 1 COMMENT '0: Ẩn\r\n1: Hiện'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`manv`, `admin`, `matkhau`, `tennv`, `tenhinh`, `hinh`, `diachi`, `sodienthoai`, `quyen`, `trangthai`) VALUES
(1, 'admin@gmail.com', '$2b$10$OwmFKU3vyNyOcr89.pDcF.92OpnfHqcoBTMIo8tNKJP8DDJ/a116y', 'Admin', 'sale_off_1.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2Fsale_off_1.jpg?alt=media&token=4a9e0ab4-e79f-493f-a8d8-8a4e33c44365', '170 Cao Lỗ, P4, Quận 8, Tp.HCM', '0909686868', 'Admin', 1),
(17, 'tam@gmail.com', '$2b$10$b1Drfz6VH0Ot2Y4hYXs4ge7YvrEgNhS3YqF/Ig3F/UGa5GmQi8YE2', 'Bad Boy', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', '180 Cao Lỗ, P4, Quận 8', '0906060606', 'NVGH', 1),
(18, 'phuong@gmail.com', '$2b$10$KUcP56TrcoWnf6nW.o6nY.H8oj7agrZLUwbzTYZcFZSkKF020MXCO', 'Hoàng Phương', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', '233 Vĩnh Viễn, Phường 04, Quận 10 ', '0909666555', 'QLNS', 1),
(19, 'letrinhan1509@gmail.com', '$2b$10$7jWUVsiSTkpiLV9mcI9pi.agZVONyg.U.mDAK401txS16bMmG2olu', 'Trí Nhân', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', 'Đường Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, TP Hồ Chí Minh', '0969362915', 'QLCH', 1),
(20, 'boylanhlung@gmail.com', '$2b$10$4kY8iZ4JGhYMRSYjVSywAORA3UtB098evmKfCR6bTRQBSUASNlw9S', 'Nguyễn Văn A', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', '180 Cao Lỗ', '0909797979', 'NVBH', 1);

-- --------------------------------------------------------

--
-- Table structure for table `bang_size`
--

CREATE TABLE `bang_size` (
  `masize` int(10) NOT NULL,
  `size` varchar(10) NOT NULL,
  `gioitinh` varchar(10) NOT NULL,
  `cannangtu` int(10) NOT NULL COMMENT 'Đơn vị: Kg',
  `cannangden` int(10) NOT NULL COMMENT 'Đơn vị: Kg',
  `chieucaotu` int(10) NOT NULL COMMENT 'Đơn vị: Cm',
  `chieucaoden` int(10) NOT NULL COMMENT 'Đơn vị: Cm'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bang_size`
--

INSERT INTO `bang_size` (`masize`, `size`, `gioitinh`, `cannangtu`, `cannangden`, `chieucaotu`, `chieucaoden`) VALUES
(1, 'S', 'Nam', 55, 60, 160, 165),
(2, 'M', 'Nam', 60, 65, 165, 170),
(3, 'L', 'Nam', 65, 70, 170, 175),
(4, 'XL', 'Nam', 70, 76, 175, 176),
(5, 'S', 'Nữ', 38, 43, 148, 153),
(6, 'M', 'Nữ', 43, 46, 153, 155),
(7, 'L', 'Nữ', 46, 53, 153, 158),
(8, 'XL', 'Nữ', 53, 57, 155, 162);

-- --------------------------------------------------------

--
-- Table structure for table `binhluan`
--

CREATE TABLE `binhluan` (
  `mabl` int(10) NOT NULL,
  `masp` int(10) NOT NULL,
  `makh` int(10) NOT NULL,
  `noidung` varchar(2000) NOT NULL,
  `ngaybl` datetime NOT NULL DEFAULT current_timestamp(),
  `trangthai` int(10) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `binhluan`
--

INSERT INTO `binhluan` (`mabl`, `masp`, `makh`, `noidung`, `ngaybl`, `trangthai`) VALUES
(12, 127, 10, 'Áo rất đẹp!!!', '2021-08-20 22:23:42', 1),
(13, 126, 7, 'Sản phẩm tốt', '2021-08-25 01:38:15', 1);

-- --------------------------------------------------------

--
-- Table structure for table `chitietbl`
--

CREATE TABLE `chitietbl` (
  `mact` int(11) NOT NULL,
  `makh` int(10) DEFAULT NULL,
  `ten` varchar(50) NOT NULL,
  `noidung` varchar(2000) NOT NULL,
  `ngaybl` datetime NOT NULL DEFAULT current_timestamp(),
  `manv` int(10) DEFAULT NULL,
  `mabl` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chitietbl`
--

INSERT INTO `chitietbl` (`mact`, `makh`, `ten`, `noidung`, `ngaybl`, `manv`, `mabl`) VALUES
(7, NULL, 'Nguyễn Văn A', 'Cảm ơn bạn', '2021-08-25 02:06:08', 20, 13);

-- --------------------------------------------------------

--
-- Table structure for table `chitietdh`
--

CREATE TABLE `chitietdh` (
  `mact` int(10) NOT NULL,
  `masp` int(10) NOT NULL,
  `size` varchar(10) CHARACTER SET utf8 NOT NULL,
  `mau` varchar(10) CHARACTER SET utf8 NOT NULL,
  `gia` int(10) NOT NULL,
  `giagiam` int(10) DEFAULT 0,
  `soluong` int(11) NOT NULL,
  `thanhtien` int(10) NOT NULL DEFAULT 0,
  `madonhang` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chitietdh`
--

INSERT INTO `chitietdh` (`mact`, `masp`, `size`, `mau`, `gia`, `giagiam`, `soluong`, `thanhtien`, `madonhang`) VALUES
(71, 126, 'M', 'tr?ng', 200000, 0, 1, 200000, 105),
(72, 126, 'S', 'trắng', 200000, 0, 1, 200000, 106),
(73, 128, 'S', 'trắng', 400000, 0, 1, 400000, 107),
(74, 128, 'M', 'trắng', 400000, 0, 1, 400000, 108),
(75, 128, 'M', 'trắng', 400000, 0, 1, 400000, 112),
(77, 128, 'M', 'trắng', 400000, 0, 1, 400000, 114),
(78, 129, 'S', 'trắng', 200000, 0, 1, 200000, 115),
(79, 128, 'S', 'trắng', 400000, 0, 1, 400000, 116),
(80, 130, 'S', 'đen', 250000, 0, 1, 250000, 117),
(81, 126, 'S', 'đen', 200000, 0, 1, 200000, 118),
(82, 130, 'S', 'đen', 250000, 0, 1, 250000, 119),
(85, 129, 'S', 'trắng', 200000, 0, 1, 200000, 122),
(86, 129, 'M', 'trắng', 200000, 0, 1, 200000, 123),
(87, 128, 'S', 'trắng', 400000, 0, 1, 400000, 124);

-- --------------------------------------------------------

--
-- Table structure for table `chitietkm`
--

CREATE TABLE `chitietkm` (
  `mact` int(10) NOT NULL,
  `masp` int(10) NOT NULL,
  `chitiet_km` longtext DEFAULT NULL,
  `chietkhau` int(10) NOT NULL DEFAULT 10,
  `giakm` int(10) NOT NULL DEFAULT 0,
  `makm` int(10) NOT NULL,
  `trangthai` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chitietkm`
--

INSERT INTO `chitietkm` (`mact`, `masp`, `chitiet_km`, `chietkhau`, `giakm`, `makm`, `trangthai`) VALUES
(32, 128, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":18,\"giagiam\":0}]', 20, 320000, 31, 0),
(33, 127, '[{\"id\":2,\"size\":\"M\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0}]', 15, 170000, 31, 0),
(34, 128, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":18,\"giagiam\":0}]', 10, 360000, 32, 0),
(35, 127, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0}]', 15, 170000, 32, 0),
(36, 129, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":8,\"giagiam\":0}]', 20, 160000, 32, 0),
(37, 130, '[{\"id\":1,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":10,\"giagiam\":0}]', 20, 200000, 32, 0);

-- --------------------------------------------------------

--
-- Table structure for table `danhmuc`
--

CREATE TABLE `danhmuc` (
  `madm` varchar(50) NOT NULL,
  `tendm` varchar(100) NOT NULL,
  `tenhinh` varchar(100) NOT NULL,
  `hinh` varchar(500) NOT NULL,
  `trangthai` int(10) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `danhmuc`
--

INSERT INTO `danhmuc` (`madm`, `tendm`, `tenhinh`, `hinh`, `trangthai`) VALUES
('DMA', 'Áo', 'slider_ao.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Catalog_Img%2Fslider_ao.jpg?alt=media&token=43b41750-cd65-4a77-999e-1a8b2bdcfe73', 1),
('DMPK', 'Phụ kiện', 'slider_phukien.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Catalog_Img%2Fslider_phukien.jpg?alt=media&token=a5e5e936-0e8b-44e7-83b6-4b110bd3b681', 1),
('DMQ', 'Quần', 'slider_quan.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Catalog_Img%2Fslider_quan.png?alt=media&token=1b11aaa4-3a20-4059-8522-2d404ec72039', 1);

-- --------------------------------------------------------

--
-- Table structure for table `donhang`
--

CREATE TABLE `donhang` (
  `madonhang` int(10) NOT NULL,
  `code_GHN` varchar(50) DEFAULT NULL,
  `makh` int(10) DEFAULT NULL,
  `tenkh` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `sodienthoai` varchar(10) NOT NULL,
  `diachi` varchar(100) NOT NULL,
  `tienship` int(10) DEFAULT 0,
  `tongtien` int(10) NOT NULL DEFAULT 0,
  `ghichu` varchar(150) DEFAULT NULL,
  `makm` int(10) DEFAULT NULL,
  `hinhthuc` varchar(50) NOT NULL,
  `vanchuyen` varchar(50) NOT NULL,
  `chitiet` longtext DEFAULT NULL,
  `ngaydat` date DEFAULT NULL,
  `ngaygiao` date DEFAULT NULL,
  `manv` int(10) DEFAULT NULL,
  `trangthai` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `donhang`
--

INSERT INTO `donhang` (`madonhang`, `code_GHN`, `makh`, `tenkh`, `email`, `sodienthoai`, `diachi`, `tienship`, `tongtien`, `ghichu`, `makm`, `hinhthuc`, `vanchuyen`, `chitiet`, `ngaydat`, `ngaygiao`, `manv`, `trangthai`) VALUES
(105, NULL, 9, 'Nemo', 'thhphuong2607@gmail.com', '0932550587', '233 Vĩnh Viễn, Phường 04, Quận 10, TP Hồ Chí Minh', 18000, 218000, '', 1, 'Thanh toán khi nhận hàng', 'SHOP', NULL, '2020-07-11', NULL, NULL, 4),
(106, NULL, 8, 'Nhân', 'letrinhan54321@gmail.com', '0090968686', '82/72 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, TP Hồ Chí Minh', 18000, 218000, '', NULL, 'Thanh toán khi nhận hàng', 'SHOP', 'NULL', '2021-06-20', NULL, NULL, 1),
(107, NULL, 9, 'Nemo', 'thhphuong2607@gmail.com', '0932550587', '233 Vĩnh Viễn, Phường 04, Quận 10, TP Hồ Chí Minh', 18000, 418000, '', NULL, 'Thanh toán khi nhận hàng', 'SHOP', 'NULL', '2021-07-20', NULL, NULL, 0),
(108, NULL, 8, 'Nhân', 'letrinhan54321@gmail.com', '0909686868', '82/72 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, TP Hồ Chí Minh', 18000, 418000, '', NULL, 'Thanh toán khi nhận hàng', 'SHOP', 'NULL', '2021-08-21', NULL, NULL, 0),
(109, NULL, 8, 'Nhân', 'letrinhan54321@gmail.com', '0909686868', '82/72 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, TP Hồ Chí Minh', 18000, 418000, '', NULL, 'Thanh toán khi nhận hàng', 'GHTK', 'NULL', '2021-08-21', NULL, NULL, 0),
(110, NULL, 8, 'Nhân', 'letrinhan54321@gmail.com', '0909686868', '82/72 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, TP Hồ Chí Minh', 18000, 418000, '', NULL, 'Thanh toán khi nhận hàng', 'GHTK', 'NULL', '2021-08-21', NULL, NULL, 0),
(111, NULL, 8, 'Nhân', 'letrinhan54321@gmail.com', '0909686868', '82/72 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, TP Hồ Chí Minh', 18000, 418000, '', NULL, 'Thanh toán khi nhận hàng', 'GHTK', 'NULL', '2021-08-22', NULL, NULL, 0),
(112, NULL, 8, 'Nhân', 'letrinhan54321@gmail.com', '0909686868', '82/72 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, TP Hồ Chí Minh', 18000, 418000, '', NULL, 'Thanh toán khi nhận hàng', 'GHTK', 'NULL', '2021-08-22', NULL, NULL, 0),
(114, NULL, 8, 'Nhân', 'letrinhan54321@gmail.com', '0909686868', '82/72 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, TP Hồ Chí Minh', 18000, 418000, '', NULL, 'Thanh toán khi nhận hàng', 'SHOP', 'NULL', '2021-08-22', NULL, NULL, 0),
(115, NULL, 8, 'Nhân', 'letrinhan54321@gmail.com', '909686868', '82/72 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, TP Hồ Chí Minh', 18000, 218000, '', NULL, 'Thanh toán khi nhận hàng', 'SHOP', 'NULL', '2021-08-23', NULL, NULL, 0),
(116, NULL, 8, 'Nhân', 'letrinhan54321@gmail.com', '909686868', '82/72 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, TP Hồ Chí Minh', 18000, 418000, '', NULL, 'Thanh toán khi nhận hàng', 'SHOP', 'NULL', '2021-08-23', NULL, NULL, 0),
(117, NULL, 8, 'Nhân', 'letrinhan54321@gmail.com', '909686868', '233 Vĩnh Viễn, Phường 04, Quận 10, TP Hồ Chí Minh', 18000, 268000, '', NULL, 'Thanh toán khi nhận hàng', 'SHOP', 'NULL', '2021-08-23', NULL, NULL, 0),
(118, NULL, 7, 'Trí Nhân', 'letrinhan1509@gmail.com', '0969362915', '233 Vĩnh Viễn, Phường 04, Quận 10, TP Hồ Chí Minh', 18000, 218000, '', NULL, 'Thanh toán khi nhận hàng', 'SHOP', 'NULL', '2021-08-23', NULL, NULL, 4),
(119, NULL, 7, 'Trí Nhân', 'letrinhan1509@gmail.com', '0969362915', '180 Cao Lỗ, Phường 04, Quận 8, TP Hồ Chí Minh', 18000, 268000, '', NULL, 'Thanh toán khi nhận hàng', 'SHOP', 'NULL', '2021-08-23', NULL, NULL, 4),
(122, NULL, 7, 'Trí Nhân', 'letrinhan1509@gmail.com', '0969362915', '82/72 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, TP Hồ Chí Minh', 18000, 218000, '', NULL, 'Thanh toán MOMO', 'SHOP', 'NULL', '2021-08-24', NULL, NULL, 0),
(123, NULL, 7, 'Trí Nhân', 'letrinhan1509@gmail.com', '0969362915', '233 Vĩnh Viễn, Phường 04, Quận 10, TP Hồ Chí Minh', 18000, 218000, '', NULL, 'Thanh toán MOMO', 'SHOP', 'NULL', '2021-08-24', NULL, NULL, 0),
(124, NULL, 7, 'Trí Nhân', 'letrinhan1509@gmail.com', '0969362915', '82/72 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, TP Hồ Chí Minh', 18000, 418000, '', NULL, 'Thanh toán khi nhận hàng', 'SHOP', 'NULL', '2021-08-24', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `giohang`
--

CREATE TABLE `giohang` (
  `magiohang` int(10) NOT NULL,
  `makh` int(10) NOT NULL,
  `masp` int(10) NOT NULL,
  `size` varchar(10) NOT NULL,
  `mau` varchar(10) NOT NULL,
  `gia` int(10) NOT NULL,
  `giagiam` int(10) DEFAULT 0,
  `soluong` int(10) NOT NULL DEFAULT 1,
  `thanhtien` int(10) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `makh` int(10) NOT NULL,
  `uid` varchar(50) DEFAULT NULL,
  `tenkh` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `matkhau` varchar(100) NOT NULL,
  `tenhinh` varchar(100) NOT NULL,
  `hinh` varchar(250) DEFAULT NULL,
  `sodienthoai` varchar(10) NOT NULL,
  `diachi` varchar(200) NOT NULL,
  `trangthai` int(2) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`makh`, `uid`, `tenkh`, `email`, `matkhau`, `tenhinh`, `hinh`, `sodienthoai`, `diachi`, `trangthai`) VALUES
(4, NULL, 'Lê Trí Nhân', 'nhan@gmail.com', '123456789', '', NULL, '69741120', '180 Cao Lỗ', 1),
(5, NULL, 'Nhật Hào', 'hao@gmail.com', '123456@^!^@', '', NULL, '0909666555', '182 Cao Lỗ', 1),
(6, NULL, 'Bad Boy', 'trinhan.dh51703846@gmail.com', '$2b$10$cUnPrNVLjaqYlnJdsZ.ajOsUCRD5au5xEF7POFo8Ip0qadqyKEjVq', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', '0906060606', '180 Cao Lỗ, P4', 1),
(7, NULL, 'Trí Nhân', 'letrinhan1509@gmail.com', '$2b$10$bmoZ2SnYw.Bf34Tgt2/Md./j2XSNpBPE.nwkspWMvl8ofkITCY6a.', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', '0969362915', '178 Cao Lỗ, Phường 04', 1),
(8, NULL, 'Nhân', 'letrinhan54321@gmail.com', '$2b$10$KvhroYwNu2J4wpn3ytLREOZ/1cdzx65UZA3bbeEhPGnpAJc0BU9hO', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', '0909686868', '180 Cao Lỗ', 1),
(9, NULL, 'Nemo', 'thhphuong2607@gmail.com', '$2b$10$CDpT16OfF5.xjlVGVBZkP.8LizxgyBDDwc0Rv39uhUDwmBtl5vF4y', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', '0932550587', '233/15 Vĩnh Viễn', 1),
(10, NULL, 'Nhật Hào', 'letrinhan15099@gmail.com', '$2b$10$fq4JuU8B7Mb0h0l9vnMBze1aBXBwMjnfISYZnAj6662PQvBE5a2re', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', '0969362915', '178 Cao Lỗ, Phường 4, Quận 08, Tp.HCM', 1),
(12, NULL, 'Trương Hải Hoàng Phương', 'DH51703996@student.stu.edu.vn', '$2b$10$i1k8fbr8EPYvtl5OOeqMoODV4G/e9chAQWiqWG8TSo4LjhO6S8u0u', '', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2Fuser.png?alt=media&token=6ec247df-90ab-4cc9-b671-7261ef37215f&fbclid=IwAR2WTfoELEQhDxDpM3qKj0XcNtFNZyR1_5AYxYWNWpzzoIsuOWOIOqH9K9k', '0909686868', '233 Vĩnh Viễn, Phường 04, Quận 10', 1);

-- --------------------------------------------------------

--
-- Table structure for table `khuyenmai`
--

CREATE TABLE `khuyenmai` (
  `makm` int(10) NOT NULL,
  `tenkm` varchar(250) NOT NULL,
  `voucher` varchar(100) DEFAULT NULL,
  `ghichu` varchar(1000) NOT NULL,
  `tenhinh` varchar(100) NOT NULL,
  `hinh` varchar(500) NOT NULL,
  `dieukien` int(20) DEFAULT NULL,
  `giagiam` int(15) DEFAULT NULL,
  `soluong` int(10) DEFAULT 0,
  `ngaybd` date NOT NULL,
  `ngaykt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `khuyenmai`
--

INSERT INTO `khuyenmai` (`makm`, `tenkm`, `voucher`, `ghichu`, `tenhinh`, `hinh`, `dieukien`, `giagiam`, `soluong`, `ngaybd`, `ngaykt`) VALUES
(1, 'Miễn phí vận chuyển', 'FREESHIP', 'Shop đang có chương trình khuyến khích khách hàng mua hàng online nên shop sẽ hỗ trợ miễn phí vận chuyển cho đơn hàng trên 80.000đ. Cùng chung tay chống dịch. Cảm ơn khách hàng đã xem', '', '', 80000, 18000, 10, '2021-07-03', '2021-07-09'),
(2, 'Hỗ trợ khách hàng mùa dịch', 'AUTUMN30', 'Giảm giá cho tất cả đơn hàng mua hàng online với tổng đơn hàng trên 150.000đ. Cảm ơn khách hàng đã ủng hộ shop <3 !!!', '', '', 10000, 3000, 0, '2021-07-03', '2021-07-05'),
(3, 'Cùng autumn shop chung tay chống dịch!', 'COVID19', 'Mỗi đơn hàng mua online với tổng đơn hàng trên 200.000đ quý vị sẽ được giảm 30.000đ trên mỗi đơn hàng.', '', '', 200000, 30000, 0, '2021-07-23', '2021-07-24'),
(4, 'Giảm giá sốc khi mua hàng online trong mùa dịch...', 'GIASOC', 'Khi quý vị mua hàng với đơn hàng trên 150.000đ thì quý vị sẽ được giảm 50.000đ trên tổng đơn hàng.', 'Free_Shipping.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Voucher_img%2FFree_Shipping.png?alt=media&token=4b3d80f3-2083-4096-8a28-dcfff0618b18', 50000, 60000, 0, '2021-07-23', '2021-07-24'),
(31, 'Giảm giá bộ sưu tập hè', NULL, 'aaaa', '', '', NULL, NULL, 0, '2021-08-24', '2021-08-27'),
(32, 'Giảm giá sốc khi mua hàng online', NULL, 'aaâ', '', '', NULL, NULL, 0, '2021-08-24', '2021-08-28'),
(33, 'Giảm giá bộ sưu tập hè', 'GIASO', 'Giảm giá!!!', 'Free_Shipping.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Voucher_img%2FFree_Shipping.png?alt=media&token=383eb843-19f8-4d35-8409-4f89bd45b0f4', 50000, 20000, 1, '2021-08-26', '2021-08-30');

-- --------------------------------------------------------

--
-- Table structure for table `loaisp`
--

CREATE TABLE `loaisp` (
  `maloai` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tenloai` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tenhinh` varchar(100) NOT NULL,
  `hinh` varchar(500) NOT NULL,
  `madm` varchar(50) DEFAULT NULL,
  `trangthai` int(10) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `loaisp`
--

INSERT INTO `loaisp` (`maloai`, `tenloai`, `tenhinh`, `hinh`, `madm`, `trangthai`) VALUES
('ak', 'ÁO KHOÁC', 'slider_aokhoac.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductType_Img%2Fslider_aokhoac.png?alt=media&token=3804992c-6361-472f-9cf5-e8fd2c87bd30', 'DMA', 1),
('asm', 'ÁO SƠ MI', 'slider_somi.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductType_Img%2Fslider_somi.jpg?alt=media&token=22bdbfa2-127b-4309-815b-daaaf422f982', 'DMA', 1),
('at', 'ÁO THUN', 'slider_aothun1.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductType_Img%2Fslider_aothun1.jpg?alt=media&token=3bd08d9d-1c2c-470f-a385-ee8923b52486', 'DMA', 1),
('jog', 'Quần Jogger', 'slider_jogger.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductType_Img%2Fslider_jogger.jpg?alt=media&token=a9749df8-894b-42e2-8342-f06f5d16874c', 'DMQ', 1),
('qj', 'QUẦN JEAN', 'quan-jean.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductType_Img%2Fquan-jean.jpg?alt=media&token=5becba1f-4f14-4ce0-84e0-76dcf0466c28', 'DMQ', 1),
('qs', 'QUẦN SHORT', 'slider_quanshort.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductType_Img%2Fslider_quanshort.png?alt=media&token=03556920-edb4-4a19-8362-4637cbb7486c', 'DMQ', 1),
('tl', 'THẮT LƯNG', 'slider_thatlung.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductType_Img%2Fslider_thatlung.png?alt=media&token=d0e974c2-9ef8-4897-b867-24cb8c17d250', 'DMPK', 1),
('vo', 'VỚ', 'slider_vo.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductType_Img%2Fslider_vo.jpg?alt=media&token=aa637883-cc45-4dcf-a961-2badf8449412', 'DMPK', 1);

-- --------------------------------------------------------

--
-- Table structure for table `nhasx`
--

CREATE TABLE `nhasx` (
  `mansx` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tennsx` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `xuatxu` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `trangthai` int(10) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nhasx`
--

INSERT INTO `nhasx` (`mansx`, `tennsx`, `xuatxu`, `trangthai`) VALUES
('ad', 'ADIDAS', 'Đức', 1),
('bsk', 'BSK', 'Việt Nam', 1),
('bt', 'BOUTON', 'Việt Nam', 1),
('dk', 'DICKIES', 'Mỹ', 1),
('ic', 'ICON', 'Việt Nam', 1),
('lcs', 'LACOSTE', 'Pháp', 1),
('mc', 'MASCUS', 'Việt Nam', 1),
('mlb', 'MLB Korea', 'Hàn Quốc', 1),
('nba', 'NBA', 'Việt Nam', 1),
('nk', 'NIKE', 'Mỹ', 1),
('nm', 'NOMOUS', 'Việt Nam', 1),
('pm', 'PUMA', 'Đức', 1),
('sp', 'SUPREME', 'Mỹ', 1),
('tm', 'T.MAN', 'Việt Nam', 1),
('ym', 'Yamee', 'Việt Nam', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `masp` int(10) NOT NULL,
  `tensp` varchar(100) NOT NULL,
  `gia` int(10) NOT NULL,
  `chitiet` longtext DEFAULT NULL,
  `tenhinh` varchar(100) NOT NULL,
  `hinh` varchar(1000) NOT NULL,
  `tenhinhct` varchar(100) DEFAULT NULL,
  `hinhchitiet` longtext DEFAULT NULL,
  `mota` text DEFAULT NULL,
  `ngaytao` datetime NOT NULL DEFAULT current_timestamp(),
  `trangthai` int(10) NOT NULL DEFAULT 1,
  `mansx` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `maloai` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `madm` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`masp`, `tensp`, `gia`, `chitiet`, `tenhinh`, `hinh`, `tenhinhct`, `hinhchitiet`, `mota`, `ngaytao`, `trangthai`, `mansx`, `maloai`, `madm`) VALUES
(126, 'Áo thun ADIDAS', 200000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":18,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":10,\"giagiam\":0},{\"id\":3,\"size\":\"M\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0},{\"id\":4,\"size\":\"L\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0}]', 'adidasTrang.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FadidasTrang.jpg?alt=media&token=ca8cab95-0f4b-435d-99db-448a853299a3', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FFree_Shipping.png?alt=media&token=21030390-b0a6-4422-8f5d-9d4a796ea658\",\"ten\":\"Free_Shipping.png\"}]', 'Chất vải cotton 100%, mịn mát. Hàng full tem, tag, date mới nhất 2021.', '2021-08-03 13:49:35', 1, 'ad', 'at', 'DMA'),
(127, 'Áo thun PEANUTS', 200000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0},{\"id\":2,\"size\":\"M\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0},{\"id\":3,\"size\":\"L\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0}]', 'nomousPNuts.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FnomousPNuts.jpg?alt=media&token=f23808f9-3f63-4957-8306-d41cc8a9fc98', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FnomousPNuts1.jpg?alt=media&token=f382ff13-7734-415b-8eac-12feaac28e96\",\"ten\":\"nomousPNuts1.jpg\"}]', 'Chất vải cotton 100%, mịn mát. Hàng full tem, tag, date mới nhất 2021.', '2021-08-03 13:51:41', 1, 'nm', 'at', 'DMA'),
(128, 'Áo khoác Denim Black', 400000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":18,\"giagiam\":0},{\"id\":2,\"size\":\"M\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0}]', 'Denim-Black.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FDenim-Black.jpg?alt=media&token=f44b23d5-d831-47d9-9c43-3c118517eca3', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FDenim-Black1.jpg?alt=media&token=0230ce86-c062-42b0-8419-c2338f27aff2\",\"ten\":\"Denim-Black1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FDenim-Black2.jpg?alt=media&token=40d4e874-1baa-468e-ba15-766e20eb4a6d\",\"ten\":\"Denim-Black2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FDenim-Black3.jpg?alt=media&token=c4f3b205-f249-42ac-b8b8-71fee4b17704\",\"ten\":\"Denim-Black3.jpg\"}]', 'Những chiếc áo khoác Jean với phong cách bụi bặm, cool ngầu dễ dàng phối ngẫu hứng mỗi ngày với những items cơ bản. Có thể nói chiếc áo khoác này là món đồ hông thể thiếu trong tủ đồ của mình luôn. Nếu có rồi thì mua thêm chiếc nữa cho tủ đồ thật đa dạng nghen', '2021-08-22 10:17:26', 1, 'nm', 'ak', 'DMA'),
(129, 'Áo sơ mi Carp Shirt', 200000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":8,\"giagiam\":0},{\"id\":2,\"size\":\"M\",\"mau\":\"trắng\",\"soluong\":9,\"giagiam\":0}]', 'boutonCarp.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FboutonCarp.jpg?alt=media&token=a8948fac-63d6-4db3-a8dd-ef8e8f5063bb', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FboutonCarp2.jpg?alt=media&token=ddf846f6-c5a7-42d3-a24d-afb40d1e8d9f\",\"ten\":\"boutonCarp2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FboutonCarp3.jpg?alt=media&token=73f40b09-2785-48d2-9231-bdb1ac3af5aa\",\"ten\":\"boutonCarp3.jpg\"}]', 'Chiếc áo đầy tiện lợi, Mỗi lần có công chiện đi học, đi làm, đi phỏng vấn thì phải sọt lẹ chiếc sơ mi cho lịch sự phải hông. Không chỉ đi công chiện thôi đâu, đi chơi hay hẹn hò ẻm cũng đáp ứng luôn, quá tiện lợi sắm ngay 1 em thôi !', '2021-08-22 11:26:07', 1, 'bt', 'asm', 'DMA'),
(130, 'Áo sơ mi CaroBlue Shirt', 250000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":10,\"giagiam\":0},{\"id\":2,\"size\":\"M\",\"mau\":\"đen\",\"soluong\":10,\"giagiam\":0}]', 'CaroBlue-Corduroy.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FCaroBlue-Corduroy.jpg?alt=media&token=2f45b15d-b7d9-4642-941b-c7be2eb13b47', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FDog.png?alt=media&token=391224da-f7b6-424b-856f-7dac11583d4f\",\"ten\":\"Dog.png\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FCaro-Corduroy02.jpg?alt=media&token=3f6123eb-f707-46ba-9c4d-cebe2cacd668\",\"ten\":\"Caro-Corduroy02.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FCaro-Corduroy1.jpg?alt=media&token=5272ebc2-6e38-4cf1-8473-6237e928aab6\",\"ten\":\"Caro-Corduroy1.jpg\"}]', 'Chiếc áo đầy tiện lợi, Mỗi lần có công chiện đi học, đi làm, đi phỏng vấn thì phải sọt lẹ chiếc sơ mi cho lịch sự phải hông. Không chỉ đi công chiện thôi đâu, đi chơi hay hẹn hò ẻm cũng đáp ứng luôn, quá tiện lợi sắm ngay 1 em thôi !', '2021-08-22 11:27:26', 1, 'dk', 'asm', 'DMA'),
(131, 'Áo Khoác Denim Blend', 400000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0},{\"id\":2,\"size\":\"M\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0},{\"size\":\"L\",\"mau\":\"đen\",\"soluong\":\"10\",\"giagiam\":\"0\"},{\"size\":\"XL\",\"mau\":\"trắng\",\"soluong\":\"20\",\"giagiam\":\"0\"}]', 'Denim-Blend.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FDenim-Blend.jpg?alt=media&token=80e327c5-139a-47d5-9add-e3e1233ff9fb', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FDog.png?alt=media&token=391224da-f7b6-424b-856f-7dac11583d4f\",\"ten\":\"Dog.png\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FOk.jpg?alt=media&token=714600eb-cea6-4610-a71e-40aa340b31d2\",\"ten\":\"Ok.jpg\"}]', 'Những chiếc áo khoác Jean với phong cách bụi bặm, cool ngầu dễ dàng phối ngẫu hứng mỗi ngày với những items cơ bản. Có thể nói chiếc áo khoác này là món đồ hông thể thiếu trong tủ đồ của mình luôn. Nếu có rồi thì mua thêm chiếc nữa cho tủ đồ thật đa dạng nghen', '2021-08-24 16:05:49', 1, 'bsk', 'ak', 'DMA'),
(132, 'Áo thun Furture', 200000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"hồng\",\"soluong\":20,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0},{\"id\":3,\"size\":\"M\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0},{\"id\":4,\"size\":\"M\",\"mau\":\"hồng\",\"soluong\":20,\"giagiam\":0}]', 'bskFurture.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FbskFurture.jpg?alt=media&token=5865c0c9-2ba4-4c33-aec0-d49b1821a3d1', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FbskFurture1.jpg?alt=media&token=160ab5ec-177f-4a81-a0bd-072717d3de66\",\"ten\":\"bskFurture1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FbskFurture2.jpg?alt=media&token=3b10a6f1-d73f-4706-8a35-dd9b48867f52\",\"ten\":\"bskFurture2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FbskFurture3.jpg?alt=media&token=576b776d-32b2-489c-b385-1de2bb4e9fd0\",\"ten\":\"bskFurture3.jpg\"}]', 'Chất vải cotton 100%, mịn mát. Hàng full tem, tag, date mới nhất 2021.', '2021-08-25 00:07:28', 1, 'bsk', 'at', 'DMA'),
(133, 'Áo thun GoKu', 200000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0},{\"id\":3,\"size\":\"M\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":4,\"size\":\"M\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0}]', 'bskGOKU.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FbskGOKU.jpg?alt=media&token=0046e215-e2b3-4ee7-9c28-86c93be4d561', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FbskGOKU1.jpg?alt=media&token=c0cfd702-4ab1-46bc-baa3-77f0fe6e0564\",\"ten\":\"bskGOKU1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FbskGOKU2.jpg?alt=media&token=9716ffc4-e173-4292-bbac-16f56b8f8a66\",\"ten\":\"bskGOKU2.jpg\"}]', 'BSK Super Saiyan date mới tinh nha ae, vừa lên kệ !!! Chất vải cotton stretch co giãn tốt, mặc rất mát. Form slim fit.', '2021-08-25 00:16:02', 1, 'bsk', 'at', 'DMA'),
(134, 'Áo sơ mi Caro Shirt', 250000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"vàng\",\"soluong\":10,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"nâu\",\"soluong\":10,\"giagiam\":0},{\"id\":3,\"size\":\"M\",\"mau\":\"vàng\",\"soluong\":10,\"giagiam\":0}]', 'Caro-Corduroy.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FCaro-Corduroy.jpg?alt=media&token=e1c414c7-ef0f-48cd-b2fb-f4208575a61e', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FCaro-Corduroy1.jpg?alt=media&token=df1171a9-58bd-4395-9930-c8a4bb90b16d\",\"ten\":\"Caro-Corduroy1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FCaro-Corduroy2.jpg?alt=media&token=358fc63e-3006-4b13-af4d-62e032623041\",\"ten\":\"Caro-Corduroy2.jpg\"}]', 'Chiếc áo đầy tiện lợi, Mỗi lần có công chiện đi học, đi làm, đi phỏng vấn thì phải sọt lẹ chiếc sơ mi cho lịch sự phải hông. Không chỉ đi công chiện thôi đâu, đi chơi hay hẹn hò ẻm cũng đáp ứng luôn, quá tiện lợi sắm ngay 1 em thôi !', '2021-08-25 01:14:13', 1, 'dk', 'asm', 'DMA'),
(135, 'Áo sơ mi Essentials Shirt', 200000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":2,\"size\":\"M\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":3,\"size\":\"L\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0}]', 'nomousEssentials.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FnomousEssentials.jpg?alt=media&token=87039d62-2fdd-481a-8297-460e0f6f3182', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FnomousEssentials1.jpg?alt=media&token=427fd6b9-c942-4442-ad65-3001a1303620\",\"ten\":\"nomousEssentials1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FnomousEssentials2.jpg?alt=media&token=bf6f5de1-10d2-4d23-8438-ca76af79d17a\",\"ten\":\"nomousEssentials2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FnomousEssentials3.jpg?alt=media&token=1084d397-ca55-48d4-a5db-5ace31017f1d\",\"ten\":\"nomousEssentials3.jpg\"}]', 'Chiếc áo đầy tiện lợi, Mỗi lần có công chiện đi học, đi làm, đi phỏng vấn thì phải sọt lẹ chiếc sơ mi cho lịch sự phải hông. Không chỉ đi công chiện thôi đâu, đi chơi hay hẹn hò ẻm cũng đáp ứng luôn, quá tiện lợi sắm ngay 1 em thôi !', '2021-08-25 03:15:30', 1, 'nm', 'asm', 'DMA'),
(136, 'Áo sơmi NOMOUS ESSENTIALS hoạ tiết', 200000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"vàng\",\"soluong\":20,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"xanh\",\"soluong\":20,\"giagiam\":0},{\"id\":3,\"size\":\"S\",\"mau\":\"đỏ\",\"soluong\":20,\"giagiam\":0},{\"id\":4,\"size\":\"M\",\"mau\":\"vàng\",\"soluong\":20,\"giagiam\":0},{\"id\":5,\"size\":\"M\",\"mau\":\"xanh\",\"soluong\":20,\"giagiam\":0},{\"id\":6,\"size\":\"M\",\"mau\":\"đỏ\",\"soluong\":20,\"giagiam\":0}]', 'nomous-essentials.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Fnomous-essentials.jpg?alt=media&token=50e6a3da-b939-4c63-9ced-d86f631519e4', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fnomous-essentials3.jpg?alt=media&token=50797e9e-f52d-4da2-898c-09e8c9aa6dde\",\"ten\":\"nomous-essentials3.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fnomous-essentials1.jpg?alt=media&token=d1f9cc89-8540-4f31-a74a-e31a5e560193\",\"ten\":\"nomous-essentials1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fnomous-essentials2.jpg?alt=media&token=7b323299-a964-4429-95f2-e91dbd899d08\",\"ten\":\"nomous-essentials2.jpg\"}]', 'Chiếc áo đầy tiện lợi, Mỗi lần có công chiện đi học, đi làm, đi phỏng vấn thì phải sọt lẹ chiếc sơ mi cho lịch sự phải hông. Không chỉ đi công chiện thôi đâu, đi chơi hay hẹn hò ẻm cũng đáp ứng luôn, quá tiện lợi sắm ngay 1 em thôi !', '2021-08-25 03:24:13', 1, 'nm', 'asm', 'DMA'),
(137, 'Áo sơ mi Mascus basic slim', 250000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":10,\"giagiam\":0},{\"id\":7,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":15,\"giagiam\":0},{\"id\":8,\"size\":\"S\",\"mau\":\"xanh\",\"soluong\":10,\"giagiam\":0},{\"id\":9,\"size\":\"M\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0}]', 'mascus-basic.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Fmascus-basic.jpg?alt=media&token=2af3fe40-6ec7-4601-8dbf-efc91bde51b7', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fmascus-basic1.jpg?alt=media&token=fb05c198-a61c-4d1d-87ae-7f7998ae231a\",\"ten\":\"mascus-basic1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fmascus-basic2.jpg?alt=media&token=1cda9383-5e43-47d8-b4c1-b0ad558efcad\",\"ten\":\"mascus-basic2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fmascus-basic3.jpg?alt=media&token=89298b8f-4817-4ce4-944d-30710dfa73b3\",\"ten\":\"mascus-basic3.jpg\"}]', 'MASCUS Embroidery logo t-shirts. Đang sale mà ad lên kệ mẫu sơmi mới nhất của MASCUS phục vụ ae nha. Chiếc áo đầy tiện lợi, Mỗi lần có công chiện đi học, đi làm, đi phỏng vấn thì phải sọt lẹ chiếc sơ mi cho lịch sự phải hông. Không chỉ đi công chiện thôi đâu, đi chơi hay hẹn hò ẻm cũng đáp ứng luôn, quá tiện lợi sắm ngay 1 em thôi !', '2021-08-25 03:30:43', 1, 'mc', 'asm', 'DMA'),
(138, 'Áo sơmi ICON DENIM họa tiết', 200000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"hồng\",\"soluong\":10,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"đỏ\",\"soluong\":15,\"giagiam\":0},{\"id\":3,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":4,\"size\":\"M\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":5,\"size\":\"M\",\"mau\":\"đỏ\",\"soluong\":20,\"giagiam\":0},{\"id\":6,\"size\":\"M\",\"mau\":\"hồng\",\"soluong\":15,\"giagiam\":0}]', 'icon-denim.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Ficon-denim.jpg?alt=media&token=9acddbf9-2d7a-4bec-bc65-486cad8b8b54', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Ficon-denim3.jpg?alt=media&token=0454a8e0-82ac-45cc-a827-3804f27ba56c\",\"ten\":\"icon-denim3.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Ficon-denim2.jpg?alt=media&token=d565cb22-a05c-452c-8bf3-955bcadf4cf4\",\"ten\":\"icon-denim2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Ficon-denim1.jpg?alt=media&token=6fc2fc64-8660-4f8a-9a2c-2f0e9675a8bc\",\"ten\":\"icon-denim1.jpg\"}]', 'Icondenim print shirts - chất vải cotton rũ mặc rất mát & nhẹ\nForm relax mặc rất thoải mái. Chiếc áo đầy tiện lợi, Mỗi lần có công chiện đi học, đi làm, đi phỏng vấn thì phải sọt lẹ chiếc sơ mi cho lịch sự phải hông. Không chỉ đi công chiện thôi đâu, đi chơi hay hẹn hò ẻm cũng đáp ứng luôn, quá tiện lợi sắm ngay 1 em thôi !', '2021-08-25 03:36:16', 1, 'ic', 'asm', 'DMA'),
(139, 'Áo sơmi BOUTON Texture Shirts', 250000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"xanh\",\"soluong\":10,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":15,\"giagiam\":0},{\"id\":3,\"size\":\"M\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0},{\"id\":4,\"size\":\"M\",\"mau\":\"xanh\",\"soluong\":20,\"giagiam\":0}]', 'bouton-texture.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Fbouton-texture.jpg?alt=media&token=8ce2b38f-e37f-42a0-8937-3071ef19ffa3', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-texture1.jpg?alt=media&token=06a1c974-cebc-4c2d-9e31-21c34807add0\",\"ten\":\"bouton-texture1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-texture2.jpg?alt=media&token=951d2187-328f-4f6f-8f58-0d9cd9a4df63\",\"ten\":\"bouton-texture2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-texture3.jpg?alt=media&token=0f2d7507-16f0-489d-b1db-828e9f8b07a2\",\"ten\":\"bouton-texture3.jpg\"}]', 'BOUTON Texture Shirts là dòng sơmi form slim fit với chất vải cotton gân nhuyễn, luôn là best-seller của shop. Chiếc áo đầy tiện lợi, Mỗi lần có công chiện đi học, đi làm, đi phỏng vấn thì phải sọt lẹ chiếc sơ mi cho lịch sự phải hông. Không chỉ đi công chiện thôi đâu, đi chơi hay hẹn hò ẻm cũng đáp ứng luôn, quá tiện lợi sắm ngay 1 em thôi !', '2021-08-25 03:43:24', 1, 'bt', 'asm', 'DMA'),
(140, 'Set vớ M.L.B', 120000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":50,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":50,\"giagiam\":0}]', 'mlbCombo.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FmlbCombo.jpg?alt=media&token=7990eae8-9a80-4507-a7c4-1411b7bbd843', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FmlbCombo3.jpg?alt=media&token=826024f0-b013-4f07-b544-0e64d027e1cc\",\"ten\":\"mlbCombo3.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FmlbCombo1.jpg?alt=media&token=34fd9045-d247-45de-8544-4729f9616b81\",\"ten\":\"mlbCombo1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FmlbCombo2.jpg?alt=media&token=06358c70-2411-46aa-8094-319f4fcd776a\",\"ten\":\"mlbCombo2.jpg\"}]', 'Mùa hè sắp tới, nếu các anh chị em còn đang phân vân chưa biết lựa chọn loại tất nào trẻ trung năng động lại vừa  thông thoáng chống hôi chân thì hãy lựa chọn sản phẩm vớ MLB của shop.', '2021-08-25 03:57:28', 1, 'mlb', 'vo', 'DMPK'),
(141, 'Set vớ ngắn DKIES', 100000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":40,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":40,\"giagiam\":0}]', 'dickies.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Fdickies.jpg?alt=media&token=7877f3fb-8ab3-409d-a9a1-4a5eeab0ff34', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fdickies1.jpg?alt=media&token=2d6f4f45-47ff-4676-b5b5-581c791b92bc\",\"ten\":\"dickies1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fdickies2.jpg?alt=media&token=c732051c-ac85-4a91-9b6f-89f423cb63a3\",\"ten\":\"dickies2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fdickies3.jpg?alt=media&token=ad3c62a4-fef0-495b-af24-d97ad25f83ab\",\"ten\":\"dickies3.jpg\"}]', 'Mùa hè sắp tới, nếu các anh chị em còn đang phân vân chưa biết lựa chọn loại tất nào trẻ trung năng động lại vừa  thông thoáng chống hôi chân thì hãy lựa chọn sản phẩm set vớ ngắn dickies của shop.', '2021-08-25 04:01:10', 1, 'dk', 'vo', 'DMPK'),
(142, 'Vớ Lười BOUTON INVISIBLE', 25000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":30,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":30,\"giagiam\":0},{\"id\":3,\"size\":\"S\",\"mau\":\"xám\",\"soluong\":30,\"giagiam\":0}]', 'bouton-invisible.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Fbouton-invisible.jpg?alt=media&token=97d2ea14-cf16-4f85-854e-6104cfc1f17e', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-invisible1.jpg?alt=media&token=56973a60-c60d-40d0-803d-b600156c6870\",\"ten\":\"bouton-invisible1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-invisible2.jpg?alt=media&token=6759149f-ea06-4755-8a7e-80b3740bd3cd\",\"ten\":\"bouton-invisible2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-invisible3.jpg?alt=media&token=0d2adbbc-cef0-4e05-975b-f4d7f866c801\",\"ten\":\"bouton-invisible3.jpg\"}]', 'Mùa hè sắp tới, nếu các anh chị em còn đang phân vân chưa biết lựa chọn loại tất nào trẻ trung năng động lại vừa  thông thoáng chống hôi chân thì hãy lựa chọn sản phẩm vớ lười bouton của shop.', '2021-08-25 04:05:03', 1, 'bt', 'vo', 'DMPK'),
(143, 'Vớ cổ cao hoạ tiết', 20000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":20,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0}]', 'Loco1.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FLoco1.jpg?alt=media&token=1fd9af9c-9250-485a-b281-ee978c6d26da', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FLoco2.jpg?alt=media&token=3367a4ca-2fdd-4306-99ca-0a13dbcb71b4\",\"ten\":\"Loco2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FLoco6.jpg?alt=media&token=e797b776-9f57-4946-a727-9166d71fa7fb\",\"ten\":\"Loco6.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2FLoco5.jpg?alt=media&token=5bd52f4f-1889-4d5b-84dd-5b81f1ef82d3\",\"ten\":\"Loco5.jpg\"}]', 'Mùa hè sắp tới, nếu các anh chị em còn đang phân vân chưa biết lựa chọn loại tất nào trẻ trung năng động lại vừa  thông thoáng chống hôi chân thì hãy lựa chọn sản phẩm vớ cổ cao của shop.', '2021-08-25 04:08:39', 1, 'ym', 'vo', 'DMPK'),
(144, 'Thắt lưng ICON DENIM mặt kim', 250000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"xanh\",\"soluong\":40,\"giagiam\":0}]', 'icon-denim.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Ficon-denim.jpg?alt=media&token=0eb3bead-8df1-4c6e-938e-ceeab11496b9', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Ficon-denim1.jpg?alt=media&token=6dfdac0c-bc6a-4d0a-82ff-84d6a781e295\",\"ten\":\"icon-denim1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Ficon-denim2.jpg?alt=media&token=ea273cde-fc0d-43cf-a35b-a99a8b3d0e42\",\"ten\":\"icon-denim2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Ficon-denim3.jpg?alt=media&token=467dbd61-66aa-47e9-8042-b9e726863cae\",\"ten\":\"icon-denim3.jpg\"}]', 'Chất liệu dây: Da cao cấp, kiểu dây da kết hợp sọc nato bên trên. Màu dây: dây da đen phối sọc xanh đỏ/dây da trắng phối sọc xanh đỏ. Khóa cài cao cấp, không phải cắt dây, tiện lợi và thời trang. Thắt lưng nam với thiết kế hiện đại, sang trọng và lịch lãm sẽ là một phụ kiện lý tưởng làm tăng lên khí chất của phái mạnh.', '2021-08-25 04:15:21', 1, 'ic', 'tl', 'DMPK'),
(145, 'Thắt lưng PED. camo', 350000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":30,\"giagiam\":0}]', 'ped-camo.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Fped-camo.jpg?alt=media&token=6136f89a-4e2c-4e56-b2dc-3322622bdcd1', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fped-camo1.jpg?alt=media&token=7c8b8875-3cdf-4d20-8d9a-18d5e253470b\",\"ten\":\"ped-camo1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fped-camo3.jpg?alt=media&token=971cdb74-1f2d-4bf8-a0eb-47bcf41700d3\",\"ten\":\"ped-camo3.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fped-camo2.jpg?alt=media&token=51072d1b-70f8-4b0f-8c8e-27f8e5315cdb\",\"ten\":\"ped-camo2.jpg\"}]', 'Da cao cấp, kiểu dây da kết hợp sọc nato bên trên, dây da đen phối sọc xanh đỏ/dây da trắng phối sọc xanh đỏ. Mặt khóa chữ G đối lập hợp kim bọc họa tiết tinh tế. Thắt lưng nam da mềm mại, dẻo dai, bền màu. Thắt lưng nam với thiết kế hiện đại, sang trọng và lịch lãm sẽ là một phụ kiện lý tưởng làm tăng lên khí chất của phái mạnh.', '2021-08-25 04:19:07', 1, 'nk', 'tl', 'DMPK'),
(146, 'Quần Short BOUTON Acid wash', 250000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":2,\"size\":\"M\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":3,\"size\":\"L\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0}]', 'bouton-acidWash.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Fbouton-acidWash.jpg?alt=media&token=e6cc34ce-ec12-45d2-a09e-cd99b39af8fb', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-acidWash1.jpg?alt=media&token=c0603fa5-af66-4041-998c-b1f5d008c6b2\",\"ten\":\"bouton-acidWash1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-acidWash2.jpg?alt=media&token=873a95ec-ba3b-4a22-b8f1-ecfd603c93a4\",\"ten\":\"bouton-acidWash2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-acidWash3.jpg?alt=media&token=2ae4ea8c-519c-4e4a-9193-c1d8b5113486\",\"ten\":\"bouton-acidWash3.jpg\"}]', 'Washed Cargo Shorts BOUTON lên kệ dòng quần nỉ túi hộp wash cho hiệu ứng cực chất. Dáng ngang gối, lên style streetwear hợp lý luôn.', '2021-08-25 04:24:32', 1, 'bt', 'qs', 'DMQ'),
(147, 'Quần Short Tây NOMOUS ESSENTIALS Embroidery', 250000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":2,\"size\":\"M\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":3,\"size\":\"L\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0}]', 'nomous-essentials.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Fnomous-essentials.jpg?alt=media&token=a214295b-351f-4ce3-83ca-978ff26acf50', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fnomous-essentials1.jpg?alt=media&token=b39e8ba3-6007-4c08-83e5-6beb20dffd92\",\"ten\":\"nomous-essentials1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fnomous-essentials2.jpg?alt=media&token=c75cca3b-5d96-46bb-b0fd-8685d0536fc1\",\"ten\":\"nomous-essentials2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fnomous-essentials3.jpg?alt=media&token=6a534262-8756-4c26-b922-c20eb3fe39a5\",\"ten\":\"nomous-essentials3.jpg\"}]', 'Kiểu dáng thời trang mới lạ, thiết kế trẻ trung năng động, chuẩn from dáng chất liệu jean cao cấp không bay màu.', '2021-08-25 04:29:39', 1, 'nm', 'qs', 'DMQ'),
(148, 'Quần Short Nỉ BOUTON Basic', 220000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"xám\",\"soluong\":20,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":3,\"size\":\"S\",\"mau\":\"kem\",\"soluong\":20,\"giagiam\":0},{\"id\":4,\"size\":\"M\",\"mau\":\"xám\",\"soluong\":20,\"giagiam\":0},{\"id\":5,\"size\":\"M\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":6,\"size\":\"M\",\"mau\":\"kem\",\"soluong\":20,\"giagiam\":0}]', 'bouton-basic.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Fbouton-basic.jpg?alt=media&token=d2067616-e119-465e-9d25-da77d132bfdd', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-basic1.jpg?alt=media&token=3fb68372-855c-49da-9328-ef6ea8741deb\",\"ten\":\"bouton-basic1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-basic3.jpg?alt=media&token=9c16edb9-3ba4-4ddd-83b1-0b5b3ca4d12b\",\"ten\":\"bouton-basic3.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-basic2.jpg?alt=media&token=dbe90d00-0f9d-4379-ad9a-511f7f4dd398\",\"ten\":\"bouton-basic2.jpg\"}]', NULL, '2021-08-25 04:32:46', 1, 'bt', 'qs', 'DMQ'),
(149, 'Quần short pique BOUTON details', 250000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"nâu\",\"soluong\":20,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":3,\"size\":\"S\",\"mau\":\"xám\",\"soluong\":20,\"giagiam\":0},{\"id\":4,\"size\":\"M\",\"mau\":\"xám\",\"soluong\":20,\"giagiam\":0},{\"id\":5,\"size\":\"M\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0}]', 'bouton-pique.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Fbouton-pique.jpg?alt=media&token=06406722-901e-4cc5-a956-42cc915f1936', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-pique1.jpg?alt=media&token=285c866d-50c4-40a6-8182-c672bd6342c4\",\"ten\":\"bouton-pique1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-pique2.jpg?alt=media&token=6467f0ba-f0c8-463e-9def-595eb6f6e7c8\",\"ten\":\"bouton-pique2.jpg\"}]', 'Pique Shorts BOUTON', '2021-08-25 04:36:41', 1, 'bt', 'qs', 'DMQ'),
(150, 'Quần Jogger BOUTON With Zipper', 280000, '[{\"id\":2,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":3,\"size\":\"M\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":4,\"size\":\"L\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0}]', 'bouton-jogger.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Fbouton-jogger.jpg?alt=media&token=f7d647f0-67ca-4b19-84a9-e33fd8d65e53', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-jogger1.jpg?alt=media&token=c069fa25-3f94-4735-99c7-e9e2049851b9\",\"ten\":\"bouton-jogger1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-jogger2.jpg?alt=media&token=cad82ee4-d5a2-421d-a6e7-d5856eb246cf\",\"ten\":\"bouton-jogger2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fbouton-jogger3.jpg?alt=media&token=1ed276f6-9dea-42d5-b8ab-dc5dc26ccb02\",\"ten\":\"bouton-jogger3.jpg\"}]', 'Chất liệu: Kaki  cotton cực xịn phối thun 2 bên chân tạo độ co giãn thoải mái khi mặc. Sản phẩm được dệt và nhuộm theo quy trình khép kín hiện đại, được chứng nhận đảm bảo an toàn không độc hại với da. Phom unisex rộng rãi thoải mái, không kén chọn nam nữ.', '2021-08-25 04:47:05', 1, 'bt', 'jog', 'DMQ'),
(151, 'Quần jogger BOUTON pique', 250000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"xám\",\"soluong\":20,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":3,\"size\":\"M\",\"mau\":\"xám\",\"soluong\":20,\"giagiam\":0},{\"id\":4,\"size\":\"M\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0}]', 'boutom-pique.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Fboutom-pique.jpg?alt=media&token=09eb0127-8f73-4715-8566-bce394c577a8', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fboutom-pique1.jpg?alt=media&token=34421526-0dfe-45a1-b097-4d76c55ec008\",\"ten\":\"boutom-pique1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fboutom-pique2.jpg?alt=media&token=f7e7292a-7144-4a85-9da5-e671887f7a42\",\"ten\":\"boutom-pique2.jpg\"}]', 'Pique Joggers BOUTON ss21. Chất vải pique đã quá quen thuộc với ae rồi. Form jogger slim fit. Các túi đều có khoá kéo zip.', '2021-08-25 04:57:33', 1, 'bt', 'jog', 'DMQ'),
(152, 'Quần Jogger NOMOUS ESSENTIALS Denim', 400000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"xanh\",\"soluong\":20,\"giagiam\":0},{\"id\":2,\"size\":\"M\",\"mau\":\"xanh\",\"soluong\":20,\"giagiam\":0},{\"id\":3,\"size\":\"L\",\"mau\":\"xanh\",\"soluong\":20,\"giagiam\":0}]', 'nomous-essentials.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Fnomous-essentials.jpg?alt=media&token=77c54a2b-e7fe-4623-a6cf-b89750db6592', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fnomous-essentials1.jpg?alt=media&token=d27484e8-cdd0-46a1-a2bb-abcbcc2503a2\",\"ten\":\"nomous-essentials1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fnomous-essentials2.jpg?alt=media&token=938e1395-431e-4b86-9c92-41d7511adcd7\",\"ten\":\"nomous-essentials2.jpg\"}]', 'Joggers Denim NOMOUS ESSENTIALS dòng quần jogger jeans dành cho ae thích sự năng động, trẻ trung. Chất vải jeans dày dặn, có độ co giãn cao. Form slim fit, ôm gọn dáng.', '2021-08-25 05:01:06', 1, 'nm', 'jog', 'DMQ'),
(153, 'Quần Jogger NOMOUS ESSENTIALS Túi Hộp', 300000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":2,\"size\":\"S\",\"mau\":\"xanh\",\"soluong\":20,\"giagiam\":0},{\"id\":3,\"size\":\"M\",\"mau\":\"đen\",\"soluong\":20,\"giagiam\":0},{\"id\":4,\"size\":\"M\",\"mau\":\"xanh\",\"soluong\":20,\"giagiam\":0}]', 'nomous-tuihop.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2Fnomous-tuihop.jpg?alt=media&token=2353cc89-4bd1-4892-9bda-d87ee9117ca2', NULL, '[{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fnomous-tuihop1.jpg?alt=media&token=c80feb18-e63c-43f2-8252-1f409eb1770d\",\"ten\":\"nomous-tuihop1.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fnomous-tuihop2.jpg?alt=media&token=039c4b67-9894-4db7-bd57-8310332cc51c\",\"ten\":\"nomous-tuihop2.jpg\"},{\"link\":\"https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductDetail_Img%2Fnomous-tuihop3.jpg?alt=media&token=3872c9c3-9e54-4ee4-aa46-b21c92efbf04\",\"ten\":\"nomous-tuihop3.jpg\"}]', 'Dòng quần kaki túi hộp, lưng thun mới nhất vừa lên kệ, được thiết kế từ chất vải kaki mềm mịn, vô cùng êm ái và thoải mái khi mặc. Form regular vừa dáng chân.', '2021-08-25 05:05:29', 1, 'nm', 'jog', 'DMQ');

-- --------------------------------------------------------

--
-- Table structure for table `trangthai`
--

CREATE TABLE `trangthai` (
  `tentt` varchar(100) CHARACTER SET utf8 NOT NULL,
  `trangthai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trangthai`
--

INSERT INTO `trangthai` (`tentt`, `trangthai`) VALUES
('Đang chờ xử lý', 0),
('Đã duyệt', 1),
('Đang giao hàng', 2),
('Hoàn thành', 3),
('Đã hủy', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`manv`);

--
-- Indexes for table `bang_size`
--
ALTER TABLE `bang_size`
  ADD PRIMARY KEY (`masize`);

--
-- Indexes for table `binhluan`
--
ALTER TABLE `binhluan`
  ADD PRIMARY KEY (`mabl`),
  ADD KEY `binhluan_ibfk_1` (`makh`),
  ADD KEY `binhluan_ibfk_2` (`masp`);

--
-- Indexes for table `chitietbl`
--
ALTER TABLE `chitietbl`
  ADD PRIMARY KEY (`mact`),
  ADD KEY `chitietbl_ibfk_1` (`mabl`);

--
-- Indexes for table `chitietdh`
--
ALTER TABLE `chitietdh`
  ADD PRIMARY KEY (`mact`),
  ADD KEY `madonhang` (`madonhang`),
  ADD KEY `masp` (`masp`);

--
-- Indexes for table `chitietkm`
--
ALTER TABLE `chitietkm`
  ADD PRIMARY KEY (`mact`),
  ADD KEY `chitietkm_ibfk_1` (`makm`),
  ADD KEY `chitietkm_ibfk_2` (`masp`);

--
-- Indexes for table `danhmuc`
--
ALTER TABLE `danhmuc`
  ADD PRIMARY KEY (`madm`);

--
-- Indexes for table `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`madonhang`),
  ADD KEY `makh` (`makh`),
  ADD KEY `trangthai` (`trangthai`),
  ADD KEY `donhang_ibfk_4` (`makm`),
  ADD KEY `donhang_ibfk_2` (`manv`);

--
-- Indexes for table `giohang`
--
ALTER TABLE `giohang`
  ADD PRIMARY KEY (`magiohang`),
  ADD KEY `masp` (`masp`),
  ADD KEY `giohang_ibfk_2` (`makh`);

--
-- Indexes for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`makh`);

--
-- Indexes for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  ADD PRIMARY KEY (`makm`);

--
-- Indexes for table `loaisp`
--
ALTER TABLE `loaisp`
  ADD PRIMARY KEY (`maloai`);

--
-- Indexes for table `nhasx`
--
ALTER TABLE `nhasx`
  ADD PRIMARY KEY (`mansx`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`masp`),
  ADD KEY `maloai` (`maloai`),
  ADD KEY `mansx` (`mansx`),
  ADD KEY `sanpham_ibfk_3` (`madm`);

--
-- Indexes for table `trangthai`
--
ALTER TABLE `trangthai`
  ADD PRIMARY KEY (`trangthai`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `manv` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `bang_size`
--
ALTER TABLE `bang_size`
  MODIFY `masize` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `binhluan`
--
ALTER TABLE `binhluan`
  MODIFY `mabl` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `chitietbl`
--
ALTER TABLE `chitietbl`
  MODIFY `mact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `chitietdh`
--
ALTER TABLE `chitietdh`
  MODIFY `mact` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `chitietkm`
--
ALTER TABLE `chitietkm`
  MODIFY `mact` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `donhang`
--
ALTER TABLE `donhang`
  MODIFY `madonhang` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `giohang`
--
ALTER TABLE `giohang`
  MODIFY `magiohang` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `makh` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  MODIFY `makm` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `masp` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `binhluan`
--
ALTER TABLE `binhluan`
  ADD CONSTRAINT `binhluan_ibfk_1` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`makh`) ON UPDATE CASCADE,
  ADD CONSTRAINT `binhluan_ibfk_2` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`) ON UPDATE CASCADE;

--
-- Constraints for table `chitietbl`
--
ALTER TABLE `chitietbl`
  ADD CONSTRAINT `chitietbl_ibfk_1` FOREIGN KEY (`mabl`) REFERENCES `binhluan` (`mabl`) ON UPDATE CASCADE;

--
-- Constraints for table `chitietdh`
--
ALTER TABLE `chitietdh`
  ADD CONSTRAINT `chitietdh_ibfk_1` FOREIGN KEY (`madonhang`) REFERENCES `donhang` (`madonhang`) ON UPDATE CASCADE,
  ADD CONSTRAINT `chitietdh_ibfk_2` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`) ON UPDATE CASCADE;

--
-- Constraints for table `chitietkm`
--
ALTER TABLE `chitietkm`
  ADD CONSTRAINT `chitietkm_ibfk_1` FOREIGN KEY (`makm`) REFERENCES `khuyenmai` (`makm`) ON UPDATE CASCADE,
  ADD CONSTRAINT `chitietkm_ibfk_2` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`) ON UPDATE CASCADE;

--
-- Constraints for table `donhang`
--
ALTER TABLE `donhang`
  ADD CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`makh`) ON UPDATE SET NULL,
  ADD CONSTRAINT `donhang_ibfk_2` FOREIGN KEY (`manv`) REFERENCES `admin` (`manv`) ON UPDATE SET NULL,
  ADD CONSTRAINT `donhang_ibfk_4` FOREIGN KEY (`makm`) REFERENCES `khuyenmai` (`makm`) ON UPDATE CASCADE,
  ADD CONSTRAINT `donhang_ibfk_5` FOREIGN KEY (`trangthai`) REFERENCES `trangthai` (`trangthai`) ON UPDATE CASCADE;

--
-- Constraints for table `giohang`
--
ALTER TABLE `giohang`
  ADD CONSTRAINT `giohang_ibfk_1` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`) ON UPDATE CASCADE,
  ADD CONSTRAINT `giohang_ibfk_2` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`makh`) ON UPDATE CASCADE;

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`maloai`) REFERENCES `loaisp` (`maloai`) ON UPDATE CASCADE,
  ADD CONSTRAINT `sanpham_ibfk_2` FOREIGN KEY (`mansx`) REFERENCES `nhasx` (`mansx`) ON UPDATE CASCADE,
  ADD CONSTRAINT `sanpham_ibfk_3` FOREIGN KEY (`madm`) REFERENCES `danhmuc` (`madm`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

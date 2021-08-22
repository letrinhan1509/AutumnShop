-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2021 at 09:39 AM
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
(20, 'boylanhlung@gmail.com', '$2b$10$2//.NynC70K/ugtZsJlAVumz1V0f9XvrsK8UW7DTxCA/NOwcvFfBS', 'Bad Boy', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', '180 Cao Lỗ', '0909686868', 'NVBH', 1),
(21, 'trinhan.dh51703846@gmail.com', '$2b$10$zzR38uOEiUQAyFPFPvzvWOdkzUj/kepWFSht/w7JqmbO5KX5YRPiC', 'Lê Trí Nhân', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2Fuser.png?alt=media&token=6ec247df-90ab-4cc9-b671-7261ef37215f&fbclid=IwAR2WTfoELEQhDxDpM3qKj0XcNtFNZyR1_5AYxYWNWpzzoIsuOWOIOqH9K9k', '82/72 Lê Văn Duyệt', '0969362915', 'NVGH', 1);

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
(11, 126, 7, 'Sản phẩm rất tốt !!!', '2021-08-04 08:00:00', 1),
(12, 127, 10, 'Áo rất đẹp!!!', '2021-08-20 22:23:42', 1);

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
(5, NULL, 'Bad Boy', 'Cảm ơn bạn!!!', '2021-08-20 23:28:07', 20, 11);

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
(73, 128, 'S', 'trắng', 400000, 0, 1, 400000, 107);

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
  `makm` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chitietkm`
--

INSERT INTO `chitietkm` (`mact`, `masp`, `chitiet_km`, `chietkhau`, `giakm`, `makm`) VALUES
(13, 127, '[object Object]', 20, 160000, 20),
(14, 127, '[object Object]', 30, 140000, 21),
(15, 127, '[object Object]', 20, 160000, 24),
(16, 126, '[object Object]', 30, 140000, 24),
(17, 126, '[object Object]', 20, 160000, 25),
(18, 127, '[object Object]', 20, 160000, 25),
(19, 126, '[object Object]', 20, 160000, 26),
(20, 126, '[object Object]', 30, 140000, 26),
(21, 127, '[object Object]', 30, 140000, 26),
(22, 127, '[object Object]', 20, 160000, 27),
(23, 126, '[object Object]', 10, 180000, 28),
(24, 126, '[object Object]', 20, 160000, 28),
(25, 127, '[object Object]', 30, 140000, 28),
(26, 126, '[object Object]', 10, 180000, 29),
(27, 126, '[object Object]', 20, 160000, 29),
(28, 127, '[object Object]', 20, 160000, 29),
(29, 127, '[object Object]', 30, 140000, 29);

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
('DMA', 'Áo', 'bg-attact.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Catalog_Img%2Fbg-attact.png?alt=media&token=df676eae-8fcc-4e1c-b7cc-20d1622df324', 1),
('DMPK', 'Phụ kiện', '', '', 1),
('DMQ', 'Quần', '', '', 1),
('GT', 'Giới thiệu', '', '', 1),
('H', 'HOME', 'bg-attact.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Catalog_Img%2Fbg-attact.png?alt=media&token=58d7cf0e-dce1-455f-866e-24ad8c4bd588', 1);

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
(105, NULL, 9, 'Nemo', 'thhphuong2607@gmail.com', '932550587', '233 Vĩnh Viễn, Phường 04, Quận 10, TP Hồ Chí Minh', 18000, 218000, '', NULL, 'Thanh toán khi nhận hàng', 'SHOP', NULL, '2020-07-11', NULL, NULL, 4),
(106, NULL, 8, 'Nhân', 'letrinhan54321@gmail.com', '0909686868', '82/72 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, TP Hồ Chí Minh', 18000, 218000, '', NULL, 'Thanh toán khi nhận hàng', 'SHOP', 'NULL', '2021-08-22', NULL, NULL, 0),
(107, NULL, 9, 'Nemo', 'thhphuong2607@gmail.com', '932550587', '233 Vĩnh Viễn, Phường 04, Quận 10, TP Hồ Chí Minh', 18000, 418000, '', NULL, 'Thanh toán khi nhận hàng', 'SHOP', 'NULL', '2021-08-22', NULL, NULL, 0);

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

--
-- Dumping data for table `giohang`
--

INSERT INTO `giohang` (`magiohang`, `makh`, `masp`, `size`, `mau`, `gia`, `giagiam`, `soluong`, `thanhtien`) VALUES
(27, 7, 126, 'S', 'đen', 200000, 0, 1, 200000);

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
(1, NULL, 'Nguyễn Văn Nhất', 'nvn@gmail.com', '$2b$10$ikhShC0/C3EuPoWNK3WGHebqrGYzgCC2gn1kkxTGtmnwsRldbk//a', '', NULL, '69741120', '15 HTK p5 q8', 1),
(4, NULL, 'Lê Trí Nhân', 'nhan@gmail.com', '123456789', '', NULL, '69741120', '180 Cao Lỗ', 1),
(5, NULL, 'Nhật Hào', 'hao@gmail.com', '123456@^!^@', '', NULL, '909666555', '182 Cao Lỗ', 1),
(6, NULL, 'Bad Boy', 'trinhan.dh51703846@gmail.com', '$2b$10$cUnPrNVLjaqYlnJdsZ.ajOsUCRD5au5xEF7POFo8Ip0qadqyKEjVq', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', '906060606', '180 Cao Lỗ, P4', 1),
(7, NULL, 'Trí Nhân', 'letrinhan1509@gmail.com', '$2b$10$bmoZ2SnYw.Bf34Tgt2/Md./j2XSNpBPE.nwkspWMvl8ofkITCY6a.', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', '969362915', '178 Cao Lỗ, Phường 04', 1),
(8, NULL, 'Nhân', 'letrinhan54321@gmail.com', '$2b$10$KvhroYwNu2J4wpn3ytLREOZ/1cdzx65UZA3bbeEhPGnpAJc0BU9hO', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', '909686868', '180 Cao Lỗ', 1),
(9, NULL, 'Nemo', 'thhphuong2607@gmail.com', '$2b$10$CDpT16OfF5.xjlVGVBZkP.8LizxgyBDDwc0Rv39uhUDwmBtl5vF4y', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', '932550587', '233/15 Vĩnh Viễn', 1),
(10, NULL, 'Nhật Hào', 'letrinhan15099@gmail.com', '$2b$10$fq4JuU8B7Mb0h0l9vnMBze1aBXBwMjnfISYZnAj6662PQvBE5a2re', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FUser.png?alt=media&token=91223830-561b-4a82-80dd-3db9c9f8cbee&fbclid=IwAR3SAE6RpfzzdW1GexLJwXNNBN45ukaCeSr6xSpbdREy61vhghcy_N0eTr4', '969362915', '178 Cao Lỗ, Phường 4, Quận 08, Tp.HCM', 1);

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
(1, 'Miễn phí vận chuyển', 'FREESHIP', 'Shop đang có chương trình khuyến khích khách hàng mua hàng online nên shop sẽ hỗ trợ miễn phí vận chuyển cho đơn hàng trên 80.000đ. Cùng chung tay chống dịch. Cảm ơn khách hàng đã xem', '', '', 80000, 18000, 0, '2021-07-03', '2021-07-09'),
(2, 'Hỗ trợ khách hàng mùa dịch', 'AUTUMN30', 'Giảm giá cho tất cả đơn hàng mua hàng online với tổng đơn hàng trên 150.000đ. Cảm ơn khách hàng đã ủng hộ shop <3 !!!', '', '', 10000, 3000, 0, '2021-07-03', '2021-07-05'),
(3, 'Cùng autumn shop chung tay chống dịch!', 'COVID19', 'Mỗi đơn hàng mua online với tổng đơn hàng trên 200.000đ quý vị sẽ được giảm 30.000đ trên mỗi đơn hàng.', '', '', 200000, 30000, 0, '2021-07-23', '2021-07-24'),
(4, 'Giảm giá sốc khi mua hàng online trong mùa dịch', 'GIASOC', 'Khi quý vị mua hàng với đơn hàng trên 150.000đ thì quý vị sẽ được giảm 50.000đ trên tổng đơn hàng.', '', 'undefined', 150000, 60000, 0, '2021-07-23', '2021-07-24'),
(12, 'Giảm giá bộ sưu tập hè', 'giaso', 'ádsdsa', 'Free_Shipping.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Voucher_img%2FFree_Shipping.png?alt=media&token=5c6f9ab5-6c34-49c7-ae7b-42fc1a16df81', 50000, 10000, 0, '0000-00-00', '0000-00-00'),
(15, 'Giảm giá bộ sưu tập hè', NULL, 'adấdsada', '', '', NULL, NULL, 0, '2021-08-20', '2021-08-27'),
(17, 'Giảm giá bộ sưu tập hè', NULL, 'sadsađá', '', '', NULL, NULL, 0, '2021-08-20', '2021-08-21'),
(18, 'Giảm giá bộ sưu tập hè', NULL, 'sađasad', '', '', NULL, NULL, 0, '2021-08-20', '2021-08-21'),
(19, 'Giảm giá bộ sưu tập hè', NULL, 'ađâsdá', '', '', NULL, NULL, 0, '2021-08-20', '2021-08-21'),
(20, 'Giảm giá bộ sưu tập hè', NULL, 'đâsdá', '', '', NULL, NULL, 0, '2021-08-20', '2021-08-21'),
(21, 'Giảm giá bộ sưu tập hè', NULL, 'ađâsdá', '', '', NULL, NULL, 0, '2021-08-20', '2021-08-21'),
(22, 'Giảm giá bộ sưu tập hè', NULL, 'đâsđâs', '', '', NULL, NULL, 0, '2021-08-20', '2021-08-21'),
(23, 'Giảm giá bộ sưu tập hè', NULL, 'đâsđâs', '', '', NULL, NULL, 0, '2021-08-20', '2021-08-21'),
(24, 'Giảm giá bộ sưu tập hè', NULL, 'đasadá', '', '', NULL, NULL, 0, '2021-08-20', '2021-08-21'),
(25, 'Giảm giá bộ sưu tập hè', NULL, 'đâsdá', '', '', NULL, NULL, 0, '2021-08-20', '2021-08-21'),
(26, 'Giảm giá bộ sưu tập hè', NULL, 'đâsđá', '', '', NULL, NULL, 0, '2021-08-20', '2021-08-21'),
(27, 'Giảm giá bộ sưu tập hè', NULL, 'ađâsdá', '', '', NULL, NULL, 0, '2021-08-20', '2021-08-21'),
(28, 'Giảm giá bộ sưu tập hè', NULL, 'đâsđâsđâs', '', '', NULL, NULL, 0, '2021-08-20', '2021-08-21'),
(29, 'Giảm giá bộ sưu tập hè', NULL, 'dâsdsadsadá', '', '', NULL, NULL, 0, '2021-08-20', '2021-08-21');

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
('ak', 'ÁO KHOÁC', '', '', 'DMA', 1),
('asm', 'ÁO SƠ MI', '', '', 'DMA', 1),
('at', 'ÁO THUN', 'slider_aothun.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductType_Img%2Fslider_aothun.jpg?alt=media&token=79f66a44-fdf1-45ea-bccd-d663e96f208b', 'DMA', 1),
('qj', 'QUẦN JEAN', '', '', 'DMQ', 1),
('qk', 'QUẦN KAKI', '', '', 'DMQ', 1),
('qs', 'QUẦN SHORT', '', '', 'DMQ', 1),
('qt', 'QUẦN TÂY', '', '', 'DMQ', 1),
('tl', 'THẮT LƯNG', '', '', 'DMPK', 1),
('tui', 'Túii', '', '', 'DMB', 1),
('vo', 'VỚ', '', '', 'DMPK', 1);

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
('ym', 'Yamee', 'Việt Nam', 1),
('zz', 'OK', 'Việt Nam', 1),
('zzz', 'OKK', 'Việt Namm', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `masp` int(10) NOT NULL,
  `tensp` varchar(100) NOT NULL,
  `gia` int(10) NOT NULL,
  `chitiet` longtext NOT NULL,
  `tenhinh` varchar(100) NOT NULL,
  `hinh` varchar(1000) NOT NULL,
  `tenhinhct` varchar(100) DEFAULT NULL,
  `hinhchitiet` varchar(2000) DEFAULT NULL,
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
(126, 'Áo thun ADIDAS', 200000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":\"20\",\"giagiam\":\"0\"},{\"id\":3,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":\"10\",\"giagiam\":\"0\"},{\"id\":4,\"size\":\"M\",\"mau\":\"trắng\",\"soluong\":\"20\",\"giagiam\":\"0\"},{\"id\":5,\"size\":\"L\",\"mau\":\"trắng\",\"soluong\":\"20\",\"giagiam\":\"0\"}]', 'adidasTrang.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FadidasTrang.jpg?alt=media&token=ca8cab95-0f4b-435d-99db-448a853299a3', NULL, NULL, NULL, '2021-08-03 13:49:35', 0, 'ad', 'at', 'DMA'),
(127, 'Áo thun PEANUTS', 200000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":\"20\",\"giagiam\":\"0\"},{\"id\":2,\"size\":\"M\",\"mau\":\"trắng\",\"soluong\":\"20\",\"giagiam\":\"0\"},{\"id\":3,\"size\":\"L\",\"mau\":\"trắng\",\"soluong\":\"20\",\"giagiam\":\"0\"}]', 'nomousPNuts.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FnomousPNuts.jpg?alt=media&token=f23808f9-3f63-4957-8306-d41cc8a9fc98', NULL, NULL, NULL, '2021-08-03 13:51:41', 1, 'nm', 'at', 'DMA'),
(128, 'Áo khoác Denim Black', 400000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":\"20\",\"giagiam\":\"0\"},{\"id\":2,\"size\":\"M\",\"mau\":\"trắng\",\"soluong\":\"20\",\"giagiam\":\"0\"}]', 'Denim-Black.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FDenim-Black.jpg?alt=media&token=f44b23d5-d831-47d9-9c43-3c118517eca3', NULL, NULL, 'Những chiếc áo khoác Jean với phong cách bụi bặm, cool ngầu dễ dàng phối ngẫu hứng mỗi ngày với những items cơ bản. Có thể nói chiếc áo khoác này là món đồ hông thể thiếu trong tủ đồ của mình luôn. Nếu có rồi thì mua thêm chiếc nữa cho tủ đồ thật đa dạng nghen', '2021-08-22 10:17:26', 1, 'bt', 'ak', 'DMA'),
(129, 'Áo sơ mi Carp Shirt', 200000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"trắng\",\"soluong\":\"10\",\"giagiam\":\"0\"},{\"id\":2,\"size\":\"M\",\"mau\":\"trắng\",\"soluong\":\"10\",\"giagiam\":\"0\"}]', 'boutonCarp.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FboutonCarp.jpg?alt=media&token=a8948fac-63d6-4db3-a8dd-ef8e8f5063bb', NULL, NULL, 'Chiếc áo đầy tiện lợi, Mỗi lần có công chiện đi học, đi làm, đi phỏng vấn thì phải sọt lẹ chiếc sơ mi cho lịch sự phải hông. Không chỉ đi công chiện thôi đâu, đi chơi hay hẹn hò ẻm cũng đáp ứng luôn, quá tiện lợi sắm ngay 1 em thôi !', '2021-08-22 11:26:07', 1, 'bt', 'asm', 'DMA'),
(130, 'Áo sơ mi CaroBlue Shirt', 250000, '[{\"id\":1,\"size\":\"S\",\"mau\":\"đen\",\"soluong\":\"10\",\"giagiam\":\"0\"},{\"id\":2,\"size\":\"M\",\"mau\":\"đen\",\"soluong\":\"10\",\"giagiam\":\"0\"}]', 'CaroBlue-Corduroy.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FCaroBlue-Corduroy.jpg?alt=media&token=2f45b15d-b7d9-4642-941b-c7be2eb13b47', NULL, NULL, 'Chiếc áo đầy tiện lợi, Mỗi lần có công chiện đi học, đi làm, đi phỏng vấn thì phải sọt lẹ chiếc sơ mi cho lịch sự phải hông. Không chỉ đi công chiện thôi đâu, đi chơi hay hẹn hò ẻm cũng đáp ứng luôn, quá tiện lợi sắm ngay 1 em thôi !', '2021-08-22 11:27:26', 1, 'dk', 'asm', 'DMA');

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
  MODIFY `mabl` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `chitietbl`
--
ALTER TABLE `chitietbl`
  MODIFY `mact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `chitietdh`
--
ALTER TABLE `chitietdh`
  MODIFY `mact` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `chitietkm`
--
ALTER TABLE `chitietkm`
  MODIFY `mact` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `donhang`
--
ALTER TABLE `donhang`
  MODIFY `madonhang` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `giohang`
--
ALTER TABLE `giohang`
  MODIFY `magiohang` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `makh` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  MODIFY `makm` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `masp` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

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

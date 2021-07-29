-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2021 at 06:01 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

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
(17, 'tam@gmail.com', '$2b$10$b1Drfz6VH0Ot2Y4hYXs4ge7YvrEgNhS3YqF/Ig3F/UGa5GmQi8YE2', 'Bad Boy', '', 'undefined', '180 Cao Lỗ, P4, Quận 8', '0906060606', 'NVGH', 1),
(18, 'phuong@gmail.com', '$2b$10$KUcP56TrcoWnf6nW.o6nY.H8oj7agrZLUwbzTYZcFZSkKF020MXCO', 'Hoàng Phương', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FuserICON.png?alt=media&token=b64576ab-18b6-4d7a-9864-c15f59d5717c&fbclid=IwAR2HhoURE-FDaY0FUpVkWgZS0Hc7-obK_B3rwSepgPe8cdyZFf94bBdWZ8c', '233 Vĩnh Viễn, Phường 04, Quận 10 ', '0909666555', 'Admin', 1),
(19, 'letrinhan1509@gmail.com', '$2b$10$7jWUVsiSTkpiLV9mcI9pi.agZVONyg.U.mDAK401txS16bMmG2olu', 'Trí Nhân', '', 'undefined', 'Đường Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, TP Hồ Chí Minh', '0969362915', 'Admin', 0),
(20, 'boylanhlung@gmail.com', '$2b$10$2//.NynC70K/ugtZsJlAVumz1V0f9XvrsK8UW7DTxCA/NOwcvFfBS', 'Bad Boy', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2Fuser.png?alt=media&token=6ec247df-90ab-4cc9-b671-7261ef37215f&fbclid=IwAR2WTfoELEQhDxDpM3qKj0XcNtFNZyR1_5AYxYWNWpzzoIsuOWOIOqH9K9k', '180 Cao Lỗ', '0909686868', 'NVBH', 1);

-- --------------------------------------------------------

--
-- Table structure for table `bang_size`
--

CREATE TABLE `bang_size` (
  `masize` varchar(10) NOT NULL,
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
('maL', 'L', 'Nam', 66, 70, 170, 174),
('maM', 'M', 'Nam', 60, 65, 165, 169),
('mamm', 'M', 'Nữ', 43, 46, 153, 155),
('maS', 'S', 'Nam', 55, 60, 160, 164),
('mass', 'S', 'Nữ', 38, 43, 148, 153);

-- --------------------------------------------------------

--
-- Table structure for table `binhluan`
--

CREATE TABLE `binhluan` (
  `mabl` int(10) NOT NULL,
  `masp` int(10) NOT NULL,
  `makh` int(10) NOT NULL,
  `noidung` varchar(2000) NOT NULL,
  `giobl` time NOT NULL,
  `ngaybl` date NOT NULL,
  `trangthai` int(10) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `binhluan`
--

INSERT INTO `binhluan` (`mabl`, `masp`, `makh`, `noidung`, `giobl`, `ngaybl`, `trangthai`) VALUES
(7, 113, 7, 'Sản phẩm rất ok', '12:13:11', '2021-11-06', 1),
(8, 110, 7, 'Xin lỗi bà chị à', '19:24:31', '2021-07-13', 1),
(9, 110, 7, 'Nói cho bà chị nghe', '19:30:04', '2021-07-13', 1),
(10, 110, 10, 'Sao vậy bà chị', '22:55:44', '2021-07-17', 1);

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

-- --------------------------------------------------------

--
-- Table structure for table `chitietdh`
--

CREATE TABLE `chitietdh` (
  `mact` int(10) NOT NULL,
  `masp` int(10) NOT NULL,
  `size` varchar(10) DEFAULT NULL,
  `mau` varchar(10) DEFAULT NULL,
  `gia` int(10) NOT NULL,
  `giagiam` int(10) DEFAULT 0,
  `soluong` int(11) NOT NULL,
  `thanhtien` int(10) NOT NULL DEFAULT 0,
  `madonhang` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `chitietdm`
--

CREATE TABLE `chitietdm` (
  `mactdm` int(10) NOT NULL,
  `madm` varchar(50) NOT NULL,
  `masp` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chitietdm`
--

INSERT INTO `chitietdm` (`mactdm`, `madm`, `masp`) VALUES
(11, 'DMA', 110),
(13, 'DMA', 112),
(14, 'DMA', 113);

-- --------------------------------------------------------

--
-- Table structure for table `chitietkm`
--

CREATE TABLE `chitietkm` (
  `mact` int(10) NOT NULL,
  `masp` int(10) NOT NULL,
  `chietkhau` int(10) NOT NULL DEFAULT 10,
  `giakm` int(10) NOT NULL DEFAULT 0,
  `makm` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chitietkm`
--

INSERT INTO `chitietkm` (`mact`, `masp`, `chietkhau`, `giakm`, `makm`) VALUES
(2, 110, 20, 8000, 7),
(3, 111, 20, 16000, 7),
(4, 112, 30, 21000, 7),
(6, 112, 30, 21000, 8);

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
('DMB', 'Balo-Túi', '', '', 1),
('DMD', 'Dép', '', '', 1),
('DMG', 'Giày', '', '', 1),
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
  `makh` int(10) DEFAULT NULL,
  `tenkh` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `sodienthoai` int(10) NOT NULL,
  `diachi` varchar(100) NOT NULL,
  `tienship` int(10) NOT NULL,
  `tongtien` int(10) NOT NULL DEFAULT 0,
  `ghichu` varchar(150) DEFAULT NULL,
  `makm` int(10) DEFAULT NULL,
  `hinhthuc` varchar(50) NOT NULL,
  `vanchuyen` varchar(50) NOT NULL,
  `ngaydat` date DEFAULT NULL,
  `ngaygiao` date DEFAULT NULL,
  `trangthai` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `giohang`
--

CREATE TABLE `giohang` (
  `magiohang` int(10) NOT NULL,
  `makh` int(10) NOT NULL,
  `masp` int(10) NOT NULL,
  `gia` int(10) NOT NULL,
  `giagiam` int(10) DEFAULT 0,
  `soluong` int(11) NOT NULL,
  `thanhtien` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `makh` int(10) NOT NULL,
  `tenkh` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `matkhau` varchar(100) NOT NULL,
  `tenhinh` varchar(100) NOT NULL,
  `hinh` varchar(250) DEFAULT NULL,
  `sodienthoai` int(10) NOT NULL,
  `diachi` varchar(200) NOT NULL,
  `trangthai` int(2) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`makh`, `tenkh`, `email`, `matkhau`, `tenhinh`, `hinh`, `sodienthoai`, `diachi`, `trangthai`) VALUES
(1, 'Nguyễn Văn Nhất', 'nvn@gmail.com', '123456', '', NULL, 69741120, '15 HTK p5 q8', 1),
(2, 'Đông Văn Hưng', 'dvh@gmail.com', '123456', '', NULL, 69743365, '15 afg q6 q8', 0),
(3, 'Phan Thiện Nghĩa', 'ptn@gmail.com', '123456', '', NULL, 9575333, '156 acf p5 q8', 0),
(4, 'Lê Trí Nhân', 'nhan@gmail.com', '123456789', '', NULL, 69741120, '180 Cao Lỗ', 1),
(5, 'Nhật Hào', 'hao@gmail.com', '123456@^!^@', '', NULL, 909666555, '182 Cao Lỗ', 1),
(6, 'Bad Boy', 'phuong@gmail.com', '123456789', '', NULL, 906060606, '180 Cao Lỗ, P4', 1),
(7, 'Trí Nhân', 'letrinhan1509@gmail.com', '$2b$10$bmoZ2SnYw.Bf34Tgt2/Md./j2XSNpBPE.nwkspWMvl8ofkITCY6a.', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2Fuser.png?alt=media&token=6ec247df-90ab-4cc9-b671-7261ef37215f&fbclid=IwAR2Xkjho5Cq5BUR40AYdPAqSj50dW5jIdYzf2-3rbmlq6Ij31iT64AMAQsw', 969362915, '178 Cao Lỗ, Phường 04', 1),
(8, 'Nhân', 'letrinhan54321@gmail.com', '$2b$10$KvhroYwNu2J4wpn3ytLREOZ/1cdzx65UZA3bbeEhPGnpAJc0BU9hO', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2Fuser.png?alt=media&token=6ec247df-90ab-4cc9-b671-7261ef37215f&fbclid=IwAR2Xkjho5Cq5BUR40AYdPAqSj50dW5jIdYzf2-3rbmlq6Ij31iT64AMAQsw', 909686868, '180 Cao Lỗ', 1),
(9, 'Nemo', 'thhphuong2607@gmail.com', '$2b$10$AP/zgTS7AJzD7KUGUiI6WedQ2rFOyj2hWK/zsWB.cj/SPoT0sfXne', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FuserICON.png?alt=media&token=b64576ab-18b6-4d7a-9864-c15f59d5717c&fbclid=IwAR2HhoURE-FDaY0FUpVkWgZS0Hc7-obK_B3rwSepgPe8cdyZFf94bBdWZ8c', 932550587, '233/15 Vĩnh Viễn', 1),
(10, 'Nhật Hào', 'letrinhan15099@gmail.com', '$2b$10$fq4JuU8B7Mb0h0l9vnMBze1aBXBwMjnfISYZnAj6662PQvBE5a2re', 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2Fuser.png?alt=media&token=6ec247df-90ab-4cc9-b671-7261ef37215f&fbclid=IwAR2Xkjho5Cq5BUR40AYdPAqSj50dW5jIdYzf2-3rbmlq6Ij31iT64AMAQsw', 969362915, '178 Cao Lỗ, Phường 4, Quận 08, Tp.HCM', 1);

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
  `ngaybd` date NOT NULL,
  `ngaykt` date DEFAULT NULL,
  `trangthai` int(10) DEFAULT 1 COMMENT '0: Ẩn -\r\n1: Hiện'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `khuyenmai`
--

INSERT INTO `khuyenmai` (`makm`, `tenkm`, `voucher`, `ghichu`, `tenhinh`, `hinh`, `dieukien`, `giagiam`, `ngaybd`, `ngaykt`, `trangthai`) VALUES
(1, 'Miễn phí vận chuyển', 'FREESHIP', 'Shop đang có chương trình khuyến khích khách hàng mua hàng online nên shop sẽ hỗ trợ miễn phí vận chuyển cho đơn hàng trên 80.000đ. Cùng chung tay chống dịch. Cảm ơn khách hàng đã xem', '', '', 80000, 20000, '2021-07-03', '2021-07-09', 1),
(2, 'Hỗ trợ khách hàng mùa dịch', 'AUTUMN30', 'Giảm giá cho tất cả đơn hàng mua hàng online với tổng đơn hàng trên 150.000đ. Cảm ơn khách hàng đã ủng hộ shop <3 !!!', '', '', 10000, 3000, '2021-07-03', '2021-07-05', 1),
(3, 'Cùng autumn shop chung tay chống dịch!', 'COVID19', 'Mỗi đơn hàng mua online với tổng đơn hàng trên 200.000đ quý vị sẽ được giảm 30.000đ trên mỗi đơn hàng.', '', '', 200000, 30000, '2021-07-23', '2021-07-24', 1),
(4, 'Giảm giá sốc khi mua hàng online trong mùa dịch', 'GIASOC', 'Khi quý vị mua hàng với đơn hàng trên 150.000đ thì quý vị sẽ được giảm 50.000đ trên tổng đơn hàng.', '', 'undefined', 150000, 60000, '2021-07-23', '2021-07-24', 1),
(7, 'Giảm giá bộ sưu tập hè', NULL, 'Giảm giá toàn bộ các sản phẩm có trong bộ sưu tập hè.', '', '', NULL, NULL, '2021-05-07', '2021-08-07', 1),
(8, 'Mua online giá sốc', NULL, 'Khuyến mãi giá sốc chỉ có trong hôm nay', '', '', NULL, NULL, '2021-06-07', '2021-07-07', 1),
(9, 'Giảm giá bộ sưu tập hè', NULL, 'Giá cực tốt khi mua online', '', '', NULL, NULL, '2021-07-23', '2021-07-25', 0),
(12, 'Giảm giá bộ sưu tập hè', 'giaso', 'ádsdsa', 'Free_Shipping.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Voucher_img%2FFree_Shipping.png?alt=media&token=5c6f9ab5-6c34-49c7-ae7b-42fc1a16df81', 50000, 10000, '0000-00-00', '0000-00-00', 1);

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
('aaaa', 'Ok', 'slider_aothun.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductType_Img%2Fslider_aothun.jpg?alt=media&token=941cc401-c063-4b0b-b31c-afa8af809c53', 'DMB', 1),
('ak', 'ÁO KHOÁC', '', '', 'DMA', 1),
('asm', 'ÁO SƠ MI', '', '', 'DMA', 1),
('at', 'ÁO THUN', 'slider_aothun.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/ProductType_Img%2Fslider_aothun.jpg?alt=media&token=79f66a44-fdf1-45ea-bccd-d663e96f208b', 'DMA', 1),
('bl', 'BALO - TÚI SÁCH', '', '', 'DMB', 1),
('dep', 'DÉP', '', '', 'DMD', 1),
('giay', 'GIÀY', '', '', 'DMG', 1),
('no', 'NÓN', '', '', 'DMPK', 1),
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
('zzz', 'OKK', 'Việt Namm', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `masp` int(10) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `tensp` varchar(100) NOT NULL,
  `soluong` int(10) NOT NULL DEFAULT 1,
  `size` varchar(10) NOT NULL,
  `mau` varchar(30) NOT NULL,
  `gia` int(10) NOT NULL,
  `tenhinh` varchar(100) NOT NULL,
  `hinh` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `hinhchitiet` varchar(2000) DEFAULT NULL,
  `mota` varchar(4000) DEFAULT NULL,
  `ngaytao` datetime NOT NULL DEFAULT current_timestamp(),
  `trangthai` int(10) NOT NULL DEFAULT 1,
  `mansx` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `maloai` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `madm` varchar(50) NOT NULL,
  `chitiet` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`masp`, `code`, `tensp`, `soluong`, `size`, `mau`, `gia`, `tenhinh`, `hinh`, `hinhchitiet`, `mota`, `ngaytao`, `trangthai`, `mansx`, `maloai`, `madm`, `chitiet`) VALUES
(110, 'SPAT01', 'Áo thun ADIDAS', 9, 'S', 'Trắng', 10000, 'user.png', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FadsTrong.jpg?alt=media&token=6cb18364-d371-4a66-b842-d19fa4567877', NULL, 'Áo được thiết kế trẻ trung.', '2021-07-23 00:00:00', 1, 'ad', 'at', 'DMA', ''),
(111, 'SPAT02B', 'Áo thun ITACHI', 4, 'M', 'Đen', 20000, '', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FnomousItachi.jpg?alt=media&token=ca780496-c03d-4b58-ac23-c24a64f6a1df', NULL, 'Áo được thiết kế trẻ trung.', '2021-07-23 00:00:00', 1, 'nm', 'at', 'DMA', ''),
(112, 'SPAT03G', 'Áo thun GOKU', 8, 'M', 'Trắng', 30000, '', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FbskGOKU.jpg?alt=media&token=28c752c6-fe0e-488b-9c2e-78a6070622b3', NULL, 'đang làm mưa làm gió trong thời gian vừa qua, số lượng có hạn, các bạn nhanh tay đăng kí để sở hữu ngay cho mình chiếc áo cực chất nhé', '2021-07-23 00:00:00', 1, 'bsk', 'at', 'DMA', ''),
(113, 'SPAT01', 'Áo Thun PEANUTS', 10, 'S', 'Xanh', 90000, 'nomousPNuts.jpg', 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Product_Img%2FnomousPNuts.jpg?alt=media&token=495b36b4-dbbd-4ca1-a538-a099719153d3', 'undefined', 'Bạn làm gì để tìm kiếm sự cân bằng? Ngắt mạch và xả hơi? Hay tùy cơ ứng biến? Chiếc áo thun adidas này sẵn sàng cho cả hai phương án. Trên thực tế, chiếc áo này sẵn sàng cho tất cả nhờ chất vải thấm hút ẩm và chất liệu cotton mềm mại đảm bảo sự thoải mái dài lâu. Còn về độ co giãn? Cũng có một chút, để áo càng thêm phần thoải mái.', '2021-07-23 17:00:00', 1, 'nm', 'at', 'DMA', '');

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
-- Indexes for table `chitietdm`
--
ALTER TABLE `chitietdm`
  ADD PRIMARY KEY (`mactdm`),
  ADD KEY `dm-sanpham_ibfk_1` (`madm`),
  ADD KEY `dm-sanpham_ibfk_2` (`masp`);

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
  ADD KEY `donhang_ibfk_4` (`makm`);

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
  MODIFY `manv` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `binhluan`
--
ALTER TABLE `binhluan`
  MODIFY `mabl` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `chitietbl`
--
ALTER TABLE `chitietbl`
  MODIFY `mact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `chitietdh`
--
ALTER TABLE `chitietdh`
  MODIFY `mact` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `chitietdm`
--
ALTER TABLE `chitietdm`
  MODIFY `mactdm` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `chitietkm`
--
ALTER TABLE `chitietkm`
  MODIFY `mact` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `donhang`
--
ALTER TABLE `donhang`
  MODIFY `madonhang` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `giohang`
--
ALTER TABLE `giohang`
  MODIFY `magiohang` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `makh` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  MODIFY `makm` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `masp` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

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
-- Constraints for table `chitietdm`
--
ALTER TABLE `chitietdm`
  ADD CONSTRAINT `chitietdm_ibfk_1` FOREIGN KEY (`madm`) REFERENCES `danhmuc` (`madm`) ON UPDATE CASCADE,
  ADD CONSTRAINT `chitietdm_ibfk_2` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`) ON UPDATE CASCADE;

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

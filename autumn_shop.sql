-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2021 at 07:31 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fashion_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `manv` int(10) NOT NULL,
  `admin` varchar(100) DEFAULT NULL,
  `matkhau` varchar(100) DEFAULT NULL,
  `tennv` varchar(50) NOT NULL,
  `diachi` varchar(100) NOT NULL,
  `sodienthoai` varchar(11) NOT NULL,
  `quyen` varchar(30) NOT NULL,
  `trangthai` int(2) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`manv`, `admin`, `matkhau`, `tennv`, `diachi`, `sodienthoai`, `quyen`, `trangthai`) VALUES
(1, 'admin@gmail.com', '123456', 'Admin', '155 PNT q8', '8498564715', 'Admin', 1),
(3, 'nhhy@gmail.com', '123456', 'Yen Nhan', '15/2 HHH q1', '098547136', '', 1),
(4, 'mhth@gmail.com', '123456', 'Mong Ha Trung Huyen', '11 TTT q11', '0906548444', '', 1),
(5, NULL, NULL, 'Tran Van Ka', '196 TVH q9', '098564123', '', 0),
(6, NULL, NULL, 'Ho Van Cuong', '152 HQL q6', '0965753304', '', 0),
(7, 'nhan@gmail.com', '123456789', 'Trí Nhân', '180 Cao Lỗ, P4, Quận 8', '0909555888', '', 1),
(10, 'hao@gmail.com', '123456@^!^@', 'Hào', '182 Cao Lỗ', '0909666555', '', 1),
(13, 'nguyen@gmail.com', '654321@^!^@', 'Nguyên Bùi', 'Lâm Văn Bền', '0909666555', '', 0),
(14, 'phuong@gmail.com', '123456789', 'Hoàng Phương', '180 Cao Lỗ', '0906333666', '', 1),
(17, 'tam@gmail.com', '$2b$10$cK8MhSwVQoBRSNZiIXUg0OvCryEMlMr6KIokwp7DNniclPkXzY8WC', 'Bad Boy', '180 Cao Lỗ, P4', '0906060606', 'Admin', 1);

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
  `trangthai` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `chitietbl`
--

CREATE TABLE `chitietbl` (
  `mact` int(11) NOT NULL,
  `ma` int(10) NOT NULL,
  `ten` varchar(50) NOT NULL,
  `noidung` varchar(2000) NOT NULL,
  `ngaybl` datetime NOT NULL DEFAULT current_timestamp(),
  `mabl` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `chitietdh`
--

CREATE TABLE `chitietdh` (
  `mact` int(10) NOT NULL,
  `masp` int(10) NOT NULL,
  `gia` int(10) NOT NULL,
  `giagiam` int(10) DEFAULT 0,
  `soluong` int(11) NOT NULL,
  `thanhtien` int(10) NOT NULL DEFAULT 0,
  `makm` int(10) DEFAULT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `danhmuc`
--

CREATE TABLE `danhmuc` (
  `madm` varchar(50) NOT NULL,
  `tendm` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `danhmuc`
--

INSERT INTO `danhmuc` (`madm`, `tendm`) VALUES
('DMA', 'Áo'),
('DMB', 'Balo-Túi'),
('DMD', 'Dép'),
('DMG', 'Giày'),
('DMPK', 'Phụ kiện'),
('DMQ', 'Quần');

-- --------------------------------------------------------

--
-- Table structure for table `donhang`
--

CREATE TABLE `donhang` (
  `madonhang` int(10) NOT NULL,
  `makh` int(10) NOT NULL,
  `tongtien` int(10) NOT NULL DEFAULT 0,
  `makm` int(10) DEFAULT NULL,
  `ngaydat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ngaygiao` date DEFAULT NULL,
  `trangthai` int(11) DEFAULT 0,
  `manv` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `giohang`
--

CREATE TABLE `giohang` (
  `magiohang` int(10) NOT NULL,
  `makh` int(10) NOT NULL,
  `masp` int(10) NOT NULL,
  `hinh` varchar(50) NOT NULL,
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
  `tenkh` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `matkhau` varchar(200) NOT NULL,
  `sodienthoai` varchar(20) NOT NULL,
  `diachi` varchar(100) NOT NULL,
  `trangthai` int(2) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`makh`, `tenkh`, `email`, `matkhau`, `sodienthoai`, `diachi`, `trangthai`) VALUES
(1, 'Nguyễn Văn Nhất', 'nvn@gmail.com', '123456', '069741120', '15 HTK p5 q8', 1),
(2, 'Đông Văn Hưng', 'dvh@gmail.com', '123456', '069743365', '15 afg q6 q8', 0),
(3, 'Phan Thiện Nghĩa', 'ptn@gmail.com', '123456', '09575333', '156 acf p5 q8', 0),
(4, 'Lê Trí Nhân', 'nhan@gmail.com', '123456789', '069741120', '180 Cao Lỗ', 1),
(5, 'Nhật Hào', 'hao@gmail.com', '123456@^!^@', '0909666555', '182 Cao Lỗ', 1),
(6, 'Bad Boy', 'phuong@gmail.com', '123456789', '0906060606', '180 Cao Lỗ, P4', 1);

-- --------------------------------------------------------

--
-- Table structure for table `khuyenmai`
--

CREATE TABLE `khuyenmai` (
  `makm` int(10) NOT NULL,
  `tenkm` varchar(250) NOT NULL,
  `dieukien` varchar(2000) DEFAULT NULL,
  `voucher` tinyint(1) NOT NULL DEFAULT 1,
  `ngaybd` date NOT NULL,
  `ngaykt` date DEFAULT NULL,
  `trangthai` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `loaisp`
--

CREATE TABLE `loaisp` (
  `maloai` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tenloai` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `loaisp`
--

INSERT INTO `loaisp` (`maloai`, `tenloai`) VALUES
('ak', 'ÁO KHOÁC'),
('asm', 'ÁO SƠ MI'),
('at', 'ÁO THUN'),
('bl', 'BALO - TÚI SÁCH'),
('dep', 'DÉP'),
('giay', 'GIÀY'),
('no', 'NÓN'),
('qj', 'QUẦN JEAN'),
('qk', 'QUẦN KAKI'),
('qs', 'QUẦN SHORT'),
('qt', 'QUẦN TÂY'),
('tl', 'THẮT LƯNG'),
('tui', 'Túii'),
('vo', 'VỚ'),
('zzz', 'Zaro');

-- --------------------------------------------------------

--
-- Table structure for table `nhasx`
--

CREATE TABLE `nhasx` (
  `mansx` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tennsx` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `xuatxu` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nhasx`
--

INSERT INTO `nhasx` (`mansx`, `tennsx`, `xuatxu`) VALUES
('ad', 'ADIDAS', 'Đức'),
('bsk', 'BSK', 'Việt Nam'),
('bt', 'BOUTON', 'Việt Nam'),
('dk', 'DICKIES', 'Mỹ'),
('ic', 'ICON', 'Việt Nam'),
('lcs', 'LACOSTE', 'Pháp'),
('mc', 'MASCUS', 'Việt Nam'),
('mlb', 'MLB Korea', 'Hàn Quốc'),
('nba', 'NBA', 'Việt Nam'),
('nk', 'NIKE', 'Mỹ'),
('nm', 'NOMOUS', 'Việt Nam'),
('pm', 'PUMA', 'Đức'),
('sp', 'SUPREME', 'Mỹ'),
('tm', 'T.MAN', 'Việt Nam');

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `masp` int(10) NOT NULL,
  `code` varchar(50) NOT NULL,
  `tensp` varchar(100) NOT NULL,
  `soluong` int(10) NOT NULL DEFAULT 1,
  `size` varchar(10) NOT NULL,
  `mau` varchar(30) NOT NULL,
  `gia` int(10) NOT NULL,
  `hinh` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `hinhchitiet` varchar(50) DEFAULT NULL,
  `mota` varchar(4000) DEFAULT NULL,
  `trangthai` tinyint(1) NOT NULL DEFAULT 1,
  `mansx` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `maloai` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `madm` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `trangthai`
--

CREATE TABLE `trangthai` (
  `tentt` varchar(20) CHARACTER SET utf8 NOT NULL,
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
  ADD KEY `masp` (`masp`),
  ADD KEY `chitietdh_ibfk_3` (`makm`);

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
  ADD KEY `maquyen` (`manv`),
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
  MODIFY `manv` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `binhluan`
--
ALTER TABLE `binhluan`
  MODIFY `mabl` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chitietbl`
--
ALTER TABLE `chitietbl`
  MODIFY `mact` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chitietdh`
--
ALTER TABLE `chitietdh`
  MODIFY `mact` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `chitietdm`
--
ALTER TABLE `chitietdm`
  MODIFY `mactdm` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chitietkm`
--
ALTER TABLE `chitietkm`
  MODIFY `mact` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `donhang`
--
ALTER TABLE `donhang`
  MODIFY `madonhang` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `giohang`
--
ALTER TABLE `giohang`
  MODIFY `magiohang` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `makh` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  MODIFY `makm` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `masp` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

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
  ADD CONSTRAINT `chitietdh_ibfk_2` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`) ON UPDATE CASCADE,
  ADD CONSTRAINT `chitietdh_ibfk_3` FOREIGN KEY (`makm`) REFERENCES `khuyenmai` (`makm`) ON UPDATE CASCADE;

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
  ADD CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`makh`) ON UPDATE CASCADE,
  ADD CONSTRAINT `donhang_ibfk_3` FOREIGN KEY (`manv`) REFERENCES `admin` (`manv`) ON UPDATE CASCADE,
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

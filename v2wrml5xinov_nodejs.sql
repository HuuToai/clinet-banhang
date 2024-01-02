-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th1 02, 2024 lúc 08:58 AM
-- Phiên bản máy phục vụ: 5.7.33-cll-lve
-- Phiên bản PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `v2wrml5xinov_nodejs`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `admin`
--

INSERT INTO `admin` (`id`, `email`, `name`, `password`, `created_at`, `updated_at`, `deletedAt`) VALUES
(3, 'admin@gmail.com', 'Phan Hữu Toại', 'c4ca4238a0b923820dcc509a6f75849b', '2023-12-04 05:00:03', '2023-12-06 15:53:34', NULL),
(4, 'admin2@gmail.com1', 'Toại Phan1', '21232f297a57a5a743894a0e4a801fc3', '2023-12-07 11:09:18', '2023-12-20 11:00:24', '2023-12-20 11:00:46'),
(5, 'admin1234@gmail.com', 'Toại Phan', 'c4ca4238a0b923820dcc509a6f75849b', '2023-12-13 04:31:33', '2023-12-20 11:02:09', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `brands`
--

INSERT INTO `brands` (`id`, `name`, `slug`, `image`, `description`, `status`, `createdBy`, `updatedBy`, `created_at`, `updated_at`, `deletedAt`) VALUES
(1, 'Casio', 'casio', 'image-1703004871087-700722702.png', 'Thương hiệu casio', 1, NULL, NULL, '2023-12-19 23:39:23', '2023-12-19 23:54:31', NULL),
(2, 'Philippe Auguste', 'philippe-auguste', 'image-1703004039634-780036770.png', 'Đồng hồ Nam Philippe Auguste', 1, NULL, NULL, '2023-12-19 23:40:39', '2023-12-19 23:40:39', NULL),
(3, 'Epos Swiss', 'epos-swiss', 'image-1703004087467-468998692.png', 'Đồng hồ Epos Swiss', 1, NULL, NULL, '2023-12-19 23:41:27', '2023-12-19 23:41:27', NULL),
(4, 'Altantic Swiss', 'altantic-swiss', 'image-1703004125610-289293046.png', 'Đồng hồ Altantic Swiss', 1, NULL, NULL, '2023-12-19 23:42:05', '2023-12-19 23:42:05', NULL),
(5, 'Diamond D', 'diamond-d', 'image-1703004184035-893529038.png', 'Đồng hồ nữ Diamond D', 1, NULL, NULL, '2023-12-19 23:43:04', '2023-12-19 23:43:04', NULL),
(6, 'Jacques Lemans', 'jacques-lemans', 'image-1703004217527-871188455.png', 'Đồng hồ Jacques Lemans', 1, NULL, NULL, '2023-12-19 23:43:37', '2023-12-19 23:43:37', NULL),
(7, 'Citizen', 'citizen', 'image-1703004315002-997659775.png', 'Đồng hồ Citizen Nhật', 1, NULL, NULL, '2023-12-19 23:45:15', '2023-12-19 23:45:15', NULL),
(8, 'Q&Q', 'qandq', 'image-1703004365083-340327795.png', 'Đồng hồ Q&Q', 1, NULL, NULL, '2023-12-19 23:46:05', '2023-12-19 23:46:05', NULL),
(9, 'Aries Gold', 'aries-gold', 'image-1703004425340-86830943.png', 'Đồng hồ Aries Gold', 1, NULL, NULL, '2023-12-19 23:47:05', '2023-12-19 23:47:05', NULL),
(10, 'Stuhrling', 'stuhrling', 'image-1703004458741-403827208.jpg', 'Đồng hồ Stuhrling', 1, NULL, NULL, '2023-12-19 23:47:38', '2023-12-19 23:47:38', NULL),
(11, 'Orient', 'orient', 'image-1703004547771-31633791.png', 'Đồng hồ Orient', 1, NULL, NULL, '2023-12-19 23:49:07', '2023-12-19 23:49:07', NULL),
(12, 'Seiko', 'seiko', 'image-1703004589851-609738106.png', 'Đồng hồ Seiko', 1, NULL, NULL, '2023-12-19 23:49:49', '2023-12-19 23:49:49', NULL),
(13, ' Olympia Star', 'olympia-star', 'image-1703004631087-975835494.png', 'Đồng hồ Olympia Star', 1, NULL, NULL, '2023-12-19 23:50:31', '2023-12-19 23:50:31', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `image`, `description`, `status`, `createdBy`, `updatedBy`, `created_at`, `updated_at`, `deletedAt`) VALUES
(1, 'Đồng Hồ Nam', 'dong-ho-nam', 'image-1703004778732-390947826.png', 'Đồng hồ dành cho nam giới', 1, NULL, NULL, '2023-12-19 23:52:58', '2023-12-19 23:52:58', NULL),
(2, 'Đồng Hồ Nữ', 'dong-ho-nu', 'image-1703004817938-778270260.jpg', 'Đồng hồ dành cho nữ', 1, NULL, NULL, '2023-12-19 23:53:37', '2023-12-19 23:53:37', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detail_orders`
--

CREATE TABLE `detail_orders` (
  `id` int(11) NOT NULL,
  `order_code` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `price` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `orderid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `detail_orders`
--

INSERT INTO `detail_orders` (`id`, `order_code`, `product_id`, `quantity`, `price`, `created_at`, `updated_at`, `deletedAt`, `orderid`) VALUES
(1, 'p7orib', 1, 3, 3176100, '2023-12-21 10:34:59', '2023-12-21 10:34:59', NULL, 0),
(2, 'ishw5n', 2, 3, 3176100, '2023-12-21 11:03:55', '2023-12-21 11:03:55', NULL, 0),
(3, 'ishw5n', 1, 1, 3176100, '2023-12-21 11:26:15', '2023-12-21 11:26:15', NULL, 0),
(4, 'ishw5n', 3, 2, 2465100, '2023-12-21 22:53:34', '2023-12-21 22:53:34', NULL, 0),
(5, 'ishw5n', 18, 3, 3411000, '2023-12-21 22:53:34', '2023-12-21 22:53:34', NULL, 0),
(6, 'ishw5n', 19, 1, 4131000, '2023-12-21 22:53:34', '2023-12-21 22:53:34', NULL, 0),
(7, 'ishw5n', 3, 3, 10465100, '2023-12-21 23:04:49', '2023-12-21 23:04:49', NULL, 0),
(8, 'p7orib', 7, 3, 2709000, '2023-12-25 11:07:51', '2023-12-25 11:07:51', NULL, 0),
(9, 'p7orib', 2, 3, 3176100, '2023-12-25 11:07:51', '2023-12-25 11:07:51', NULL, 0),
(10, 'p7orib', 3, 2, 2465100, '2023-12-25 11:28:06', '2023-12-25 11:28:06', NULL, 0),
(11, 'ishw5n', 2, 2, 3176100, '2023-12-25 11:38:51', '2023-12-25 11:38:51', NULL, 0),
(12, 'ishw5n', 5, 1, 1110600, '2023-12-25 11:38:51', '2023-12-25 11:38:51', NULL, 0),
(13, 'ishw5n', 1, 1, 3176100, '2023-12-25 11:38:51', '2023-12-25 11:38:51', NULL, 0),
(14, 'p7orib', 2, 1, 3176100, '2023-12-25 11:54:16', '2023-12-25 11:54:16', NULL, 10),
(15, 'p7orib', 3, 1, 2465100, '2023-12-25 11:54:16', '2023-12-25 11:54:16', NULL, 10),
(16, 'ishw5n', 27, 1, 68400000, '2023-12-29 10:35:07', '2023-12-29 10:35:07', NULL, 11),
(17, 'ishw5n', 3, 3, 2465100, '2023-12-29 10:35:07', '2023-12-29 10:35:07', NULL, 11);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_code` varchar(255) NOT NULL,
  `shipping_id` int(11) NOT NULL,
  `status` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `order_code`, `shipping_id`, `status`, `created_at`, `updated_at`, `deletedAt`) VALUES
(3, 'ishw5n', 3, 3, '2023-12-21 11:26:15', '2023-12-22 09:56:15', NULL),
(5, 'ishw5n', 5, 3, '2023-12-21 22:53:34', '2023-12-25 11:05:42', NULL),
(6, 'ishw5n', 6, 3, '2023-12-21 23:04:49', '2023-12-25 11:05:45', NULL),
(7, 'p7orib', 7, 1, '2023-12-25 11:07:51', '2023-12-25 11:07:51', NULL),
(8, 'p7orib', 8, 3, '2023-12-25 11:28:06', '2023-12-25 11:32:39', NULL),
(9, 'ishw5n', 9, 1, '2023-12-25 11:38:51', '2023-12-25 11:38:51', NULL),
(10, 'p7orib', 10, 3, '2023-12-25 11:54:16', '2023-12-25 12:01:57', NULL),
(11, 'ishw5n', 11, 1, '2023-12-29 10:35:07', '2023-12-29 10:35:07', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_code` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price_in` float DEFAULT NULL,
  `price` float DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `sold` int(11) DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `image`, `description`, `price_in`, `price`, `category_id`, `brand_id`, `quantity`, `sold`, `status`, `createdBy`, `updatedBy`, `created_at`, `updated_at`, `deletedAt`) VALUES
(1, 'Casio EFV-550D-2AVUDF – Nam – Quartz (Pin) - Size mặt 47 mm', 'casio-efv-550d-2avudf-nam-quartz-pin-size-mat-47-mm', 'image-1703004969453-988898818.jpg', 'Thông số kỹ thuật Đồng hồ Casio:\r\n\r\nVật liệu vỏ / gờ: Thép không gỉ\r\nChốt gập 3 chỉ với một lần bấm\r\nDây đeo bằng thép không gỉ\r\nMặt kính khoáng\r\nNắp sau khóa bằng vít\r\nKhả năng chống nước ở độ sâu 100 mét\r\nĐồng hồ bấm giờ 1/10 giây\r\nKhả năng đo: 59\'59.9\'', 2000000, 3176100, 1, 1, 89, 11, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-19 23:56:09', '2023-12-25 11:38:51', NULL),
(2, 'Casio Nam CA-EFV-570D-7AVUDF', 'casio-nam-ca-efv-570d-7avudf', 'image-1703005042682-582392795.jpg', 'Thiết kế hiện đại, mang phong cách lịch lãm dành cho các bạn nam mạnh mẽ\r\nChiếc đồng hồ nam Edifice Casio EFV-570D-7AVUDF thuộc dòng đồng hồ Edifice Casio của hãng Casio đến từ đất nước Nhật Bản ', 2176100, 3176100, 1, 1, 35, 15, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-19 23:57:22', '2023-12-25 11:54:16', NULL),
(3, 'Đồng hồ Casio CA-MTS-110D-7AVDF', 'dong-ho-casio-ca-mts-110d-7avdf', 'image-1703005099370-589240670.jpg', 'Đường kính mặt: 38.8mm\r\nChống nước: 5ATM\r\nChất liệu mặt kính: Sapphire\r\nBộ máy: Quartz (Pin) ', 1456000, 2465100, 1, 1, 85, 15, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-19 23:58:19', '2023-12-29 10:35:07', NULL),
(4, 'Đồng hồ Casio CA-MTS-110D-2AVDF', 'dong-ho-casio-ca-mts-110d-2avdf', 'image-1703005157373-9809375.jpg', 'Thông số kỹ thuật của Đồng hồ Casio CA-MTS-110D-2AVDF\r\nĐường kính mặt\r\n\r\n38.8mm\r\n\r\nChống nước\r\n\r\n5ATM\r\n\r\nChất liệu mặt\r\n\r\nKính cường lực\r\n\r\nNăng lượng sử dụng\r\n\r\nQuartz (Pin)\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nChất liệu vỏ\r\n\r\nKiểu dáng\r\n\r\nĐồng hồ nam\r\n\r\nXuất', 1542130, 2465100, 1, 1, 99, 1, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-19 23:59:17', '2023-12-21 09:52:32', NULL),
(5, 'Đồng hồ Casio CA-MTP-V002G-7B2UDF', 'dong-ho-casio-ca-mtp-v002g-7b2udf', 'image-1703005209910-722935698.jpg', 'Thông số kỹ thuật của Đồng hồ Casio CA-MTP-V002G-7B2UDF\r\nĐường kính mặt\r\n\r\n38mm\r\n\r\nChống nước\r\n\r\n3ATM\r\n\r\nChất liệu mặt\r\n\r\nKính khoáng\r\n\r\nNăng lượng sử dụng\r\n\r\nQuartz (Pin)\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nChất liệu vỏ\r\n\r\nKiểu dáng\r\n\r\nĐồng hồ nam\r\n\r\nXuất xứ', 890000, 1110600, 1, 1, 198, 2, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 00:00:09', '2023-12-25 11:38:51', NULL),
(6, 'Đồng hồ Casio CA-MTP-E320D-9EVDF', 'dong-ho-casio-ca-mtp-e320d-9evdf', 'image-1703005265506-641580358.png', 'Thông số kỹ thuật của Đồng hồ Casio CA-MTP-E320D-9EVDF\r\nĐường kính mặt\r\n\r\n40mm\r\n\r\nChống nước\r\n\r\n5ATM\r\n\r\nChất liệu mặt\r\n\r\nKính khoáng\r\n\r\nNăng lượng sử dụng\r\n\r\nQuartz (Pin)\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nChất liệu vỏ\r\n\r\nKiểu dáng\r\n\r\nĐồng hồ nam\r\n\r\nXuất xứ\r', 1643120, 2620800, 1, 1, 123, 0, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 00:01:05', '2023-12-20 09:31:20', NULL),
(7, 'Đồng hồ Casio CA-MTP-E204D-1AVDF', 'dong-ho-casio-ca-mtp-e204d-1avdf', 'image-1703005320459-888078093.jpg', 'Thông số kỹ thuật của Đồng hồ Casio CA-MTP-E204D-1AVDF\r\nĐường kính mặt\r\n\r\n46.8mm\r\n\r\nChống nước\r\n\r\n5ATM\r\n\r\nChất liệu mặt\r\n\r\nKính khoáng\r\n\r\nNăng lượng sử dụng\r\n\r\nQuartz (Pin)\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nChất liệu vỏ\r\n\r\nKiểu dáng\r\n\r\nĐồng hồ nam\r\n\r\nXuất x', 1894230, 2709000, 1, 1, 115, 8, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 00:02:00', '2023-12-25 11:07:51', NULL),
(8, 'Đồng hồ Casio CA-MTP-1335D-7AVDF', 'dong-ho-casio-ca-mtp-1335d-7avdf', 'image-1703005369978-476074367.jpg', 'Thông số kỹ thuật của Đồng hồ Casio CA-MTP-1335D-7AVDF\r\nĐường kính mặt\r\n\r\n38\r\n\r\nChống nước\r\n\r\n5ATM\r\n\r\nChất liệu mặt\r\n\r\nKính khoáng\r\n\r\nNăng lượng sử dụng\r\n\r\nQuartz (Pin)\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nChất liệu vỏ\r\n\r\nKiểu dáng\r\n\r\nĐồng hồ nam\r\n\r\nXuất xứ\r\n\r', 1234310, 1287900, 1, 1, 1234, 0, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 00:02:49', '2023-12-20 09:31:29', NULL),
(9, 'Đồng hồ Casio CA-MTP-1335D-1AVDF', 'dong-ho-casio-ca-mtp-1335d-1avdf', 'image-1703005438207-200124104.jpg', 'Thông số kỹ thuật của Đồng hồ Casio CA-MTP-1335D-1AVDF\r\nĐường kính mặt\r\n\r\n\r\nChống nước\r\n\r\n5ATM\r\n\r\nChất liệu mặt\r\n\r\nKính khoáng\r\n\r\nNăng lượng sử dụng\r\n\r\nQuartz (Pin)\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nChất liệu vỏ\r\n\r\nKiểu dáng\r\n\r\nĐồng hồ nam\r\n\r\nXuất xứ\r\n\r\nChế', 1000000, 1287900, 1, 1, 100, 0, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 00:03:58', '2023-12-20 09:31:33', NULL),
(10, 'Đồng hồ Seiko SK-SNKA01K1S', 'dong-ho-seiko-sk-snka01k1s', 'image-1703036439532-647410771.jpg', 'Thông số kỹ thuật của Đồng hồ Seiko SK-SNKA01K1S\r\nĐường kính mặt\r\n\r\n37 mm\r\n\r\nChống nước\r\n\r\n3 ATM\r\n\r\nChất liệu mặt\r\n\r\nKính cứng\r\n\r\nNăng lượng sử dụng\r\n\r\nAutomatic\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nThép không gỉ\r\n\r\nChất liệu vỏ\r\n\r\nThép không gỉ\r\n\r\nKiểu dáng\r\n', 2500000, 2961000, 1, 12, 321, 0, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 08:40:39', '2023-12-20 09:31:39', NULL),
(11, 'Đồng hồ Seiko SK-SNKA07K1S', 'dong-ho-seiko-sk-snka07k1s', 'image-1703036539538-959467291.jpg', 'Thông số kỹ thuật của Đồng hồ Seiko SK-SNKA07K1S\r\nĐường kính mặt\r\n\r\n37 mm\r\n\r\nChống nước\r\n\r\n3 ATM\r\n\r\nChất liệu mặt\r\n\r\nKính cứng\r\n\r\nNăng lượng sử dụng\r\n\r\nAutomatic\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nThép không gỉ\r\n\r\nChất liệu vỏ\r\n\r\nThép không gỉ\r\n\r\nKiểu dáng\r\n', 2678900, 2961000, 1, 12, 98, 2, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 08:42:19', '2023-12-20 10:17:00', NULL),
(12, 'Đồng hồ Seiko SK-SNKE49K1S', 'dong-ho-seiko-sk-snke49k1s', 'image-1703036701342-869070954.jpg', 'Thông số kỹ thuật của Đồng hồ Seiko SK-SNKE49K1S\r\nĐường kính mặt\r\n\r\n38 mm\r\n\r\nChống nước\r\n\r\n3 ATM\r\n\r\nChất liệu mặt\r\n\r\nKính cứng\r\n\r\nNăng lượng sử dụng\r\n\r\nAutomatic\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nThép không gỉ\r\n\r\nChất liệu vỏ\r\n\r\nThép không gỉ\r\n\r\nKiểu dáng\r\n', 2246310, 2961000, 1, 12, 99, 1, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 08:45:01', '2023-12-21 10:01:53', NULL),
(13, 'Đồng hồ Seiko SK-SNKE57K1S', 'dong-ho-seiko-sk-snke57k1s', 'image-1703036798958-359724101.jpg', 'Thông số kỹ thuật của Đồng hồ Seiko SK-SNKE57K1S\r\nĐường kính mặt\r\n\r\n38 mm\r\n\r\nChống nước\r\n\r\n3 ATM\r\n\r\nChất liệu mặt\r\n\r\nKính cứng\r\n\r\nNăng lượng sử dụng\r\n\r\nAutomatic\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nThép không gỉ\r\n\r\nChất liệu vỏ\r\n\r\nThép không gỉ\r\n\r\nKiểu dáng\r\n', 2879800, 2961000, 1, 12, 50, 0, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 08:46:38', '2023-12-20 09:31:59', NULL),
(14, 'Đồng hồ Seiko SK-SNKE61K1S', 'dong-ho-seiko-sk-snke61k1s', 'image-1703036901211-110390498.jpg', 'Thông số kỹ thuật của Đồng hồ Seiko SK-SNKE61K1S\r\nĐường kính mặt\r\n\r\n38 mm\r\n\r\nChống nước\r\n\r\n3 ATM\r\n\r\nChất liệu mặt\r\n\r\nKính cứng\r\n\r\nNăng lượng sử dụng\r\n\r\nAutomatic\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nThép không gỉ\r\n\r\nChất liệu vỏ\r\n\r\nThép không gỉ\r\n\r\nKiểu dáng\r\n', 2678900, 2961000, 1, 12, 20, 0, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 08:48:21', '2023-12-20 09:32:05', NULL),
(15, 'Đồng hồ Seiko SK-SUR266P1', 'dong-ho-seiko-sk-sur266p1', 'image-1703038772031-672559729.jpg', 'Thông số kỹ thuật của Đồng hồ Seiko SK-SUR266P1\r\nĐường kính mặt\r\n\r\n41 mm\r\n\r\nChống nước\r\n\r\n10 ATM\r\n\r\nChất liệu mặt\r\n\r\nKính cứng\r\n\r\nNăng lượng sử dụng\r\n\r\nQuartz/Pin\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nDây da chính hãng\r\n\r\nChất liệu vỏ\r\n\r\nThép không gỉ\r\n\r\nKiểu d', 3000000, 3240000, 1, 12, 0, 0, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 09:19:32', '2023-12-20 09:19:32', NULL),
(16, 'Đồng hồ Citizen CT-BE9174-55E', 'dong-ho-citizen-ct-be9174-55e', 'image-1703038865612-756935053.jpg', 'Thương hiệu: Đồng hồ Citizen\r\n\r\nKiểu dáng : Đồng hồ nam\r\n\r\nChất  liệu vỏ : Thép không gỉ mạ Demi PVD\r\n\r\nChất liệu dây : Thép không gỉ mạ Demi PVD\r\n\r\nMặt kính : Mineral Crystal (Kính Cứng)\r\n\r\nNăng lượng sử sụng : Quatz ( Máy pin )\r\n\r\nKích thước mặt: 39 mm\r', 3500000, 4095000, 1, 7, 30, 0, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 09:21:05', '2023-12-20 09:21:05', NULL),
(17, 'Đồng hồ Citizen CT-NH8366-83A', 'dong-ho-citizen-ct-nh8366-83a', 'image-1703039168740-691917522.jpg', 'Thông số kỹ thuật của Đồng hồ Citizen CT-NH8366-83A\r\nĐường kính mặt\r\n\r\n40mm\r\n\r\nChống nước\r\n\r\n5ATM\r\n\r\nChất liệu mặt\r\n\r\nMineral (Kính cứng chịu lực)\r\n\r\nNăng lượng sử dụng\r\n\r\nAutomatic (Cơ tự động)\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nThép không gỉ ( mạ Demi PVD ', 4500000, 5391000, 1, 7, 10, 0, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 09:26:08', '2023-12-20 09:26:08', NULL),
(18, 'Đồng hồ Citizen CT-BI1052-85P', 'dong-ho-citizen-ct-bi1052-85p', 'image-1703039235850-414345992.jpg', 'Đường kính mặt\r\n\r\n40mm\r\n\r\nChống nước\r\n\r\n5ATM\r\n\r\nChất liệu mặt\r\n\r\nMineral (Kính cứng chịu lực)\r\n\r\nNăng lượng sử dụng\r\n\r\nQuatz ( Máy pin )\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nThép không gỉ mạ PVD\r\n\r\nChất liệu vỏ\r\n\r\nThép không gỉ mạ PVD\r\n\r\nKiểu dáng\r\n\r\nĐồng hồ N', 3000000, 3411000, 1, 7, 1, 3, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 09:27:15', '2023-12-21 22:53:34', NULL),
(19, 'Đồng hồ Orient OR-RA-SP0003B10B', 'dong-ho-orient-or-ra-sp0003b10b', 'image-1703039319380-799071085.jpg', 'Thông số kỹ thuật của Đồng hồ Orient OR-RA-SP0003B10B\r\nĐường kính mặt\r\n\r\n39mm\r\n\r\nChống nước\r\n\r\n5ATM\r\n\r\nChất liệu mặt\r\n\r\nKính khoáng\r\n\r\nNăng lượng sử dụng\r\n\r\nQuartz (Pin)\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nDây da\r\n\r\nChất liệu vỏ\r\n\r\nThép không gỉ\r\n\r\nKiểu dáng\r', 0, 4131000, 2, 1, 29, 1, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 09:28:39', '2023-12-21 22:53:34', NULL),
(20, 'Đồng hồ Orient OR-RA-SP0004L10B', 'dong-ho-orient-or-ra-sp0004l10b', 'image-1703039415582-730923190.jpg', 'Thông số kỹ thuật của Đồng hồ Orient OR-RA-SP0004L10B\r\nĐường kính mặt\r\n\r\n40mm\r\n\r\nChống nước\r\n\r\n5ATM\r\n\r\nChất liệu mặt\r\n\r\nKính khoáng\r\n\r\nNăng lượng sử dụng\r\n\r\nQuartz (Pin)\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nDây da\r\n\r\nChất liệu vỏ\r\n\r\nThép không gỉ\r\n\r\nKiểu dáng\r', 2645000, 3645000, 1, 11, 20, 0, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 09:30:15', '2023-12-20 09:30:15', NULL),
(21, 'Đồng hồ Orient OR-FGW0100HW0', 'dong-ho-orient-or-fgw0100hw0', 'image-1703039610903-773348653.jpg', 'Thông số kỹ thuật của Đồng hồ Orient OR-FGW0100HW0\r\nĐường kính mặt\r\n\r\n38mm\r\n\r\nChống nước\r\n\r\n3ATM\r\n\r\nChất liệu mặt\r\n\r\nKính Saphire\r\n\r\nNăng lượng sử dụng\r\n\r\nQuartz (Pin)\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nDây da\r\n\r\nChất liệu vỏ\r\n\r\nThép không gỉ\r\n\r\nKiểu dáng\r\n\r', 2848000, 3348000, 1, 11, 0, 0, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 09:33:30', '2023-12-20 09:33:30', NULL),
(22, 'Đồng hồ Diamond D DM38445', 'dong-ho-diamond-d-dm38445', 'image-1703039684723-921585629.jpg', 'Thông số kỹ thuật của Đồng hồ Diamond D DM38445\r\nĐường kính mặt\r\n\r\n27mm\r\n\r\nChống nước\r\n\r\n3ATM\r\n\r\nChất liệu mặt\r\n\r\nKính sapphire\r\n\r\nNăng lượng sử dụng\r\n\r\nQuartz/Pin\r\n\r\nSize dây\r\n\r\n16mm\r\n\r\nChất liệu dây\r\n\r\nHợp kim\r\n\r\nChất liệu vỏ\r\n\r\nHợp kim , đính đá swarov', 2086000, 2786000, 2, 5, 17, 3, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 09:34:44', '2023-12-20 10:17:00', NULL),
(23, 'Đồng hồ Diamond D DM36285IG-R', 'dong-ho-diamond-d-dm36285ig-r', 'image-1703039736271-154692416.jpg', 'Thông số kỹ thuật của Đồng hồ Diamond D DM36285IG-R\r\nĐường kính mặt\r\n\r\n32mm\r\n\r\nChống nước\r\n\r\n3ATM\r\n\r\nChất liệu mặt\r\n\r\nKính sapphire\r\n\r\nNăng lượng sử dụng\r\n\r\nQuartz/Pin\r\n\r\nSize dây\r\n\r\n16mm\r\n\r\nChất liệu dây\r\n\r\nDây da\r\n\r\nChất liệu vỏ\r\n\r\nHợp kim mạ PVD , đính', 3085000, 3185000, 2, 5, 10, 0, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 09:35:36', '2023-12-20 09:35:36', NULL),
(24, 'Đồng hồ Diamond D DD6012A', 'dong-ho-diamond-d-dd6012a', 'image-1703040958953-937880544.jpg', 'Thông số kỹ thuật của Đồng hồ Diamond D DD6012A\r\nĐường kính mặt\r\n\r\n34 mm\r\n\r\nChống nước\r\n\r\n5 ATM\r\n\r\nChất liệu mặt\r\n\r\nTráng Sapphire\r\n\r\nNăng lượng sử dụng\r\n\r\nQuartz/Pin\r\n\r\nSize dây\r\n\r\nChất liệu dây\r\n\r\nStainless Steel\r\n\r\nChất liệu vỏ\r\n\r\nStainless Steel\r\n\r\nKi', 2595000, 3395000, 2, 5, 10, 0, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 09:55:58', '2023-12-20 09:55:58', NULL),
(25, 'Đồng hồ Diamond D DM38025IG', 'dong-ho-diamond-d-dm38025ig', 'image-1703041378473-983453771.jpg', 'Thương hiệu: Đồng hồ nữ Diamond D\r\n\r\nKiểu dáng: Đồng hồ nữ\r\n\r\nMáy: Quartz\r\n\r\nChất liệu vỏ: Hợp kim mạ PVD , đính đá swarovsky\r\n\r\nChất liệu dây: Hợp kim mạ PVD , đính đá swarovsky\r\n\r\nMặt kính: Sapphire ( Kính chống trầy )\r\n\r\nKích thước : 26mm\r\n\r\nChống nước', 2990000, 3990000, 2, 5, 10, 0, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 10:02:58', '2023-12-20 10:02:58', NULL),
(26, 'Đồng hồ Diamond D DM6305B5', 'dong-ho-diamond-d-dm6305b5', 'image-1703041457722-789043040.jpg', 'Thương hiệu: Đồng hồ nữ Diamond D\r\n\r\nKiểu dáng: Đồng hồ nữ\r\n\r\nMáy: Quartz\r\n\r\nChất liệu vỏ: Hợp kim , đính đá swarovsky\r\n\r\nChất liệu dây:Hợp kim , đính đá swarovsky\r\n\r\nMặt kính: Sapphire ( Kính chống trầy ) \r\nKích thước : 30mm\r\nChống nước : 3 ATM\r\n\r\nBảo hà', 3317000, 3717000, 2, 5, 9, 1, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-20 10:04:17', '2023-12-20 10:58:45', NULL),
(27, 'Đồng hồ Epos Swiss E-3391.832.20.16.25', 'dong-ho-epos-swiss-e-3391832201625', 'image-1703478297634-675238760.jpg', 'Thương hiệu đồng hồ  Epos Swiss được nhập khẩu nguyên chiếc từ Thụy Sỹ và phân phối độc quyền tại Đăng Quang Watch.\r\n\r\n\r\n\r\nMặt kính sử dụng chất liệu sapphire chống trầy xước.\r\n\r\n\r\n\r\nChất liệu vỏ sử dụng thép không gỉ mạ PVD cao cấp , độ dày vỏ 10 mm.\r\n\r\n', 58400000, 68400000, 2, 1, 3, 1, 1, 'Phan Hữu Toại', 'Phan Hữu Toại', '2023-12-25 11:24:57', '2023-12-29 10:35:07', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shippings`
--

CREATE TABLE `shippings` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `note` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `shippings`
--

INSERT INTO `shippings` (`id`, `name`, `address`, `phone`, `note`, `method`, `created_at`, `updated_at`) VALUES
(1, 'Toại Phan', 'TDP1 TTPC', '0853032558', '', 'vnpay', '2023-12-21 10:34:59', '2023-12-21 10:34:59'),
(2, 'Toại Phan', 'TDP1 TTPC', '0853032558', '', 'cod', '2023-12-21 11:03:55', '2023-12-21 11:03:55'),
(3, 'Toại Phan', 'TDP1 TTPC', '0853032558', '', 'cod', '2023-12-21 11:26:15', '2023-12-21 11:26:15'),
(4, 'Toại Phan', 'TDP1 TTPC', '0853032558', '', 'cod', '2023-12-21 22:51:57', '2023-12-21 22:51:57'),
(5, 'Toại Phan', 'TDP1 TTPC', '0853032558', '', 'cod', '2023-12-21 22:53:34', '2023-12-21 22:53:34'),
(6, 'Toại Phan', 'TDP1 TTPC', '0853032558', '', 'vnpay', '2023-12-21 23:04:49', '2023-12-21 23:04:49'),
(7, 'Toại Phan', 'TDP1 TTPC', '0853032558', 'okkkkkkkk', 'vnpay', '2023-12-25 11:07:51', '2023-12-25 11:07:51'),
(8, 'Toại Phan', 'TDP1 TTPC', '0853032558', 'ok', 'vnpay', '2023-12-25 11:28:06', '2023-12-25 11:28:06'),
(9, 'Toại Phan', 'TDP1 TTPC', '0853032558', 'aaaaaaa', 'cod', '2023-12-25 11:38:51', '2023-12-25 11:38:51'),
(10, 'Toại Phan', 'TDP1 TTPC', '0853032558', '', 'cod', '2023-12-25 11:54:16', '2023-12-25 11:54:16'),
(11, 'Phan Hữu Toại', 'Hà Tĩnh', '0918290321', 'Oke', 'cod', '2023-12-29 10:35:06', '2023-12-29 10:35:06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `cartuserid` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `cartuserid`, `created_at`, `updated_at`, `deletedAt`) VALUES
(6, 'phantoai01@gmail.com', 'phantoai01', 'c4ca4238a0b923820dcc509a6f75849b', 'ishw5n', '2023-12-15 02:51:26', '2023-12-15 02:51:26', NULL),
(7, 'phantoai123@gmail.com', 'phantoai123', 'c4ca4238a0b923820dcc509a6f75849b', 'rm6q87', '2023-12-20 12:07:12', '2023-12-20 12:07:12', NULL),
(8, 'admin@gmail.com', 'admin', 'c4ca4238a0b923820dcc509a6f75849b', 'p7orib', '2023-12-20 12:08:01', '2023-12-20 12:08:01', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `slug_2` (`slug`),
  ADD UNIQUE KEY `slug_3` (`slug`),
  ADD UNIQUE KEY `slug_4` (`slug`),
  ADD UNIQUE KEY `slug_5` (`slug`),
  ADD UNIQUE KEY `slug_6` (`slug`),
  ADD UNIQUE KEY `slug_7` (`slug`),
  ADD UNIQUE KEY `slug_8` (`slug`),
  ADD UNIQUE KEY `slug_9` (`slug`),
  ADD UNIQUE KEY `slug_10` (`slug`),
  ADD UNIQUE KEY `slug_11` (`slug`),
  ADD UNIQUE KEY `slug_12` (`slug`),
  ADD UNIQUE KEY `slug_13` (`slug`),
  ADD UNIQUE KEY `slug_14` (`slug`),
  ADD UNIQUE KEY `slug_15` (`slug`),
  ADD UNIQUE KEY `slug_16` (`slug`),
  ADD UNIQUE KEY `slug_17` (`slug`),
  ADD UNIQUE KEY `slug_18` (`slug`),
  ADD UNIQUE KEY `slug_19` (`slug`),
  ADD UNIQUE KEY `slug_20` (`slug`),
  ADD UNIQUE KEY `slug_21` (`slug`),
  ADD UNIQUE KEY `slug_22` (`slug`),
  ADD UNIQUE KEY `slug_23` (`slug`),
  ADD UNIQUE KEY `slug_24` (`slug`),
  ADD UNIQUE KEY `slug_25` (`slug`),
  ADD UNIQUE KEY `slug_26` (`slug`),
  ADD UNIQUE KEY `slug_27` (`slug`),
  ADD UNIQUE KEY `slug_28` (`slug`),
  ADD UNIQUE KEY `slug_29` (`slug`),
  ADD UNIQUE KEY `slug_30` (`slug`),
  ADD UNIQUE KEY `slug_31` (`slug`),
  ADD UNIQUE KEY `slug_32` (`slug`),
  ADD UNIQUE KEY `slug_33` (`slug`),
  ADD UNIQUE KEY `slug_34` (`slug`),
  ADD UNIQUE KEY `slug_35` (`slug`),
  ADD UNIQUE KEY `slug_36` (`slug`),
  ADD UNIQUE KEY `slug_37` (`slug`),
  ADD UNIQUE KEY `slug_38` (`slug`),
  ADD UNIQUE KEY `slug_39` (`slug`),
  ADD UNIQUE KEY `slug_40` (`slug`),
  ADD UNIQUE KEY `slug_41` (`slug`),
  ADD UNIQUE KEY `slug_42` (`slug`),
  ADD UNIQUE KEY `slug_43` (`slug`),
  ADD UNIQUE KEY `slug_44` (`slug`),
  ADD UNIQUE KEY `slug_45` (`slug`),
  ADD UNIQUE KEY `slug_46` (`slug`),
  ADD UNIQUE KEY `slug_47` (`slug`),
  ADD UNIQUE KEY `slug_48` (`slug`),
  ADD UNIQUE KEY `slug_49` (`slug`),
  ADD UNIQUE KEY `slug_50` (`slug`),
  ADD UNIQUE KEY `slug_51` (`slug`),
  ADD UNIQUE KEY `slug_52` (`slug`),
  ADD UNIQUE KEY `slug_53` (`slug`),
  ADD UNIQUE KEY `slug_54` (`slug`),
  ADD UNIQUE KEY `slug_55` (`slug`),
  ADD UNIQUE KEY `slug_56` (`slug`),
  ADD UNIQUE KEY `slug_57` (`slug`),
  ADD UNIQUE KEY `slug_58` (`slug`),
  ADD UNIQUE KEY `slug_59` (`slug`),
  ADD UNIQUE KEY `slug_60` (`slug`),
  ADD UNIQUE KEY `slug_61` (`slug`),
  ADD UNIQUE KEY `slug_62` (`slug`),
  ADD UNIQUE KEY `slug_63` (`slug`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `slug_2` (`slug`),
  ADD UNIQUE KEY `slug_3` (`slug`),
  ADD UNIQUE KEY `slug_4` (`slug`),
  ADD UNIQUE KEY `slug_5` (`slug`),
  ADD UNIQUE KEY `slug_6` (`slug`),
  ADD UNIQUE KEY `slug_7` (`slug`),
  ADD UNIQUE KEY `slug_8` (`slug`),
  ADD UNIQUE KEY `slug_9` (`slug`),
  ADD UNIQUE KEY `slug_10` (`slug`),
  ADD UNIQUE KEY `slug_11` (`slug`),
  ADD UNIQUE KEY `slug_12` (`slug`),
  ADD UNIQUE KEY `slug_13` (`slug`),
  ADD UNIQUE KEY `slug_14` (`slug`),
  ADD UNIQUE KEY `slug_15` (`slug`),
  ADD UNIQUE KEY `slug_16` (`slug`),
  ADD UNIQUE KEY `slug_17` (`slug`),
  ADD UNIQUE KEY `slug_18` (`slug`),
  ADD UNIQUE KEY `slug_19` (`slug`),
  ADD UNIQUE KEY `slug_20` (`slug`),
  ADD UNIQUE KEY `slug_21` (`slug`),
  ADD UNIQUE KEY `slug_22` (`slug`),
  ADD UNIQUE KEY `slug_23` (`slug`),
  ADD UNIQUE KEY `slug_24` (`slug`),
  ADD UNIQUE KEY `slug_25` (`slug`),
  ADD UNIQUE KEY `slug_26` (`slug`),
  ADD UNIQUE KEY `slug_27` (`slug`),
  ADD UNIQUE KEY `slug_28` (`slug`),
  ADD UNIQUE KEY `slug_29` (`slug`),
  ADD UNIQUE KEY `slug_30` (`slug`),
  ADD UNIQUE KEY `slug_31` (`slug`),
  ADD UNIQUE KEY `slug_32` (`slug`),
  ADD UNIQUE KEY `slug_33` (`slug`),
  ADD UNIQUE KEY `slug_34` (`slug`),
  ADD UNIQUE KEY `slug_35` (`slug`),
  ADD UNIQUE KEY `slug_36` (`slug`),
  ADD UNIQUE KEY `slug_37` (`slug`),
  ADD UNIQUE KEY `slug_38` (`slug`),
  ADD UNIQUE KEY `slug_39` (`slug`),
  ADD UNIQUE KEY `slug_40` (`slug`),
  ADD UNIQUE KEY `slug_41` (`slug`),
  ADD UNIQUE KEY `slug_42` (`slug`),
  ADD UNIQUE KEY `slug_43` (`slug`),
  ADD UNIQUE KEY `slug_44` (`slug`),
  ADD UNIQUE KEY `slug_45` (`slug`),
  ADD UNIQUE KEY `slug_46` (`slug`),
  ADD UNIQUE KEY `slug_47` (`slug`),
  ADD UNIQUE KEY `slug_48` (`slug`),
  ADD UNIQUE KEY `slug_49` (`slug`),
  ADD UNIQUE KEY `slug_50` (`slug`),
  ADD UNIQUE KEY `slug_51` (`slug`),
  ADD UNIQUE KEY `slug_52` (`slug`),
  ADD UNIQUE KEY `slug_53` (`slug`),
  ADD UNIQUE KEY `slug_54` (`slug`),
  ADD UNIQUE KEY `slug_55` (`slug`),
  ADD UNIQUE KEY `slug_56` (`slug`),
  ADD UNIQUE KEY `slug_57` (`slug`),
  ADD UNIQUE KEY `slug_58` (`slug`),
  ADD UNIQUE KEY `slug_59` (`slug`),
  ADD UNIQUE KEY `slug_60` (`slug`),
  ADD UNIQUE KEY `slug_61` (`slug`),
  ADD UNIQUE KEY `slug_62` (`slug`),
  ADD UNIQUE KEY `slug_63` (`slug`);

--
-- Chỉ mục cho bảng `detail_orders`
--
ALTER TABLE `detail_orders`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shipping_id` (`shipping_id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `slug_2` (`slug`),
  ADD UNIQUE KEY `slug_3` (`slug`),
  ADD UNIQUE KEY `slug_4` (`slug`),
  ADD UNIQUE KEY `slug_5` (`slug`),
  ADD UNIQUE KEY `slug_6` (`slug`),
  ADD UNIQUE KEY `slug_7` (`slug`),
  ADD UNIQUE KEY `slug_8` (`slug`),
  ADD UNIQUE KEY `slug_9` (`slug`),
  ADD UNIQUE KEY `slug_10` (`slug`),
  ADD UNIQUE KEY `slug_11` (`slug`),
  ADD UNIQUE KEY `slug_12` (`slug`),
  ADD UNIQUE KEY `slug_13` (`slug`),
  ADD UNIQUE KEY `slug_14` (`slug`),
  ADD UNIQUE KEY `slug_15` (`slug`),
  ADD UNIQUE KEY `slug_16` (`slug`),
  ADD UNIQUE KEY `slug_17` (`slug`),
  ADD UNIQUE KEY `slug_18` (`slug`),
  ADD UNIQUE KEY `slug_19` (`slug`),
  ADD UNIQUE KEY `slug_20` (`slug`),
  ADD UNIQUE KEY `slug_21` (`slug`),
  ADD UNIQUE KEY `slug_22` (`slug`),
  ADD UNIQUE KEY `slug_23` (`slug`),
  ADD UNIQUE KEY `slug_24` (`slug`),
  ADD UNIQUE KEY `slug_25` (`slug`),
  ADD UNIQUE KEY `slug_26` (`slug`),
  ADD UNIQUE KEY `slug_27` (`slug`),
  ADD UNIQUE KEY `slug_28` (`slug`),
  ADD UNIQUE KEY `slug_29` (`slug`),
  ADD UNIQUE KEY `slug_30` (`slug`),
  ADD UNIQUE KEY `slug_31` (`slug`),
  ADD UNIQUE KEY `slug_32` (`slug`),
  ADD UNIQUE KEY `slug_33` (`slug`),
  ADD UNIQUE KEY `slug_34` (`slug`),
  ADD UNIQUE KEY `slug_35` (`slug`),
  ADD UNIQUE KEY `slug_36` (`slug`),
  ADD UNIQUE KEY `slug_37` (`slug`),
  ADD UNIQUE KEY `slug_38` (`slug`),
  ADD UNIQUE KEY `slug_39` (`slug`),
  ADD UNIQUE KEY `slug_40` (`slug`),
  ADD UNIQUE KEY `slug_41` (`slug`),
  ADD UNIQUE KEY `slug_42` (`slug`),
  ADD UNIQUE KEY `slug_43` (`slug`),
  ADD UNIQUE KEY `slug_44` (`slug`),
  ADD UNIQUE KEY `slug_45` (`slug`),
  ADD UNIQUE KEY `slug_46` (`slug`),
  ADD UNIQUE KEY `slug_47` (`slug`),
  ADD UNIQUE KEY `slug_48` (`slug`),
  ADD UNIQUE KEY `slug_49` (`slug`),
  ADD UNIQUE KEY `slug_50` (`slug`),
  ADD UNIQUE KEY `slug_51` (`slug`),
  ADD UNIQUE KEY `slug_52` (`slug`),
  ADD UNIQUE KEY `slug_53` (`slug`),
  ADD UNIQUE KEY `slug_54` (`slug`),
  ADD UNIQUE KEY `slug_55` (`slug`),
  ADD UNIQUE KEY `slug_56` (`slug`),
  ADD UNIQUE KEY `slug_57` (`slug`),
  ADD UNIQUE KEY `slug_58` (`slug`),
  ADD UNIQUE KEY `slug_59` (`slug`),
  ADD UNIQUE KEY `slug_60` (`slug`),
  ADD UNIQUE KEY `slug_61` (`slug`),
  ADD UNIQUE KEY `slug_62` (`slug`),
  ADD UNIQUE KEY `slug_63` (`slug`);

--
-- Chỉ mục cho bảng `shippings`
--
ALTER TABLE `shippings`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `detail_orders`
--
ALTER TABLE `detail_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `shippings`
--
ALTER TABLE `shippings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`shipping_id`) REFERENCES `shippings` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

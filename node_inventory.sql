-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 05, 2021 at 03:01 AM
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
-- Database: `node_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `ajuan`
--

CREATE TABLE `ajuan` (
  `id` int(11) NOT NULL,
  `kdajuan` text NOT NULL,
  `kdbrg` text NOT NULL,
  `nmbrg` text NOT NULL,
  `supplier` text NOT NULL,
  `jmlbrg` int(11) NOT NULL,
  `jmlajuan` int(11) NOT NULL,
  `tglajuan` text NOT NULL,
  `val` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ajuan`
--

INSERT INTO `ajuan` (`id`, `kdajuan`, `kdbrg`, `nmbrg`, `supplier`, `jmlbrg`, `jmlajuan`, `tglajuan`, `val`) VALUES
(9, 'AJ223', 'BRG233', 'Redmi Note 11', 'CV Netmedia Komunika', 21, 2, '2021-07-04', '0'),
(10, 'AJ004', 'BRG432', 'headset jbl', 'CV Netmedia Komunika', 78, 7, '2021-07-04', '0'),
(11, 'ut7654', 'BRG432', 'headset jbl', 'CV Netmedia Komunika', 78, 54, '2021-07-04', '1');

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id` int(11) NOT NULL,
  `kdbrg` text NOT NULL,
  `nama` text NOT NULL,
  `jumlah` int(11) NOT NULL,
  `supplier` text NOT NULL,
  `rak` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `kdbrg`, `nama`, `jumlah`, `supplier`, `rak`) VALUES
(1, 'BRG233', 'Redmi Note 11', 19, 'CV Netmedia Komunika', 'rak 01'),
(2, 'BRG432', 'headset jbl', 71, 'CV Netmedia Komunika', 'rak 02');

-- --------------------------------------------------------

--
-- Table structure for table `barang_keluar`
--

CREATE TABLE `barang_keluar` (
  `id` int(11) NOT NULL,
  `kdajuan` text NOT NULL,
  `kdbrg` text NOT NULL,
  `nmbrg` text NOT NULL,
  `supplier` text NOT NULL,
  `jmlbrg` int(11) NOT NULL,
  `jmlajuan` int(11) NOT NULL,
  `jmlkeluar` text NOT NULL,
  `tglajuan` text NOT NULL,
  `tglkeluar` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `barang_keluar`
--

INSERT INTO `barang_keluar` (`id`, `kdajuan`, `kdbrg`, `nmbrg`, `supplier`, `jmlbrg`, `jmlajuan`, `jmlkeluar`, `tglajuan`, `tglkeluar`) VALUES
(5, 'AJ99262', 'BRG233', 'Redmi Note 11', 'CV Netmedia Komunika', 29, 3, '3', '2021-07-01', '2021-07-01'),
(6, 'AJ224', 'BRG233', 'Redmi Note 11', 'CV Netmedia Komunika', 29, 10, '10', '2021-07-01', '2021-07-01'),
(8, 'AJ002', 'BRG432', 'headset jbl', 'CV Netmedia Komunika', 98, 20, '20', '2021-07-04', '2021-07-04'),
(9, 'AJ004', 'BRG233', 'Redmi Note 11', 'CV Netmedia Komunika', 26, 9, '9', '2021-07-04', '2021-07-04'),
(10, 'AJ023', 'BRG233', 'Redmi Note 11', 'CV Netmedia Komunika', 26, 5, '5', '2021-07-04', '2021-07-04'),
(11, 'AJ004', 'BRG432', 'headset jbl', 'CV Netmedia Komunika', 78, 7, '7', '2021-07-04', '2021-07-04'),
(12, 'AJ223', 'BRG233', 'Redmi Note 11', 'CV Netmedia Komunika', 21, 2, '2', '2021-07-04', '2021-07-04');

-- --------------------------------------------------------

--
-- Table structure for table `barang_masuk`
--

CREATE TABLE `barang_masuk` (
  `id` int(11) NOT NULL,
  `kdbrg` text NOT NULL,
  `nmbrg` text NOT NULL,
  `supplier` text NOT NULL,
  `jmlbrg` int(11) NOT NULL,
  `jmlmasuk` int(11) NOT NULL,
  `tglmasuk` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `karyawan`
--

CREATE TABLE `karyawan` (
  `id` int(11) NOT NULL,
  `nama` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `alamat` text NOT NULL,
  `notlp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `karyawan`
--

INSERT INTO `karyawan` (`id`, `nama`, `username`, `password`, `alamat`, `notlp`) VALUES
(1, 'karyawan', 'karyawan', '9e014682c94e0f2cc834bf7348bda428', 'perum bci\r\n               ', '+6283897223871');

-- --------------------------------------------------------

--
-- Table structure for table `rak`
--

CREATE TABLE `rak` (
  `idrak` int(11) NOT NULL,
  `kdrak` text NOT NULL,
  `nama` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rak`
--

INSERT INTO `rak` (`idrak`, `kdrak`, `nama`) VALUES
(1, 'KD001', 'rak 01'),
(2, 'KD002', 'rak 02');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `nama` text NOT NULL,
  `alamat` text NOT NULL,
  `kontak` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `nama`, `alamat`, `kontak`) VALUES
(1, 'PT Jurnawaktu Jaya', 'Jl. Kelapa Gading Blok A5 No. 3 \r\n               ', '08120202020202'),
(2, 'CV Netmedia Komunika', 'Jl Komud Supadio \r\n               ', 'akwkowkwpkwowkowkwokowk');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `nama` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `nama`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'owi\r\n');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ajuan`
--
ALTER TABLE `ajuan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `barang_keluar`
--
ALTER TABLE `barang_keluar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `barang_masuk`
--
ALTER TABLE `barang_masuk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `karyawan`
--
ALTER TABLE `karyawan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rak`
--
ALTER TABLE `rak`
  ADD PRIMARY KEY (`idrak`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ajuan`
--
ALTER TABLE `ajuan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `barang_keluar`
--
ALTER TABLE `barang_keluar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `barang_masuk`
--
ALTER TABLE `barang_masuk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `karyawan`
--
ALTER TABLE `karyawan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rak`
--
ALTER TABLE `rak`
  MODIFY `idrak` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

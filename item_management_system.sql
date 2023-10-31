-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 20 Okt 2023 pada 18.13
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `item_management_system`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `asset`
--

CREATE TABLE `asset` (
  `id` int(11) NOT NULL,
  `Input Date` date NOT NULL,
  `Code Item` varchar(50) NOT NULL,
  `Item Name` varchar(200) NOT NULL,
  `Category` varchar(40) NOT NULL,
  `Location` varchar(50) NOT NULL,
  `Condition` varchar(50) NOT NULL,
  `Date of Purchase` date NOT NULL,
  `Price` varchar(200) NOT NULL,
  `Adjustment Date` date NOT NULL,
  `Photo` varchar(500) NOT NULL,
  `Amount` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `asset`
--

INSERT INTO `asset` (`id`, `Input Date`, `Code Item`, `Item Name`, `Category`, `Location`, `Condition`, `Date of Purchase`, `Price`, `Adjustment Date`, `Photo`, `Amount`) VALUES
(1, '2023-09-05', '20230905TK1HW0001', 'contoh', 'Hardware', 'Toko 1', 'Old', '2023-09-01', '10000', '2023-09-05', '-', '1'),
(2, '2023-09-06', '20230905TK1SW0002', 'contoh2', 'Software', 'Toko 1', 'New', '2023-09-05', '10000', '2023-09-15', '-', '1'),
(3, '2023-09-07', '20230920TK2HW0003', 'contoh3', 'Hardware', 'Toko 2', 'New', '2023-09-11', '20000', '2023-09-28', '-', '2'),
(4, '2023-09-06', '20230905TK1HW0004', 'contoh4', 'Hardware', 'Toko 1', 'Repaired', '2023-09-05', '10000', '2023-09-15', '-', '3'),
(5, '2023-09-07', '20230920TK2SW0005', 'contoh5', 'Software', 'Toko 2', 'Moved', '2023-09-11', '20000', '2023-09-28', '-', '4');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `Division` varchar(50) NOT NULL,
  `Role` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`ID`, `Username`, `Password`, `Division`, `Role`) VALUES
(1, 'SuperAdmin', 'super@123', 'IT', 'SuperAdmin');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `asset`
--
ALTER TABLE `asset`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `asset`
--
ALTER TABLE `asset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 08, 2024 at 11:17 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `journal_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `journal_list`
--

CREATE TABLE `journal_list` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category` enum('Personal','Work','Travel') NOT NULL,
  `cdate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `journal_list`
--

INSERT INTO `journal_list` (`id`, `title`, `content`, `category`, `cdate`) VALUES
(5, 'Disigning', 'Designing new UI/UX', 'Work', '2024-07-08 15:06:09'),
(6, 'Work from Home', 'From today i will be working from home ', 'Work', '2024-07-08 15:12:19'),
(7, 'Python', 'Learning Pythone in dept', 'Personal', '2024-07-08 16:34:38');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cdate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`username`, `password`, `cdate`) VALUES
('first Admin', '$2b$10$KiE5bux8r8u5nHZMmt6Ef.vfY4aFdWE2W2vw7g1TjfgT56irjJb.a', '2024-07-07 09:09:41'),
('first Admin', '$2b$10$msB/XcsPwoM/DH9.kpbOT.YKotmp/nmyiLD3ONeaFRZL7qU39xCDi', '2024-07-07 09:13:05'),
('second Admin', '$2b$10$UNgL/IW5m7pg7z8fl4Fwu.1R4H5Z1lVWAuIcCyKmuQoBgePdJol5G', '2024-07-07 09:19:50'),
('Test Register', '$2b$10$o/29FMVEQTFBsOeCeM4Mcuht5ho253eHXU9Qd1AHoUQgJJXNrvyfm', '2024-07-07 10:47:09'),
('Admin two', '$2b$10$BFrjhy3TYHfYHrr2w/NsVO8VCRvlB5KtwjnrknETWptIK2/lUx2Ta', '2024-07-07 11:00:39'),
('Ken Kamau', '$2b$10$6eFHbBY9OYoA70DtuggXO.4wdtCmRA6k0GO.ZuXe8LUo6i7BaINi6', '2024-07-07 11:04:05'),
('kenny Oti', '$2b$10$7B9ONCC7vhPd1Oy/jInQPe9ml4txhb1KEW0KUWDOxtRW803.RVS.u', '2024-07-07 11:06:04'),
('Kennyy Kevin', '$2b$10$MPu2VRsQp92JvxiQaA.je.vybak8.xhzoi.OnL620RXGKEpd57tVe', '2024-07-07 11:07:44'),
('Fasa Emy', '$2b$10$aMcz2PwDxI2kmAW7788U3eUh/aeOab0.cL6hat69q3sOGVeSNt8Wq', '2024-07-07 11:10:51'),
('Max mwita', '$2b$10$Icg3D.Hv4itemRmy015piOVmQcXfgmqJlbEj9wC4cRkuVIMUFd3I2', '2024-07-07 11:12:50'),
('Devid', '$2b$10$5M2vm7Ig.HAU.j2k.9pK/Oey4P2jqBY6aPd32BhLFtDfboB.Lyvom', '2024-07-07 12:15:19'),
('Devid oti', '$2b$10$ow7ys/kNymtPw6F4EEYRCO8r6cJOz5q9xW9Rw4ZjCfLccvbay5p.O', '2024-07-07 12:18:28'),
('Denis Omondi', '$2b$10$ZzMSswNLlORCWCrunrZtDuNEAyQ5x6FtVt8cxf95F/Z58vpDeWtJ6', '2024-07-07 12:37:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `journal_list`
--
ALTER TABLE `journal_list`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `journal_list`
--
ALTER TABLE `journal_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

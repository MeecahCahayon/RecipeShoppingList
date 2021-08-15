-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 15, 2021 at 04:57 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodpricespy`
--

-- --------------------------------------------------------

--
-- Table structure for table `ingr`
--

CREATE TABLE `ingr` (
  `IngrID` int(11) NOT NULL,
  `IngrName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `NoteID` int(11) NOT NULL,
  `Note` varchar(2000) DEFAULT NULL,
  `NoteDate` date DEFAULT NULL,
  `RecipeName` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `recipehas`
--

CREATE TABLE `recipehas` (
  `RecipeName` varchar(500) NOT NULL,
  `IngrID` int(11) NOT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Label` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `RecipeName` varchar(500) NOT NULL,
  `Link` varchar(500) DEFAULT NULL,
  `Username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`RecipeName`, `Link`, `Username`) VALUES
('Chicken Creamy Mushroom Chicken', 'https://cafedelites.com/chicken-thighs/?fbclid=IwAR0XzzCPL9nmhVIMdLNX_ZfndYpjPy-N8oxVGYA8GXQCJzSik-iJMtuISdk', 'meecah'),
('Chicken Tinola', 'https://panlasangpinoy.com/filipino-chicken-tinola-recipe/', 'meecah'),
('Filipino Spring Rolls', 'https://www.facebook.com/buzzfeedtasty/posts/3270332609886032', 'meecah'),
('Japanese Teriyaki Sauce', 'https://www.thespruceeats.com/japanese-restaurant-style-teriyaki-sauce-recipe-2031569', 'meecah'),
('Pork Adobo (Marilyn Version)', NULL, 'meecah');

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `ShopID` int(11) NOT NULL,
  `ShopName` varchar(200) NOT NULL,
  `ShopAddy` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `soldin`
--

CREATE TABLE `soldin` (
  `IngrID` int(11) NOT NULL,
  `ShopID` int(11) NOT NULL,
  `Price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `step`
--

CREATE TABLE `step` (
  `StepNum` int(11) NOT NULL,
  `RecipeName` varchar(500) NOT NULL,
  `Instruction` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Username` varchar(50) NOT NULL,
  `MasterPass` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Username`, `MasterPass`) VALUES
('connor', '$2y$10$eXCtC4oX4LjlYaIUFncW/OHf5L2auJyzaW.36Ysa7LLlM6RAq2R.e'),
('meecah', '$2y$10$OJYql865xfkopiQmGJ5ITeV6im98Y8crug30a1aZqPS9lf6m9xTRW'),
('tammy', '$2y$10$reUyhOompiXssSWP3EME.Oa.BqEbjURpZ7p4Om6oMlTmk.YLj4Opu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ingr`
--
ALTER TABLE `ingr`
  ADD PRIMARY KEY (`IngrID`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`NoteID`),
  ADD KEY `FK_Notes_RecipeName` (`RecipeName`);

--
-- Indexes for table `recipehas`
--
ALTER TABLE `recipehas`
  ADD PRIMARY KEY (`RecipeName`,`IngrID`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`RecipeName`),
  ADD KEY `FK_Recipe_Username` (`Username`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`ShopID`);

--
-- Indexes for table `soldin`
--
ALTER TABLE `soldin`
  ADD PRIMARY KEY (`IngrID`,`ShopID`);

--
-- Indexes for table `step`
--
ALTER TABLE `step`
  ADD PRIMARY KEY (`StepNum`,`RecipeName`),
  ADD KEY `FK_Step_RecipeName` (`RecipeName`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ingr`
--
ALTER TABLE `ingr`
  MODIFY `IngrID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `NoteID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `ShopID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `FK_Notes_RecipeName` FOREIGN KEY (`RecipeName`) REFERENCES `recipes` (`RecipeName`);

--
-- Constraints for table `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `FK_Recipe_Username` FOREIGN KEY (`Username`) REFERENCES `users` (`Username`);

--
-- Constraints for table `step`
--
ALTER TABLE `step`
  ADD CONSTRAINT `FK_Step_RecipeName` FOREIGN KEY (`RecipeName`) REFERENCES `recipes` (`RecipeName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

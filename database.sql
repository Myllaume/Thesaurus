-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 13, 2020 at 09:22 AM
-- Server version: 5.7.26
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `thesaurus`
--

-- --------------------------------------------------------

--
-- Table structure for table `Associations`
--

CREATE TABLE `Associations` (
  `id_concept` bigint(20) NOT NULL,
  `id_associe` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Associations`
--

INSERT INTO `Associations` (`id_concept`, `id_associe`) VALUES
(12, 5),
(12, 8),
(12, 4),
(12, 1),
(1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Concepts`
--

CREATE TABLE `Concepts` (
  `id` bigint(20) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `description` text,
  `id_ascendant` int(11) NOT NULL,
  `id_type` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Concepts`
--

INSERT INTO `Concepts` (`id`, `nom`, `description`, `id_ascendant`, `id_type`) VALUES
(1, 'Humanités générales', NULL, 0, NULL),
(2, 'Humanités numériques', 'Une modificationnnnnn', 1, NULL),
(3, 'Le Deuff', 'Je regarde si ça fonctionne', 2, NULL),
(4, 'Sciences sociales', NULL, 0, NULL),
(5, 'Philosophie', 'La philo c\'est trpop bien', 4, NULL),
(6, 'hypertexte', 'L\'hyertexte c\'est super bien', 1, NULL),
(7, 'hypermédia', NULL, 6, NULL),
(8, 'Ethnographie', NULL, 4, NULL),
(9, 'Lapin', 'Les lapins sont une espèce rare d\'animaux qui amènent du bon chocolat aux confinés héhéh', 1, NULL),
(10, 'New', NULL, 3, NULL),
(11, 'Moine', 'Les moines, comme dans Age of Empire', 12, NULL),
(12, 'Religion', NULL, 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Emplois`
--

CREATE TABLE `Emplois` (
  `id_concept` bigint(20) NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Files`
--

CREATE TABLE `Files` (
  `id` bigint(20) NOT NULL,
  `nom_enregistrement` varchar(20) NOT NULL,
  `nom_sortie` varchar(150) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `id_concept` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Files`
--

INSERT INTO `Files` (`id`, `nom_enregistrement`, `nom_sortie`, `extension`, `id_concept`) VALUES
(1, 'jtvhiqdrukwgcofn', 'Nous ne sommes pas codeurs', 'txt', 5),
(2, 'riauexhyqkfcdzwj', 'Nous ne sommes pas codeurs', 'txt', 8),
(3, 'kelucfxbshynqmor', 'Nous ne sommes pas codeurs', 'txt', 8),
(4, 'bsxymurhetfodkzl', 'Le code est un texte performatif', 'txt', 8),
(5, 'gmsjklawqtidxrvy', 'Le code est un texte performatif', 'txt', 9),
(6, 'aceduhgbzrlktyqi', 'Nous ne sommes pas codeurs', 'txt', 9),
(7, 'hfwxyrsbmocgiutd', 'Le code est un texte performatif', 'txt', 11);

-- --------------------------------------------------------

--
-- Table structure for table `Types`
--

CREATE TABLE `Types` (
  `id` bigint(20) NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Types`
--

INSERT INTO `Types` (`id`, `nom`) VALUES
(1, 'personne'),
(2, 'livre'),
(3, 'technique'),
(4, 'site web');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Associations`
--
ALTER TABLE `Associations`
  ADD KEY `id_concept` (`id_concept`);

--
-- Indexes for table `Concepts`
--
ALTER TABLE `Concepts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_type` (`id_type`);

--
-- Indexes for table `Emplois`
--
ALTER TABLE `Emplois`
  ADD KEY `id_concept` (`id_concept`);

--
-- Indexes for table `Files`
--
ALTER TABLE `Files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Types`
--
ALTER TABLE `Types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Concepts`
--
ALTER TABLE `Concepts`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Files`
--
ALTER TABLE `Files`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Types`
--
ALTER TABLE `Types`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

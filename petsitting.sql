-- phpMyAdmin SQL Dump
-- version 4.1.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 18. Jan 2016 um 19:20
-- Server Version: 5.5.33
-- PHP-Version: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `petsitting`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `userdata`
--

CREATE TABLE IF NOT EXISTS `userdata` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(64) DEFAULT NULL,
  `lastName` varchar(64) DEFAULT NULL,
  `city` varchar(64) DEFAULT NULL,
  `zipCode` smallint(5) DEFAULT NULL,
  `street` varchar(64) DEFAULT NULL,
  `dateStart` date DEFAULT NULL,
  `dateEnd` date DEFAULT NULL,
  `animalType` varchar(64) DEFAULT NULL,
  `animalBreed` varchar(64) DEFAULT NULL,
  `animalName` varchar(64) DEFAULT NULL,
  `animalAge` tinyint(3) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

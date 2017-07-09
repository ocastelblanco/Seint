-- phpMyAdmin SQL Dump
-- version 4.0.10.15
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 08-07-2017 a las 22:16:51
-- Versión del servidor: 5.1.73-community
-- Versión de PHP: 5.2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `eb000384_cursos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listadocursos`
--

CREATE TABLE IF NOT EXISTS `listadocursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `NombreCurso` varchar(60) NOT NULL,
  `FechaReg` date NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_2` (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Volcado de datos para la tabla `listadocursos`
--

INSERT INTO `listadocursos` (`id`, `NombreCurso`, `FechaReg`, `activo`) VALUES
(1, 'Curso TSA Nivel Re-entrenamiento', '2016-05-08', 1),
(2, 'Curso TSA Nivel Avanzado', '2016-05-08', 1),
(3, 'Curso TSA Nivel Básico Administrativo', '2016-05-08', 1),
(4, 'Curso TSA Nivel Básico Operativo', '2016-05-08', 1),
(5, 'Curso TSA Nivel Coordinador', '2016-05-08', 1),
(6, 'Manejo preventivo de montacargas', '2016-03-01', 1),
(7, 'Manejo preventivo de sustancias peligrosas', '2016-03-01', 1),
(8, 'Manejo defensivo', '2016-03-01', 1),
(9, 'Espacios confinados', '2016-03-01', 1),
(10, 'Trabajo en caliente', '2016-03-01', 1),
(11, 'Rescate vertical', '2016-05-08', 1),
(12, 'Andamiaje', '2016-05-08', 1),
(13, 'Primeros auxilios y brigadas de emergencia', '2016-03-01', 1),
(14, 'Nudos y anclajes', '2016-03-01', 1),
(15, 'Brigadas de emergencia', '2016-03-01', 1),
(16, 'Riesgo eléctrico', '2016-03-01', 1),
(17, 'Actualización del sistema de gestión', '2016-06-10', 1),
(18, 'PRIMER RESPONDIENTE', '2016-07-26', 1),
(19, 'Manejo Puente Grua', '2017-02-05', 1),
(20, 'Curso BPM', '2017-06-21', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

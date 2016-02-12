-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 12-02-2016 a las 16:46:23
-- Versión del servidor: 5.6.22
-- Versión de PHP: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `adminCursos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `CodigoCarta` varchar(30) NOT NULL,
  `NumCert` varchar(30) NOT NULL,
  `Factura` varchar(30) NOT NULL,
  `Consecutivo` varchar(30) NOT NULL,
  `ServExamen` varchar(30) NOT NULL,
  `FechaExp` date NOT NULL,
  `EjecutivoCuenta` varchar(60) NOT NULL,
  `CodUsuario` int(11) NOT NULL,
  `CodCurso` int(11) NOT NULL,
  `FechaCreacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id`, `CodigoCarta`, `NumCert`, `Factura`, `Consecutivo`, `ServExamen`, `FechaExp`, `EjecutivoCuenta`, `CodUsuario`, `CodCurso`, `FechaCreacion`) VALUES
(1, '', '8950 QR', '3260', '2015-12-000086', '', '2016-01-04', 'SEINT SAS ', 1, 1, '2016-02-07'),
(2, '', '8951 QR', '3261', '2015-12-000087', '', '2016-01-05', 'SEINT SAS ', 1, 2, '2016-02-07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listadocursos`
--

CREATE TABLE `listadocursos` (
  `id` int(11) NOT NULL,
  `NombreCurso` varchar(30) NOT NULL,
  `FechaReg` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `listadocursos`
--

INSERT INTO `listadocursos` (`id`, `NombreCurso`, `FechaReg`) VALUES
(1, 'TSA RE-E', '2016-02-07'),
(2, 'TSA AV', '2016-02-07'),
(3, 'TSA BA', '2016-02-07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(60) NOT NULL,
  `Cedula` varchar(30) NOT NULL,
  `Empresa` varchar(60) NOT NULL,
  `FechaReg` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `Nombre`, `Cedula`, `Empresa`, `FechaReg`) VALUES
(1, 'Oliver Castelblanco Martínez', '79708009', 'Construcciones y demoliciones Oliver Castelblanco', '2016-02-07'),
(2, 'Juan Carlos Rodriguez', '1240563895', 'Representaciones Rodriguez', '2016-02-09'),
(3, 'Gabriel Mejía', '70555222', 'Inversiones Mejía', '2016-02-09'),
(4, 'Sandra Torres', '111222333', 'Torres Inc.', '2016-02-09'),
(5, 'Juliana Martínez', '333555999', 'Martinez y Asociados', '2016-02-09'),
(6, 'Jaime López', '444111222', 'G&R Asociados', '2016-02-09'),
(7, 'María Alejandra González Rodriguez', '222333444', 'G&R Asociados', '2016-02-09'),
(8, 'Andrés Benavides', '888999000', 'G&R Asociados', '2016-02-09'),
(9, 'Pedro Sánchez', '777111444', 'Sánchez e Hijos', '2016-02-09'),
(10, 'José Yepes', '888555222', 'Yepes y Yepes', '2016-02-09');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`);

--
-- Indices de la tabla `listadocursos`
--
ALTER TABLE `listadocursos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `listadocursos`
--
ALTER TABLE `listadocursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

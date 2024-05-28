-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-05-2024 a las 08:20:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `miniproyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `bio` varchar(300) DEFAULT NULL,
  `phone` int(9) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `password`, `name`, `bio`, `phone`, `image`) VALUES
(1, 'yonalva@gmail.com', 'yonalx03', 'yonax alvbringas', 'me gusta comer y dormir', 99955666, NULL),
(2, 'axel@gmail.com', 'axel1234', 'axel lee', 'ya van 2 años que no me eh bañado', 945612378, '1716532852244-500_333.jpeg'),
(9, 'carlos@gmail.com', 'carlos134', 'carlos zeledonn', 'no me baño porq es para debiles', 921461337, '1716603163034-40726883_702.jpg'),
(10, 'juanluis@gmail.com', '$2b$10$gf6', 'juan junior', 'no me alimento porq quiero ver grasa', 945888129, '1716698283727-40726883_702.jpg'),
(11, 'maria@gmail.com', '$2b$10$Bcv', 'maria brina', 'ahi andamos', 912345671, '1716708579185-40726883_702.jpg'),
(12, 'nashe@gmail.com', '$2b$10$j6WMIzAwRn1Sp', 'nashe cocu', 'pos si quien mas', 916343645, '1716710264271-40726883_702.jpg'),
(13, 'aver@gmail.com', '$2b$10$aQUwP2CEBk9KjzMnQLZ5EOosvwmakKwuKFpnEjywuHtqiKgTh6fte', 'Aver alva', 'funciona porfis', 944441222, '1716710377985-40726883_702.jpg'),
(14, 'prueba2edit@gmail.com', '$2b$10$dCnws0eAXRzbGWuJH2rXK.KaBnCLh.C3CbRKBq/..syl98iOpQrlW', 'Norma', NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

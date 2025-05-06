-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: ws_producto_db
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `imagen` varchar(255) DEFAULT NULL,
  `slug` varchar(100) NOT NULL,
  `orden` int DEFAULT '0',
  `activo` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Herramientas','Herramientas manuales y eléctricas','herramientas.jpg','herramientas',1,1,'2025-05-05 18:15:29','2025-05-05 18:15:29'),(4,'Herramientas Manuales','Herramientas que no requieren electricidad','herramientas-manuales.jpg','herramientas-manuales',1,1,'2025-05-06 19:53:38','2025-05-06 19:53:38'),(5,'Herramientas Eléctricas','Herramientas con alimentación eléctrica','herramientas-electricas.jpg','herramientas-electricas',2,1,'2025-05-06 19:53:38','2025-05-06 19:53:38'),(6,'Materiales de Construcción','Materiales básicos para construcción','materiales.jpg','materiales-construccion',3,1,'2025-05-06 19:53:38','2025-05-06 19:53:38'),(7,'Ferretería General','Artículos diversos de ferretería','ferreteria.jpg','ferreteria-general',4,1,'2025-05-06 19:53:38','2025-05-06 19:53:38');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especificaciones_producto`
--

DROP TABLE IF EXISTS `especificaciones_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especificaciones_producto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `producto_id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `valor` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `especificaciones_producto_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especificaciones_producto`
--

LOCK TABLES `especificaciones_producto` WRITE;
/*!40000 ALTER TABLE `especificaciones_producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `especificaciones_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes_producto`
--

DROP TABLE IF EXISTS `imagenes_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes_producto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `producto_id` int NOT NULL,
  `url` varchar(255) NOT NULL,
  `orden` int DEFAULT '0',
  `es_principal` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `imagenes_producto_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes_producto`
--

LOCK TABLES `imagenes_producto` WRITE;
/*!40000 ALTER TABLE `imagenes_producto` DISABLE KEYS */;
INSERT INTO `imagenes_producto` VALUES (1,1,'martillo-carpintero-1.jpg',1,1,'2025-05-06 19:54:18'),(2,1,'martillo-carpintero-2.jpg',2,0,'2025-05-06 19:54:18'),(6,1,'martillo-carpintero-1.jpg',1,1,'2025-05-06 20:04:18'),(7,1,'martillo-carpintero-2.jpg',2,0,'2025-05-06 20:04:18');
/*!40000 ALTER TABLE `imagenes_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `activo` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'DeWalt','dewalt-logo.png','Marca líder en herramientas profesionales',1,'2025-05-06 19:53:55','2025-05-06 19:53:55'),(2,'Bosch','bosch-logo.png','Herramientas de alta calidad y precisión',1,'2025-05-06 19:53:55','2025-05-06 19:53:55'),(3,'Stanley','stanley-logo.png','Marca con tradición en herramientas manuales',1,'2025-05-06 19:53:55','2025-05-06 19:53:55'),(4,'Black & Decker','black-decker-logo.png','Herramientas para el hogar y bricolaje',1,'2025-05-06 19:53:55','2025-05-06 19:53:55'),(5,'Makita','makita-logo.png','Especialistas en herramientas eléctricas',1,'2025-05-06 19:53:55','2025-05-06 19:53:55');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(50) NOT NULL COMMENT 'Código interno del producto',
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `precio_oferta` decimal(10,2) DEFAULT NULL,
  `marca_id` int DEFAULT NULL,
  `categoria_id` int NOT NULL,
  `subcategoria_id` int DEFAULT NULL,
  `destacado` tinyint(1) DEFAULT '0',
  `nuevo` tinyint(1) DEFAULT '0',
  `activo` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  KEY `idx_productos_categoria` (`categoria_id`),
  KEY `idx_productos_subcategoria` (`subcategoria_id`),
  KEY `idx_productos_marca` (`marca_id`),
  KEY `idx_productos_codigo` (`codigo`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`id`) ON DELETE SET NULL,
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`subcategoria_id`) REFERENCES `subcategorias` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'HM001','Martillo de Carpintero 16oz','Martillo de carpintero con mango ergonómico y cabeza de acero forjado',15.99,NULL,3,4,1,1,0,1,'2025-05-06 19:54:03','2025-05-06 20:04:28'),(2,'HM002','Juego de Destornilladores 6 piezas','Set de destornilladores Phillips y planos con mango antideslizante',12.50,NULL,3,1,2,0,0,1,'2025-05-06 19:54:03','2025-05-06 19:54:03'),(3,'HM003','Alicate Universal 8\"','Alicate de uso general con mango aislado',8.75,NULL,3,1,3,0,0,1,'2025-05-06 19:54:03','2025-05-06 19:54:03'),(4,'HM004','Juego de Llaves Combinadas 8-19mm','Set de llaves combinadas en medidas métricas',29.99,NULL,3,1,4,1,0,1,'2025-05-06 19:54:03','2025-05-06 19:54:03'),(17,'HM101','Martillo de Carpintero 16oz','Martillo de carpintero con mango ergonómico y cabeza de acero forjado',15.99,NULL,3,4,1,1,0,1,'2025-05-06 20:02:56','2025-05-06 20:02:56'),(18,'HM102','Juego de Destornilladores 6 piezas','Set de destornilladores Phillips y planos con mango antideslizante',12.50,NULL,3,4,2,0,0,1,'2025-05-06 20:02:56','2025-05-06 20:02:56'),(19,'HM103','Alicate Universal 8\"','Alicate de uso general con mango aislado',8.75,NULL,3,4,3,0,0,1,'2025-05-06 20:02:56','2025-05-06 20:02:56'),(20,'HM104','Juego de Llaves Combinadas 8-19mm','Set de llaves combinadas en medidas métricas',29.99,NULL,3,4,4,1,0,1,'2025-05-06 20:02:56','2025-05-06 20:02:56'),(21,'HE001','Taladro Percutor 750W','Taladro percutor con potencia de 750W y portabrocas de 13mm',89.99,79.99,1,5,17,1,1,1,'2025-05-06 20:04:13','2025-05-06 20:04:13'),(22,'HE002','Sierra Circular 1200W','Sierra circular con disco de 7-1/4\" y guía láser',129.50,NULL,2,5,18,1,0,1,'2025-05-06 20:04:13','2025-05-06 20:04:13'),(23,'HE003','Lijadora Orbital 300W','Lijadora orbital con sistema de recolección de polvo',45.75,39.99,4,5,19,0,1,1,'2025-05-06 20:04:13','2025-05-06 20:04:13'),(24,'HE004','Soldadora Inverter 200A','Soldadora por arco con tecnología inverter',199.99,NULL,5,5,20,1,0,1,'2025-05-06 20:04:13','2025-05-06 20:04:13');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategorias`
--

DROP TABLE IF EXISTS `subcategorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoria_id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `imagen` varchar(255) DEFAULT NULL,
  `slug` varchar(100) NOT NULL,
  `orden` int DEFAULT '0',
  `activo` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_subcategorias_categoria` (`categoria_id`),
  CONSTRAINT `subcategorias_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategorias`
--

LOCK TABLES `subcategorias` WRITE;
/*!40000 ALTER TABLE `subcategorias` DISABLE KEYS */;
INSERT INTO `subcategorias` VALUES (1,1,'Martillos','Todo tipo de martillos',NULL,'martillos',1,1,'2025-05-06 19:53:45','2025-05-06 19:53:45'),(2,1,'Destornilladores','Destornilladores de diferentes tipos',NULL,'destornilladores',2,1,'2025-05-06 19:53:45','2025-05-06 19:53:45'),(3,1,'Alicates','Alicates y pinzas',NULL,'alicates',3,1,'2025-05-06 19:53:45','2025-05-06 19:53:45'),(4,1,'Llaves','Llaves de diferentes tipos y tamaños',NULL,'llaves',4,1,'2025-05-06 19:53:45','2025-05-06 19:53:45'),(17,5,'Taladros','Taladros eléctricos y percutores',NULL,'taladros',1,1,'2025-05-06 19:56:59','2025-05-06 19:56:59'),(18,5,'Sierras','Sierras eléctricas',NULL,'sierras',2,1,'2025-05-06 19:56:59','2025-05-06 19:56:59'),(19,5,'Lijadoras','Lijadoras eléctricas',NULL,'lijadoras',3,1,'2025-05-06 19:56:59','2025-05-06 19:56:59'),(20,5,'Soldadoras','Equipos de soldadura',NULL,'soldadoras',4,1,'2025-05-06 19:56:59','2025-05-06 19:56:59');
/*!40000 ALTER TABLE `subcategorias` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-06 16:34:49

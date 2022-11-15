/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Estrutura do banco de dados para Nome do seu BD
CREATE DATABASE IF NOT EXISTS `Nome do seu BD` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `Nome do seu BD`;

-- Estrutura para tabela Financeiro
CREATE TABLE IF NOT EXISTS `Financeiro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idPessoa` int(11) NOT NULL,
  `idMoeda` int(11) NOT NULL,
  `valor` decimal(12,2) NOT NULL,
  `dtHr` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tipo` char(2) DEFAULT NULL,
  `documento` varchar(100) DEFAULT NULL,
  `chave` varchar(100) DEFAULT NULL,
  `idTrans` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Financeiro_Pessoas` (`idPessoa`),
  KEY `fk_Financeiro_Moedas` (`idMoeda`),
  CONSTRAINT `fk_Financeiro_Moedas` FOREIGN KEY (`idMoeda`) REFERENCES `Moedas` (`id`),
  CONSTRAINT `fk_Financeiro_Pessoas` FOREIGN KEY (`idPessoa`) REFERENCES `Pessoas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=latin1;


-- Estrutura para tabela Jogos
CREATE TABLE IF NOT EXISTS `Jogos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) NOT NULL,
  `apostaMin` decimal(12,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;


-- Estrutura para tabela Moedas
CREATE TABLE IF NOT EXISTS `Moedas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) NOT NULL,
  `aceitaDebito` char(1) DEFAULT 'N',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;


-- Estrutura para tabela Pessoas
CREATE TABLE IF NOT EXISTS `Pessoas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `cpf` char(14) NOT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `dtNascimento` date NOT NULL,
  `celular` varchar(14) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=latin1;


-- Estrutura para tabela Rodadas
CREATE TABLE IF NOT EXISTS `Rodadas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idPessoa` int(11) NOT NULL,
  `idJogo` int(11) NOT NULL,
  `dtHr` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `vlrAposta` decimal(12,2) NOT NULL,
  `vlrGanho` decimal(12,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Rodadas_Pessoas` (`idPessoa`),
  KEY `fk_Rodadaso_Jogos` (`idJogo`),
  CONSTRAINT `fk_Rodadas_Pessoas` FOREIGN KEY (`idPessoa`) REFERENCES `Pessoas` (`id`),
  CONSTRAINT `fk_Rodadaso_Jogos` FOREIGN KEY (`idJogo`) REFERENCES `Jogos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=latin1;


-- Estrutura para tabela Usuarios
CREATE TABLE IF NOT EXISTS `Usuarios` (
  `login` varchar(30) NOT NULL,
  `senha` varchar(250) NOT NULL,
  `idPessoa` int(11) NOT NULL,
  PRIMARY KEY (`login`),
  KEY `fk_Usuarios_Pessoas` (`idPessoa`),
  CONSTRAINT `fk_Usuarios_Pessoas` FOREIGN KEY (`idPessoa`) REFERENCES `Pessoas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

-- --------------------------------------------------------
-- Servidor:                     186.193.152.31
-- Versão do servidor:           5.6.36 - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura para tabela sjt.area_nivel_acesso
CREATE TABLE IF NOT EXISTS `area_nivel_acesso` (
	`id_area_nivel_acesso` int(11) NOT NULL AUTO_INCREMENT,
	`area_area_nivel_acesso` varchar(200) NOT NULL,
	`demostrativo_area_nivel_acesso` varchar(200) NOT NULL,
	`bool_list_area_nivel_acesso` int(1) NOT NULL DEFAULT '1',
	`bool_insert_area_nivel_acesso` int(1) NOT NULL DEFAULT '1',
	`bool_update_area_nivel_acesso` int(1) NOT NULL DEFAULT '1',
	`nivel_acesso_id` int(11) NOT NULL,
	`data_atualizacao_area_nivel_acesso` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`usuario_id` int(11) NOT NULL,
	`bool_ativo_area_nivel_acesso` int(11) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id_area_nivel_acesso`),
	KEY `fk_area_nivel_acesso<>usuario` (`usuario_id`),
	KEY `fk_area_nivel_acesso<>nivel_acesso` (`nivel_acesso_id`),
	CONSTRAINT `fk_area_nivel_acesso<>nivel_acesso` FOREIGN KEY (`nivel_acesso_id`) REFERENCES `nivel_acesso` (`id_nivel_acesso`),
	CONSTRAINT `fk_area_nivel_acesso<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=364 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela sjt.area_nivel_acesso: ~45 rows (aproximadamente)
DELETE FROM `area_nivel_acesso`;
/*!40000 ALTER TABLE `area_nivel_acesso` DISABLE KEYS */;
INSERT INTO `area_nivel_acesso` (`id_area_nivel_acesso`, `area_area_nivel_acesso`, `demostrativo_area_nivel_acesso`, `bool_list_area_nivel_acesso`, `bool_insert_area_nivel_acesso`, `bool_update_area_nivel_acesso`, `nivel_acesso_id`, `data_atualizacao_area_nivel_acesso`, `usuario_id`, `bool_ativo_area_nivel_acesso`) VALUES
(358, 'upload', 'Upload', 1, 1, 1, 1, '2018-07-27 14:37:20', 1, 1),
(359, 'mapa', 'Mapa', 1, 1, 1, 1, '2018-07-27 14:37:20', 1, 1),
(360, 'mov', 'Mov', 1, 1, 1, 1, '2018-07-27 14:37:20', 1, 1),
(361, 'relatorio', 'Relatório', 1, 1, 1, 1, '2018-07-27 14:37:20', 1, 1),
(362, 'notificacao', 'Notificação', 1, 1, 1, 1, '2018-07-27 14:37:20', 1, 1),
(363, 'usuario', 'Usuário', 1, 1, 1, 1, '2018-07-27 14:37:20', 1, 1);
/*!40000 ALTER TABLE `area_nivel_acesso` ENABLE KEYS */;

-- Copiando estrutura para tabela sjt.dht11
CREATE TABLE IF NOT EXISTS `dht11` (
	`id_dht11` int(11) NOT NULL AUTO_INCREMENT,
	`descricao_dht11` varchar(200) NOT NULL,
	`umidade_dht11` float NOT NULL,
	`temperatura_dht11` float NOT NULL,
	`data_atualizacao_dht11` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`usuario_id` int(11) NOT NULL,
	`bool_ativo_dht11` int(11) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id_dht11`),
	KEY `fk_dht11<>usuario` (`usuario_id`),
	CONSTRAINT `fk_dht11<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela sjt.dht11: ~0 rows (aproximadamente)
DELETE FROM `dht11`;
/*!40000 ALTER TABLE `dht11` DISABLE KEYS */;
INSERT INTO `dht11` (`id_dht11`, `descricao_dht11`, `umidade_dht11`, `temperatura_dht11`, `data_atualizacao_dht11`, `usuario_id`, `bool_ativo_dht11`) VALUES
(1, 'ESP Jack', 95, 23, '2018-10-18 01:30:38', 1, 1);
/*!40000 ALTER TABLE `dht11` ENABLE KEYS */;

-- Copiando estrutura para tabela sjt.nivel_acesso
CREATE TABLE IF NOT EXISTS `nivel_acesso` (
	`id_nivel_acesso` int(11) NOT NULL AUTO_INCREMENT,
	`descricao_nivel_acesso` varchar(200) NOT NULL,
	`area_nivel_acesso` text NOT NULL,
	`data_atualizacao_nivel_acesso` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`usuario_id` int(11) NOT NULL,
	`bool_ativo_nivel_acesso` int(11) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id_nivel_acesso`),
	KEY `fk_nivel_acesso<>usuario` (`usuario_id`),
	CONSTRAINT `fk_nivel_acesso<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela sjt.nivel_acesso: ~0 rows (aproximadamente)
DELETE FROM `nivel_acesso`;
/*!40000 ALTER TABLE `nivel_acesso` DISABLE KEYS */;
INSERT INTO `nivel_acesso` (`id_nivel_acesso`, `descricao_nivel_acesso`, `area_nivel_acesso`, `data_atualizacao_nivel_acesso`, `usuario_id`, `bool_ativo_nivel_acesso`) VALUES
(1, 'Nivel Administrador', 'configurar_site+contato+grupo+item+new_sjt+quem_somos+saiba_mais+situacao+videos+orcamento-cliente_site+item_orcamento-orcamento+cards-configurar_site+destaque_grupo-configurar_site+endereco_site-configurar_site+slide_show-configurar_site+loja-configurar_site+topicos_loja-loja+adicional_site-saiba_mais+paginas-new_sjt+fotos-item+item-grupo+upload+mapa+mov+relatorio+notificacao+usuario', '2018-07-27 14:37:18', 1, 1),
(2, 'SJT', '', '2018-07-26 10:04:00', 1, 1);
/*!40000 ALTER TABLE `nivel_acesso` ENABLE KEYS */;

-- Copiando estrutura para tabela sjt.notificacoes
CREATE TABLE IF NOT EXISTS `notificacoes` (
	`id_notificacoes` int(11) NOT NULL AUTO_INCREMENT,
	`descricao_notificacoes` text NOT NULL,
	`usuario_atuador_notificacoes` varchar(200) NOT NULL,
	`usuaio_requerente_notificacoes` varchar(200) NOT NULL,
	`tipo_alteracao_notificacoes` enum('i','u','d') NOT NULL,
	`notificacoes_config_id` int(200) NOT NULL,
	`bool_view_notificacoes` int(1) NOT NULL,
	`data_atualizacao_notificacoes` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`bool_ativo_notificacoes` int(1) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id_notificacoes`),
	KEY `fk_notificacoes<>notificacoes_config` (`notificacoes_config_id`),
	CONSTRAINT `fk_notificacoes<>notificacoes_config` FOREIGN KEY (`notificacoes_config_id`) REFERENCES `notificacoes_config` (`id_notificacoes_config`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela sjt.notificacoes: ~0 rows (aproximadamente)
DELETE FROM `notificacoes`;
/*!40000 ALTER TABLE `notificacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacoes` ENABLE KEYS */;

-- Copiando estrutura para tabela sjt.notificacoes_config
CREATE TABLE IF NOT EXISTS `notificacoes_config` (
	`id_notificacoes_config` int(11) NOT NULL AUTO_INCREMENT,
	`area_notificacoes_config` varchar(200) NOT NULL,
	`tipo_alteracao_notificacoes_config` varchar(100) NOT NULL,
	`data_atualizacao_notificacoes_config` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`usuario_id` int(11) NOT NULL,
	`bool_ativo_notificacoes_config` int(11) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id_notificacoes_config`),
	KEY `fk_notificacoes_config<>usuario` (`usuario_id`),
	CONSTRAINT `fk_notificacoes_config<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela sjt.notificacoes_config: ~0 rows (aproximadamente)
DELETE FROM `notificacoes_config`;
/*!40000 ALTER TABLE `notificacoes_config` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacoes_config` ENABLE KEYS */;

-- Copiando estrutura para tabela sjt.notificacoes_pendentes
CREATE TABLE IF NOT EXISTS `notificacoes_pendentes` (
	`id_notificacoes_pendentes` int(11) NOT NULL AUTO_INCREMENT,
	`descricao_notificacoes_pendentes` text NOT NULL,
	`usuario_atuador_notificacoes_pendentes` varchar(200) NOT NULL,
	`usuaio_requerente_notificacoes_pendentes` varchar(200) NOT NULL,
	`tipo_alteracao_notificacoes_pendentes` enum('i','u','d') NOT NULL,
	`notificacoes_config_id` int(200) NOT NULL,
	`data_atualizacao_notificacoes_pendentes` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`bool_ativo_notificacoes_pendentes` int(1) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id_notificacoes_pendentes`),
	KEY `fk_notificacoes_pendentes<>notificacoes_config` (`notificacoes_config_id`),
	CONSTRAINT `fk_notificacoes_pendentes<>notificacoes_config` FOREIGN KEY (`notificacoes_config_id`) REFERENCES `notificacoes_config` (`id_notificacoes_config`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela sjt.notificacoes_pendentes: ~0 rows (aproximadamente)
DELETE FROM `notificacoes_pendentes`;
/*!40000 ALTER TABLE `notificacoes_pendentes` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacoes_pendentes` ENABLE KEYS */;

-- Copiando estrutura para tabela sjt.notificacoes_salvas
CREATE TABLE IF NOT EXISTS `notificacoes_salvas` (
	`id_notificacoes_salvas` int(11) NOT NULL AUTO_INCREMENT,
	`descricao_notificacoes_salvas` text NOT NULL,
	`usuario_atuador_notificacoes_salvas` varchar(200) NOT NULL,
	`usuaio_requerente_notificacoes_salvas` varchar(200) NOT NULL,
	`tipo_alteracao_notificacoes_salvas` varchar(50) NOT NULL,
	`notificacoes_config_id` int(200) NOT NULL,
	`data_atualizacao_notificacoes_salvas` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`bool_ativo_notificacoes_salvas` int(1) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id_notificacoes_salvas`),
	KEY `fk_notificacoes_salvas<>notificacoes_config` (`notificacoes_config_id`),
	CONSTRAINT `fk_notificacoes_salvas<>notificacoes_config` FOREIGN KEY (`notificacoes_config_id`) REFERENCES `notificacoes_config` (`id_notificacoes_config`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela sjt.notificacoes_salvas: ~0 rows (aproximadamente)
DELETE FROM `notificacoes_salvas`;
/*!40000 ALTER TABLE `notificacoes_salvas` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacoes_salvas` ENABLE KEYS */;

-- Copiando estrutura para tabela sjt.relatorios
CREATE TABLE IF NOT EXISTS `relatorios` (
	`id_relatorios` int(11) NOT NULL AUTO_INCREMENT,
	`descricao_relatorios` varchar(200) NOT NULL,
	`tabela_relatorios` varchar(200) NOT NULL,
	`colunas_relatorios` text NOT NULL,
	`colunas_estrangeiras_relatorios` text NOT NULL,
	`colunas_filtro_relatorios` text,
	`bool_filtro_ativo_relatorios` int(1) NOT NULL DEFAULT '1',
	`data_atualizacao_relatorios` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`usuario_id` int(11) NOT NULL,
	`bool_emitir_relatorios` int(1) NOT NULL DEFAULT '0',
	`bool_ativo_relatorios` int(1) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id_relatorios`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela sjt.relatorios: ~0 rows (aproximadamente)
DELETE FROM `relatorios`;
/*!40000 ALTER TABLE `relatorios` DISABLE KEYS */;
/*!40000 ALTER TABLE `relatorios` ENABLE KEYS */;

-- Copiando estrutura para tabela sjt.relatorio_tabela
CREATE TABLE IF NOT EXISTS `relatorio_tabela` (
	`id_relatorio_tabela` int(11) NOT NULL AUTO_INCREMENT,
	`descricao_relatorio_tabela` varchar(200) NOT NULL,
	`data_atualizacao_relatorio_tabela` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`bool_ativo_relatorio_tabela` int(1) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id_relatorio_tabela`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela sjt.relatorio_tabela: ~0 rows (aproximadamente)
DELETE FROM `relatorio_tabela`;
/*!40000 ALTER TABLE `relatorio_tabela` DISABLE KEYS */;
/*!40000 ALTER TABLE `relatorio_tabela` ENABLE KEYS */;

-- Copiando estrutura para tabela sjt.upload_arq
CREATE TABLE IF NOT EXISTS `upload_arq` (
	`id_upload_arq` int(11) NOT NULL AUTO_INCREMENT,
	`descricao_upload_arq` varchar(100) NOT NULL,
	`tipo_upload_arq` varchar(100) NOT NULL,
	`data_atualizacaoupload_arq` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`bool_ativo_upload_arq` int(1) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id_upload_arq`)
) ENGINE=InnoDB AUTO_INCREMENT=325 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela sjt.upload_arq: ~6 rows (aproximadamente)
DELETE FROM `upload_arq`;
/*!40000 ALTER TABLE `upload_arq` DISABLE KEYS */;
INSERT INTO `upload_arq` (`id_upload_arq`, `descricao_upload_arq`, `tipo_upload_arq`, `data_atualizacaoupload_arq`, `bool_ativo_upload_arq`) VALUES
(318, 'residencia_montevidel.png', 'imagem', '2018-07-26 10:36:52', 1),
(319, 'residencia_berlin46.png', 'imagem', '2018-07-26 10:37:24', 1),
(320, 'residecial_berlin34_slide.png', 'imagem', '2018-07-26 13:33:17', 1),
(321, 'residencial_berlin46_slide.png', 'imagem', '2018-07-26 13:33:36', 1),
(322, 'residencial_montevidel_slide.png', 'imagem', '2018-07-26 13:33:51', 1),
(323, 'residencial_paris_slide.png', 'imagem', '2018-07-26 13:34:08', 1),
(324, 'icon.png', 'imagem', '2018-07-28 09:45:12', 1);
/*!40000 ALTER TABLE `upload_arq` ENABLE KEYS */;

-- Copiando estrutura para tabela sjt.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
	`id_usuario` int(11) NOT NULL AUTO_INCREMENT,
	`nome_usuario` varchar(200) DEFAULT NULL,
	`login_usuario` char(3) DEFAULT NULL,
	`senha_usuario` varchar(100) DEFAULT NULL,
	`nivel_acesso_id` int(11) NOT NULL DEFAULT '1',
	`bool_ativo_usuario` int(1) DEFAULT '1',
	PRIMARY KEY (`id_usuario`),
	UNIQUE KEY `Login` (`login_usuario`),
	KEY `fk_usuario<>nivel_acesso` (`nivel_acesso_id`),
	CONSTRAINT `fk_usuario<>nivel_acesso` FOREIGN KEY (`nivel_acesso_id`) REFERENCES `nivel_acesso` (`id_nivel_acesso`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela sjt.usuario: ~2 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id_usuario`, `nome_usuario`, `login_usuario`, `senha_usuario`, `nivel_acesso_id`, `bool_ativo_usuario`) VALUES
(1, 'ADMINISTRADOR', 'ADM', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 1, 1),
(2, 'SITE', 'SIT', '*C737C0A2F678ACBE092353610475CC003320E65E', 1, 1),
(3, 'ESP', 'ESP', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 1, 1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

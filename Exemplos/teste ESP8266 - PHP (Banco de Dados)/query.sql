CREATE TABLE `weather` (
  `wea_id` int(11) NOT NULL AUTO_INCREMENT,
  `wea_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `wea_temp` float NOT NULL,
  `wea_humid` float NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
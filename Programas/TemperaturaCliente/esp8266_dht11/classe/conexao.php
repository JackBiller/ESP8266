
<?php
class Conexao {
	private static $conexao = null;
	
	function __construct() {
		
		/*$db_host = "localhost";
		$db_nome = "esp_net";
		$db_usuario = "root";
		$db_senha = "";
		$db_driver = "mysql";*/

		$db_host = "186.193.152.31";
        $db_nome = "sjt";
        $db_usuario = "sjtcdi";
        $db_senha = "Teste123!@#";
        $db_driver = "mysql";
		
		
		try{
			# Atribui o objeto PDO à variável $conexao.
			self::$conexao = new PDO("$db_driver:host=$db_host; dbname=$db_nome", $db_usuario, $db_senha, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
			# Garante que o PDO lance exceções durante erros.
			self::$conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		catch (PDOException $e){
			# Então não carrega nada mais da página.
			echo 'ERROR: ' . $e->getMessage();
		}
	}
	private function __clone() {}

	private function __wakeup() {}
	
	public static function Connect() {
		if(!isset(self::$conexao)) {            
			new Conexao();
		}
		return self::$conexao;
	}
}
?>

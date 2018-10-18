
<?php
session_start();
require_once "../classe/conexao.php";
require_once "../classe/entidade/Usuario.php";
require_once "funcoes.php";

$tabela = "usuario";
$login_campo = "login_usuario";
$senha_campo = "senha_usuario";

$telaLogada = "index";

if (!empty($_POST['login']) && !empty($_POST['senha'])) {
	$usuario = new Usuario();

	$loginPost = tratarString($_POST['login']);
	$senhaPost = tratarString($_POST['senha']);
	// echo $senhaPost . " - " . $loginPost;
	$contLogin = 0;
	
	$conn = new Conexao();
	$pdo = $conn->Connect();
	$sql = "SELECT *
			FROM $tabela 
			WHERE $login_campo = '$loginPost' 
			AND $senha_campo = PASSWORD('$senhaPost')
			AND bool_ativo_$tabela = 1;";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		// echo "logado";
		$usuario->set($dados['id_usuario'], "login");
		$usuario->set($dados['nome_usuario'], "nome");
		$contLogin++;
	}

	if ($contLogin == 0) {
		$usuario->set("Login inválido!", "debug");
	}
	echo toJson($usuario);
}

if (!empty($_POST['deslogar'])) {
	// session_destroy();
}

function tratarString($texto){
	$texto = str_replace("\\", "\\\\", $texto);
	$texto = str_replace("\"", "\\\"", $texto);
	$texto = str_replace("'", "\\'", $texto);

	$texto = str_replace("=", "", $texto);

	return $texto;
}


?>


<?php

require_once "../classe/conexao.php";
require_once "funcoes.php";
require_once "../classe/entidade/PadraoObjeto.php";
require_once "../classe/entidade/Dht11.php";


$conn = new Conexao();
$pdo = $conn->Connect();


/*if (!empty($_POST['usuarioID'])) {
	$usuarioID = $_POST['usuarioID'];
} else {
	echo "0";
	return false;
}*/


if (!empty($_REQUEST['gravar'])) {
	$dht11 = new Dht11();
	$dht11->set($_REQUEST['id'],  "id_dht11");
	$dht11->set($_REQUEST['umid'],  "umidade_dht11");
	$dht11->set($_REQUEST['temp'],  "temperatura_dht11");
	$dht11->set($_REQUEST['usu'],  "usuario_id");
	// descricao_dht11
	// data_atualizacao_dht11
	// bool_ativo_dht11
	
	/* Validação */
	$cont = 0;

	$sql = "SELECT id_dht11 FROM dht11 WHERE id_dht11 = " . $dht11->get("id_dht11");
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) { $cont++; }
	
	if($cont == 0){
		$sql = "INSERT INTO dht11 
					(
						id_dht11, 
						descricao_dht11, 
						umidade_dht11, 
						temperatura_dht11
					) 
				VALUES 
					(
						".$dht11->get("id_dht11").", 
						'".(!empty($_REQUEST['desc']) ? $_REQUEST['desc'] : 'ESP266' )."', 
						".$dht11->get('umidade_dht11').", 
						".$dht11->get('temperatura_dht11')."
					)";
	} else {
		$sql = "UPDATE dht11 
				SET 
					umidade_dht11 = " . $dht11->get("umidade_dht11").", 
					temperatura_dht11 = " . $dht11->get("temperatura_dht11")."
				WHERE
					id_dht11 = " . $dht11->get("id_dht11");
	}
	$verifica = $pdo->prepare($sql);
	echo $verifica->execute();
}

if (!empty($_REQUEST['consulta'])) {
	$dht11 = new Dht11();
	$id = !empty($_REQUEST['ip']) ? $_REQUEST['id']  : 1;
	$sql = "SELECT * FROM dht11 WHERE id_dht11 = $id";
	$verifica = $pdo->query($sql);
	$cont = 0;
	foreach ($verifica as $dados) { 
		$cont++; 
		$dht11->set($dados['id_dht11'],  				"id_dht11"				);
		$dht11->set($dados['descricao_dht11'],  		"descricao_dht11"		);
		$dht11->set($dados['umidade_dht11'],  			"umidade_dht11"			);
		$dht11->set($dados['temperatura_dht11'],  		"temperatura_dht11"		);
		$dht11->set($dados['data_atualizacao_dht11'], 	"data_atualizacao_dht11");
		$dht11->set($dados['usuario_id'],  				"usuario_id"			);
		$dht11->set($dados['bool_ativo_dht11'],  		"bool_ativo_dht11"		);
		$dht11->set($dados['umidade_dht11'], 			'umid'					);
		$dht11->set($dados['temperatura_dht11'], 		'temp'					);
	}
	if($cont == 0) $dht11->set("Falha: não conseguiu encontar registro!", 'debug');

	echo toJson($dht11);
}


?>
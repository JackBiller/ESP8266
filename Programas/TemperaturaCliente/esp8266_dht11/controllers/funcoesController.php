<?php


require_once "../classe/conexao.php";
$conn = new Conexao();
$pdo = $conn->Connect();


if (!empty($_POST['autentica'])) {
	$login = $_POST['login'];
	$senha = $_POST['senha'];
	$n_autenicou = true;

	$sql = "SELECT ID_MOTORISTA FROM motorista
			WHERE LOGIN = '$login'
			AND SENHA = '$senha' LIMIT 1";

	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$n_autenicou = false;
		listarEntregas($dados['ID_MOTORISTA'], $pdo);
	}
	if ($n_autenicou) echo "0";
}

/*if (!empty($_POST['listarEntregas'])) {
	$id = $_POST['id'];
	listarEntregas($id);
}*/

if (!empty($_GET['listarEntregas'])) {
	$id = $_GET['id'];
	listarEntregas($id, $pdo);
}

function listarEntregas($id, $pdo){
	$caminhao = "";$motorista = "";
	$consultaJson = ""; $arrayEntregas = ""; $auxVirgula = "";
	$arrayPedidos = []; $descArrayPedidos = ""; $arrayLocalEntregaDesc = "";
	$preResultado = "<center><h1>Entregas</h1></center>";
	$prefixoCompleto = "";
	
	$objetoCliente = "";
	$arrayTelefones = "";

	$resultado = "
		<div id='mapa'></div>
		<div id='paginaEntrega' class='col-md-10' style='display: none;'>
		<table class='table'>
			<tr>
				<td><b>Entrega</b></td>
				<td><b>Confirmar</b></td>
			</tr>
		";
	$cont = 0;


	$sql = "SELECT 
				-- viagem simples item
				lanc_entrega_itens.ID_LANC_ENTREGA_ITENS, 
				lanc_entrega_itens.LATITUDE,
				lanc_entrega_itens.LONGITUDE,
				lanc_entrega_itens.NOTAFISCAL,
				lanc_entrega_itens.LOCAL_ENTREGA,
				-- lanc_entrega_itens.localizacao_lanc_entrega_itens,
				lanc_entrega_itens.CK_ENTREGUE AS bool_confirma_entrega,
				
				-- caminhao
				tabveiculos.id_Veiculo AS id_caminhao, 
				tabveiculos.PLACA  AS placa_caminhao, 
				tabveiculos.LATITUDE AS latitude_caminhao, 
				tabveiculos.LONGITUDE AS longitude_caminhao, 
				
				-- viagem simples
				lanc_entrega.ID_LANC_ENTREGA,
				-- lanc_entrega.origem_viagem_simples, 
				-- lanc_entrega.destino_viagem_simples,
				
				-- motorista
				motorista.ID_MOTORISTA,
				motorista.DS_MOTORISTA
			FROM lanc_entrega_itens lanc_entrega_itens
			INNER JOIN lanc_entrega lanc_entrega 
				ON lanc_entrega_itens.ID_LANC_ENTREGA = lanc_entrega.ID_LANC_ENTREGA
			INNER JOIN tabveiculos tabveiculos 
				ON lanc_entrega.ID_VEICULO = tabveiculos.id_Veiculo
			INNER JOIN motorista motorista
				ON lanc_entrega.ID_MOTORISTA = motorista.ID_MOTORISTA
			WHERE lanc_entrega.ID_MOTORISTA = $id
			AND lanc_entrega.CK_INATIVO = 0
			AND lanc_entrega_itens.CK_INATIVO = 0
			AND lanc_entrega.CK_ENTREGUE = 0
			AND lanc_entrega.ID_LANC_ENTREGA = (
				SELECT ID_LANC_ENTREGA 
				FROM lanc_entrega 
				WHERE lanc_entrega.ID_VEICULO = tabveiculos.id_Veiculo
				AND lanc_entrega.ID_MOTORISTA = $id
				-- AND lanc_entrega.bool_ativo = 1
				ORDER BY ID_LANC_ENTREGA LIMIT 1
			)
			ORDER BY lanc_entrega.ID_LANC_ENTREGA DESC";
			/* VERIFICAR SE A VIEGEM ESTA ATIVA TAMBEM: AND lanc_entrega.bool_ativo_viagem_item = 1;"; */
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {

		$arrayPedidos = explode(",", $descArrayPedidos);
		if (!in_array($dados['NOTAFISCAL'], $arrayPedidos)) {
			$auxVirgula = $descArrayPedidos == "" ? "" : ",";
			$descArrayPedidos .= $auxVirgula.$dados['NOTAFISCAL'];

			$cont++;
			$caminhao = "
				<table class='table' style='margin-top: -15px;'>
					<tr>
						<td align='left'>
							<h4>Caminhão: ".$dados['placa_caminhao']."</h4>
							<!--h3 id='latitude_longitude_real'></h3-->
						</td>
						<td align='right' id='botaoCantoSuperior'>
							<button class='btn btn-dafault' onclick='abrirPaginaEntregas()'>
								<i class='fa fa-box'></i>&nbsp;&nbsp;Entregas
							</button>
						</td>
					</tr>
				</table>
				";
			// $motorista = "<h3>Motorista: ".$dados['nome_motorista']."</h3>";
			$prefixoCompleto = $preResultado.$caminhao;//.$motorista;
			
			$resultado .= "	<tr>
					<td>".$dados['LATITUDE'].",".$dados['LONGITUDE']."</td>
					<td>
						<button class='btn' onclick='/*confirmaEnterga(".$dados['ID_LANC_ENTREGA_ITENS'].")*/'>
							<i class='fa fa-check'></i>&nbsp;Confirmar
						</button>
					</td>
				</tr>
			";


			$arrayTelefones = "";
			$sql = "SELECT
					cliefornec.CODIGO AS cliente_id,
					cliefornec.RAZAOSOCIAL AS nome_cliente,
					cliefornec_telefone.Telefone AS telefone_cliente_contato
				FROM cliefornec_telefone cliefornec_telefone
				INNER JOIN cliefornec cliefornec
					ON cliefornec_telefone.Cliente = cliefornec.CODIGO
				INNER JOIN lanc_entrega_itens lanc_entrega_itens
					ON cliefornec.CODIGO = lanc_entrega_itens.CLIENTE
				WHERE lanc_entrega_itens.ID_LANC_ENTREGA_ITENS = ".$dados['ID_LANC_ENTREGA_ITENS'];
			$verifica = $pdo->query($sql);
			foreach ($verifica as $dados1) {
				$auxVirgula = $arrayTelefones == '' ? '' : ',';
				$arrayTelefones .= $auxVirgula.'"'.$dados1['telefone_cliente_contato'].'"';
				$objetoCliente = '"cliente":{
							"codigo":'.$dados1['cliente_id'].',
							"nome":"'.$dados1['nome_cliente'].'",
							"telefone":['.$arrayTelefones.']
						}';
			}


			$auxVirgula = $arrayEntregas == "" ? "" : ",";
			$arrayEntregas .= $auxVirgula."{
						\"codigo\":".$dados['ID_LANC_ENTREGA_ITENS'].",
						\"endEntrega\": \"".$dados['LATITUDE'].",".$dados['LONGITUDE']."\",
						\"descEndEndrega\": \"\",
						\"pedido\": \"".$dados['NOTAFISCAL']."\",
						\"bool_entrega\": ".$dados['bool_confirma_entrega'].",
						$objetoCliente
					}";


			$consultaJson = "{
				\"codigo\": ".$dados['ID_LANC_ENTREGA'].",
				\"endInicial\": \"-21.78593779334913,-46.56324505805969\",
				\"endFinal\": \"-21.78593779334913,-46.56324505805969\",
				\"endEntrega\": [".$arrayEntregas."
				],
				\"caminhao\": {
					\"codigo\":".$dados['id_caminhao'].",
					\"placa\":\"".$dados['placa_caminhao']."\",
					\"latitude\":\"".$dados['latitude_caminhao']."\",
					\"longitude\":\"".$dados['longitude_caminhao']."\"
				},
				\"motorista\": {
					\"codigo\": \"".$dados['ID_MOTORISTA']."\",
					\"nome\": \"".$dados['DS_MOTORISTA']."\"
				},
				\"distancia\":0,
				\"duracao\":0
			}";

			$auxVirgula = $arrayLocalEntregaDesc == "" ? "" : "+";
			$arrayLocalEntregaDesc .= $auxVirgula.$dados['LOCAL_ENTREGA'];
		}
		
	}
	$resultado = $cont == 0 ? "Nenhum resultado!/,/[]" : $prefixoCompleto.$resultado."</table></div>/,/$consultaJson/,/$arrayLocalEntregaDesc";
	echo $resultado;
}


if (!empty($_POST['pasquesaPacote'])) {
	$id = $_POST['id'];
	$arrayEntregas = "";
	$sql = "SELECT * FROM lanc_entrega_itens WHERE ID_LANC_ENTREGA_ITENS = $id";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$arrayEntregas = "{
			\"codigo\":".$dados['ID_LANC_ENTREGA_ITENS'].",
			\"endEntrega\": \"".$dados['LATITUDE'].",".$dados['LONGITUDE']."\",
			\"pedido\": \"".$dados['NOTAFISCAL']."\",
			\"bool_entrega\": ".$dados['CK_ENTREGUE']."
		}"; // ".$dados['bool_confirma_entrega']."
	}
	echo $arrayEntregas;
}



if (!empty($_POST['confirmaEnterga'])){
	$pedido = $_POST['pedido'];
	$entrega = $_POST['entrega'];

	$sql = "UPDATE lanc_entrega_itens SET CK_ENTREGUE = 1 WHERE NOTAFISCAL = $pedido; AND ID_LANC_ENTREGA = $entrega";
	$verifica = $pdo->prepare($sql);
	echo $verifica->execute();
}


if (!empty($_POST['cancelarEnterga'])){
	$pedido = $_POST['pedido'];
	$entrega = $_POST['entrega'];

	$sql = "UPDATE lanc_entrega_itens SET CK_ENTREGUE = 0 WHERE NOTAFISCAL = $pedido; AND ID_LANC_ENTREGA = $entrega";
	$verifica = $pdo->prepare($sql);
	echo $verifica->execute();
}



if (!empty($_POST['atualizarPosicao'])) {
	$id_caminhao = $_POST['id_caminhao'];
	$latitude = $_POST['latitude'];
	$longitude = $_POST['longitude'];

	$sql = "UPDATE tabveiculos 
			SET 
				LATITUDE = $latitude, 
				LONGITUDE = $longitude
			WHERE id_Veiculo = $id_caminhao";
	$verifica = $pdo->prepare($sql);
	echo $verifica->execute();

}


function tratarString($texto){
	$texto = str_replace("\\", "\\\\", $texto);
	$texto = str_replace("\"", "\\\"", $texto);
	$texto = str_replace("'", "\\'", $texto);
	$texto = str_replace("=", "", $texto);

	return $texto;
}



/*function tratarString($texto){
	$texto = str_replace("\\", "\\\\", $texto);
	$texto = str_replace("\"", "\\\"", $texto);
	$texto = str_replace("'", "\\'", $texto);

	$texto = str_replace("=", "", $texto);

	return $texto;
}*/



/***************************************************************************************************************/
/* Provavelmente não irá usar */
/***************************************************************************************************************/
/*if (!empty($_POST['listarCaminhoesD'])) {
	$resultado = "
		<table class'table'>
			<tr>
				<td><b>Placa</b></td>
				<td><b>Selecionar</b></td>
			</tr>
		";
	$cont = 0;
	$sql = "SELECT * FROM caminhao WHERE bool_disponivel_caminhao = 1";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$cont++;
		$resultado .= "	<tr>
				<td>".$dados['placa_caminhao']."</td>
				<td>
					<button onclick='selecionarCaminhao(".$dados['id_caminhao'].")' class='btn'>
						Selecionar&nbsp;<i class='fa fa-arrow-right'></i>
					</button>
				</td>
			</tr>
		";
	}
	$resultado = $cont == 0 ? "Nenhum resultado!" : $resultado."</table>";

	echo $resultado;
}*/


if (!empty($_POST['entrarCaminhao'])) {
	$id = $_POST['id'];
	$motorista = $_POST['motorista'];
	$sql = "UPDATE viagem_simples SET motorista_viagem_simples = '$motorista' WHERE placa_viagem_simples = $id";
	$verifica = $pdo->prepare($sql);
	$verifica->execute();
	$sql = "UPDATE caminhao SET bool_disponivel_caminhao = 0 WHERE id_caminhao = $id";
	$verifica = $pdo->prepare($sql);
	echo $verifica->execute();
}



if (!empty($_POST['sairCaminhao'])) {
	$id = $_POST['id'];
	$sql = "UPDATE viagem_simples SET motorista_viagem_simples = '0' WHERE placa_viagem_simples = $id";
	$verifica = $pdo->prepare($sql);
	$verifica->execute();
	$sql = "UPDATE caminhao SET bool_disponivel_caminhao = 1 WHERE id_caminhao = $id";
	$verifica = $pdo->prepare($sql);
	echo $verifica->execute();
}



?>
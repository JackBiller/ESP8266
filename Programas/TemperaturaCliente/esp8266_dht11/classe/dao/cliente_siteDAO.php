
<?php 
require_once "../classe/conexao.php";

class cliente_siteDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraCliente_site(Cliente_site $entidadeCliente_site){
		try{
			$param = array(
				':nome_cliente_site'=>$entidadeCliente_site->get('nome_cliente_site'), 
				':login_cliente_site'=>$entidadeCliente_site->get('login_cliente_site'), 
				':senha_cliente_site'=>$entidadeCliente_site->get('senha_cliente_site'), 
				':telefone_cliente_site'=>$entidadeCliente_site->get('telefone_cliente_site'), 
				':celular_cliente_site'=>$entidadeCliente_site->get('celular_cliente_site'), 
				':endereco_cliente_site'=>$entidadeCliente_site->get('endereco_cliente_site'), 
				':numero_cliente_site'=>$entidadeCliente_site->get('numero_cliente_site'), 
				':complemento_cliente_site'=>$entidadeCliente_site->get('complemento_cliente_site'), 
				':bairro_cliente_site'=>$entidadeCliente_site->get('bairro_cliente_site'), 
				':cidade_cliente_site'=>$entidadeCliente_site->get('cidade_cliente_site'), 
				':estado_id'=>$entidadeCliente_site->get('estado_id'), 
				':cep_cliente_site'=>$entidadeCliente_site->get('cep_cliente_site'), 
				':bool_ativo_cliente_site'=>$entidadeCliente_site->get('bool_ativo_cliente_site')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO cliente_site (nome_cliente_site, login_cliente_site, senha_cliente_site, telefone_cliente_site, celular_cliente_site, endereco_cliente_site, numero_cliente_site, complemento_cliente_site, bairro_cliente_site, cidade_cliente_site, estado_id, cep_cliente_site, bool_ativo_cliente_site) VALUES (:nome_cliente_site, :login_cliente_site, PASSWORD(:senha_cliente_site), :telefone_cliente_site, :celular_cliente_site, :endereco_cliente_site, :numero_cliente_site, :complemento_cliente_site, :bairro_cliente_site, :cidade_cliente_site, :estado_id, :cep_cliente_site, :bool_ativo_cliente_site);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Cliente_site ".$ex->getMessage();
		}
	}
	function atualizaCliente_site(Cliente_site $entidadeCliente_site, $id){
		try{
			$param = array(
				':nome_cliente_site'=>$entidadeCliente_site->get('nome_cliente_site'), 
				':login_cliente_site'=>$entidadeCliente_site->get('login_cliente_site'), 
				':telefone_cliente_site'=>$entidadeCliente_site->get('telefone_cliente_site'), 
				':celular_cliente_site'=>$entidadeCliente_site->get('celular_cliente_site'), 
				':endereco_cliente_site'=>$entidadeCliente_site->get('endereco_cliente_site'), 
				':numero_cliente_site'=>$entidadeCliente_site->get('numero_cliente_site'), 
				':complemento_cliente_site'=>$entidadeCliente_site->get('complemento_cliente_site'), 
				':bairro_cliente_site'=>$entidadeCliente_site->get('bairro_cliente_site'), 
				':cidade_cliente_site'=>$entidadeCliente_site->get('cidade_cliente_site'), 
				':estado_id'=>$entidadeCliente_site->get('estado_id'), 
				':cep_cliente_site'=>$entidadeCliente_site->get('cep_cliente_site'), 
				':bool_ativo_cliente_site'=>$entidadeCliente_site->get('bool_ativo_cliente_site')
			);

			$stmt = $this->pdo->prepare("UPDATE cliente_site SET nome_cliente_site = :nome_cliente_site, login_cliente_site = :login_cliente_site, telefone_cliente_site = :telefone_cliente_site, celular_cliente_site = :celular_cliente_site, endereco_cliente_site = :endereco_cliente_site, numero_cliente_site = :numero_cliente_site, complemento_cliente_site = :complemento_cliente_site, bairro_cliente_site = :bairro_cliente_site, cidade_cliente_site = :cidade_cliente_site, estado_id = :estado_id, cep_cliente_site = :cep_cliente_site, bool_ativo_cliente_site = :bool_ativo_cliente_site WHERE id_cliente_site = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Cliente_site ".$ex->getMessage();
		}
	}
}
?>

<?php 
require_once "../classe/conexao.php";

class saiba_maisDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraSaiba_mais(Saiba_mais $entidadeSaiba_mais){
		try{
			$param = array(
				':descricao_saiba_mais'=>$entidadeSaiba_mais->get('descricao_saiba_mais'), 
				':usuario_id'=>$entidadeSaiba_mais->get('usuario_id'), 
				':bool_ativo_saiba_mais'=>$entidadeSaiba_mais->get('bool_ativo_saiba_mais')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO saiba_mais (descricao_saiba_mais, usuario_id, bool_ativo_saiba_mais) VALUES (:descricao_saiba_mais, :usuario_id, :bool_ativo_saiba_mais);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Saiba_mais ".$ex->getMessage();
		}
	}
	function atualizaSaiba_mais(Saiba_mais $entidadeSaiba_mais, $id){
		try{
			$param = array(
				':descricao_saiba_mais'=>$entidadeSaiba_mais->get('descricao_saiba_mais'), 
				':usuario_id'=>$entidadeSaiba_mais->get('usuario_id'), 
				':bool_ativo_saiba_mais'=>$entidadeSaiba_mais->get('bool_ativo_saiba_mais')
			);

			$stmt = $this->pdo->prepare("UPDATE saiba_mais SET descricao_saiba_mais = :descricao_saiba_mais, usuario_id = :usuario_id, bool_ativo_saiba_mais = :bool_ativo_saiba_mais WHERE id_saiba_mais = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Saiba_mais ".$ex->getMessage();
		}
	}
}
?>
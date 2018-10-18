
<?php 
require_once "../classe/conexao.php";

class estadoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraEstado(Estado $entidadeEstado){
		try{
			$param = array(
				':descricao_estado'=>$entidadeEstado->get('descricao_estado'), 
				':sigla_estado'=>$entidadeEstado->get('sigla_estado'), 
				':bool_ativo_estado'=>$entidadeEstado->get('bool_ativo_estado')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO estado (descricao_estado, sigla_estado, bool_ativo_estado) VALUES (:descricao_estado, :sigla_estado, :bool_ativo_estado);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Estado ".$ex->getMessage();
		}
	}
	function atualizaEstado(Estado $entidadeEstado, $id){
		try{
			$param = array(
				':descricao_estado'=>$entidadeEstado->get('descricao_estado'), 
				':sigla_estado'=>$entidadeEstado->get('sigla_estado'), 
				':bool_ativo_estado'=>$entidadeEstado->get('bool_ativo_estado')
			);

			$stmt = $this->pdo->prepare("UPDATE estado SET descricao_estado = :descricao_estado, sigla_estado = :sigla_estado, bool_ativo_estado = :bool_ativo_estado WHERE id_estado = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Estado ".$ex->getMessage();
		}
	}
}
?>
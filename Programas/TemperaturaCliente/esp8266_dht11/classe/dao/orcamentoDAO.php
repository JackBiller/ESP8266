
<?php 
require_once "../classe/conexao.php";

class orcamentoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraOrcamento(Orcamento $entidadeOrcamento){
		try{
			$param = array(
				':descricao_orcamento'=>$entidadeOrcamento->get('descricao_orcamento'), 
				':cliente_site_id'=>$entidadeOrcamento->get('cliente_site_id'), 
				':bool_ativo_orcamento'=>$entidadeOrcamento->get('bool_ativo_orcamento')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO orcamento (descricao_orcamento, cliente_site_id, bool_ativo_orcamento) VALUES (:descricao_orcamento, :cliente_site_id, :bool_ativo_orcamento);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Orcamento ".$ex->getMessage();
		}
	}
	function atualizaOrcamento(Orcamento $entidadeOrcamento, $id){
		try{
			$param = array(
				':descricao_orcamento'=>$entidadeOrcamento->get('descricao_orcamento'), 
				':cliente_site_id'=>$entidadeOrcamento->get('cliente_site_id'), 
				':bool_ativo_orcamento'=>$entidadeOrcamento->get('bool_ativo_orcamento')
			);

			$stmt = $this->pdo->prepare("UPDATE orcamento SET descricao_orcamento = :descricao_orcamento, cliente_site_id = :cliente_site_id, bool_ativo_orcamento = :bool_ativo_orcamento WHERE id_orcamento = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Orcamento ".$ex->getMessage();
		}
	}
}
?>
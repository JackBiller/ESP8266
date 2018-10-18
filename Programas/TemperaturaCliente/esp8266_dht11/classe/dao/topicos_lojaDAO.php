
<?php 
require_once "../classe/conexao.php";

class topicos_lojaDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraTopicos_loja(Topicos_loja $entidadeTopicos_loja){
		try{
			$param = array(
				':titulo_topicos_loja'=>$entidadeTopicos_loja->get('titulo_topicos_loja'), 
				':descricao_topicos_loja'=>$entidadeTopicos_loja->get('descricao_topicos_loja'), 
				':loja_id'=>$entidadeTopicos_loja->get('loja_id'), 
				':bool_ativo_topicos_loja'=>$entidadeTopicos_loja->get('bool_ativo_topicos_loja')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO topicos_loja (titulo_topicos_loja, descricao_topicos_loja, loja_id, bool_ativo_topicos_loja) VALUES (:titulo_topicos_loja, :descricao_topicos_loja, :loja_id, :bool_ativo_topicos_loja);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Topicos_loja ".$ex->getMessage();
		}
	}
	function atualizaTopicos_loja(Topicos_loja $entidadeTopicos_loja, $id){
		try{
			$param = array(
				':titulo_topicos_loja'=>$entidadeTopicos_loja->get('titulo_topicos_loja'), 
				':descricao_topicos_loja'=>$entidadeTopicos_loja->get('descricao_topicos_loja'), 
				':loja_id'=>$entidadeTopicos_loja->get('loja_id'), 
				':bool_ativo_topicos_loja'=>$entidadeTopicos_loja->get('bool_ativo_topicos_loja')
			);

			$stmt = $this->pdo->prepare("UPDATE topicos_loja SET titulo_topicos_loja = :titulo_topicos_loja, descricao_topicos_loja = :descricao_topicos_loja, loja_id = :loja_id, bool_ativo_topicos_loja = :bool_ativo_topicos_loja WHERE id_topicos_loja = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Topicos_loja ".$ex->getMessage();
		}
	}
}
?>

<?php 
require_once "../classe/conexao.php";

class item_orcamentoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraItem_orcamento(Item_orcamento $entidadeItem_orcamento){
		try{
			$param = array(
				':orcamento_id'=>$entidadeItem_orcamento->get('orcamento_id'), 
				':item_id'=>$entidadeItem_orcamento->get('item_id'), 
				':quantidade_item_orcamento'=>$entidadeItem_orcamento->get('quantidade_item_orcamento'), 
				':total_item_orcamento'=>$entidadeItem_orcamento->get('total_item_orcamento'), 
				':bool_ativo_item_orcamento'=>$entidadeItem_orcamento->get('bool_ativo_item_orcamento')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO item_orcamento (orcamento_id, item_id, quantidade_item_orcamento, total_item_orcamento, bool_ativo_item_orcamento) VALUES (:orcamento_id, :item_id, :quantidade_item_orcamento, :total_item_orcamento, :bool_ativo_item_orcamento);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Item_orcamento ".$ex->getMessage();
		}
	}
	function atualizaItem_orcamento(Item_orcamento $entidadeItem_orcamento, $id){
		try{
			$param = array(
				':orcamento_id'=>$entidadeItem_orcamento->get('orcamento_id'), 
				':item_id'=>$entidadeItem_orcamento->get('item_id'), 
				':quantidade_item_orcamento'=>$entidadeItem_orcamento->get('quantidade_item_orcamento'), 
				':total_item_orcamento'=>$entidadeItem_orcamento->get('total_item_orcamento'), 
				':bool_ativo_item_orcamento'=>$entidadeItem_orcamento->get('bool_ativo_item_orcamento')
			);

			$stmt = $this->pdo->prepare("UPDATE item_orcamento SET orcamento_id = :orcamento_id, item_id = :item_id, quantidade_item_orcamento = :quantidade_item_orcamento, total_item_orcamento = :total_item_orcamento, bool_ativo_item_orcamento = :bool_ativo_item_orcamento WHERE id_item_orcamento = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Item_orcamento ".$ex->getMessage();
		}
	}
}
?>
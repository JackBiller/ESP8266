
<?php 
require_once "../classe/conexao.php";

class itemDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraItem(Item $entidadeItem){
		try{
			$param = array(
				':descricao_item'=>$entidadeItem->get('descricao_item'), 
				':descricao_site_item'=>$entidadeItem->get('descricao_site_item'), 
				':unidade_medida_item'=>$entidadeItem->get('unidade_medida_item'), 
				':imagem_item'=>$entidadeItem->get('imagem_item'), 
				':grupo_id'=>$entidadeItem->get('grupo_id'), 
				':usuario_id'=>$entidadeItem->get('usuario_id'), 
				':bool_ativo_item'=>$entidadeItem->get('bool_ativo_item')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO item (descricao_item, descricao_site_item, unidade_medida_item, imagem_item, grupo_id, usuario_id, bool_ativo_item) VALUES (:descricao_item, :descricao_site_item, :unidade_medida_item, :imagem_item, :grupo_id, :usuario_id, :bool_ativo_item);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Item ".$ex->getMessage();
		}
	}
	function atualizaItem(Item $entidadeItem, $id){
		try{
			$param = array(
				':descricao_item'=>$entidadeItem->get('descricao_item'), 
				':descricao_site_item'=>$entidadeItem->get('descricao_site_item'), 
				':unidade_medida_item'=>$entidadeItem->get('unidade_medida_item'), 
				':imagem_item'=>$entidadeItem->get('imagem_item'), 
				':grupo_id'=>$entidadeItem->get('grupo_id'), 
				':usuario_id'=>$entidadeItem->get('usuario_id'), 
				':bool_ativo_item'=>$entidadeItem->get('bool_ativo_item')
			);

			$stmt = $this->pdo->prepare("UPDATE item SET descricao_item = :descricao_item, descricao_site_item = :descricao_site_item, unidade_medida_item = :unidade_medida_item, imagem_item = :imagem_item, grupo_id = :grupo_id, usuario_id = :usuario_id, bool_ativo_item = :bool_ativo_item WHERE id_item = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Item ".$ex->getMessage();
		}
	}
}
?>
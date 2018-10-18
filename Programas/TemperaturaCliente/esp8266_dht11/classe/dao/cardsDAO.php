
<?php 
require_once "../classe/conexao.php";

class cardsDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraCards(Cards $entidadeCards){
		try{
			$param = array(
				':titulo_cards'=>$entidadeCards->get('titulo_cards'), 
				':descricao_cards'=>$entidadeCards->get('descricao_cards'), 
				':descricao_item_cards'=>$entidadeCards->get('descricao_item_cards'), 
				':imagem_cards'=>$entidadeCards->get('imagem_cards'), 
				':sequencia_cards'=>$entidadeCards->get('sequencia_cards'), 
				':configurar_site_id'=>$entidadeCards->get('configurar_site_id'), 
				':bool_ativo_cards'=>$entidadeCards->get('bool_ativo_cards')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO cards (titulo_cards, descricao_cards, descricao_item_cards, imagem_cards, sequencia_cards, configurar_site_id, bool_ativo_cards) VALUES (:titulo_cards, :descricao_cards, :descricao_item_cards, :imagem_cards, :sequencia_cards, :configurar_site_id, :bool_ativo_cards);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Cards ".$ex->getMessage();
		}
	}
	function atualizaCards(Cards $entidadeCards, $id){
		try{
			$param = array(
				':titulo_cards'=>$entidadeCards->get('titulo_cards'), 
				':descricao_cards'=>$entidadeCards->get('descricao_cards'), 
				':descricao_item_cards'=>$entidadeCards->get('descricao_item_cards'), 
				':imagem_cards'=>$entidadeCards->get('imagem_cards'), 
				':sequencia_cards'=>$entidadeCards->get('sequencia_cards'), 
				':configurar_site_id'=>$entidadeCards->get('configurar_site_id'), 
				':bool_ativo_cards'=>$entidadeCards->get('bool_ativo_cards')
			);

			$stmt = $this->pdo->prepare("UPDATE cards SET titulo_cards = :titulo_cards, descricao_cards = :descricao_cards, descricao_item_cards = :descricao_item_cards, imagem_cards = :imagem_cards, sequencia_cards = :sequencia_cards, configurar_site_id = :configurar_site_id, bool_ativo_cards = :bool_ativo_cards WHERE id_cards = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Cards ".$ex->getMessage();
		}
	}
}
?>
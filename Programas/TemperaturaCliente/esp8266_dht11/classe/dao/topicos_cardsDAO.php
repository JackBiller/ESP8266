
<?php 
require_once "../classe/conexao.php";

class topicos_cardsDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraTopicos_cards(Topicos_cards $entidadeTopicos_cards){
		try{
			$param = array(
				':descricao_topicos_cards'=>$entidadeTopicos_cards->get('descricao_topicos_cards'), 
				':cards_id'=>$entidadeTopicos_cards->get('cards_id'), 
				':usuario_id'=>$entidadeTopicos_cards->get('usuario_id'), 
				':bool_ativo_topicos_cards'=>$entidadeTopicos_cards->get('bool_ativo_topicos_cards')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO topicos_cards (descricao_topicos_cards, cards_id, usuario_id, bool_ativo_topicos_cards) VALUES (:descricao_topicos_cards, :cards_id, :usuario_id, :bool_ativo_topicos_cards);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Topicos_cards ".$ex->getMessage();
		}
	}
	function atualizaTopicos_cards(Topicos_cards $entidadeTopicos_cards, $id){
		try{
			$param = array(
				':descricao_topicos_cards'=>$entidadeTopicos_cards->get('descricao_topicos_cards'), 
				':cards_id'=>$entidadeTopicos_cards->get('cards_id'), 
				':usuario_id'=>$entidadeTopicos_cards->get('usuario_id'), 
				':bool_ativo_topicos_cards'=>$entidadeTopicos_cards->get('bool_ativo_topicos_cards')
			);

			$stmt = $this->pdo->prepare("UPDATE topicos_cards SET descricao_topicos_cards = :descricao_topicos_cards, cards_id = :cards_id, usuario_id = :usuario_id, bool_ativo_topicos_cards = :bool_ativo_topicos_cards WHERE id_topicos_cards = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Topicos_cards ".$ex->getMessage();
		}
	}
}
?>
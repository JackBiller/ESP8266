
<?php 
require_once "../classe/conexao.php";

class quem_somosDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraQuem_somos(Quem_somos $entidadeQuem_somos){
		try{
			$param = array(
				':titulo_quem_somos'=>$entidadeQuem_somos->get('titulo_quem_somos'), 
				':descricao_quem_somos'=>$entidadeQuem_somos->get('descricao_quem_somos'), 
				':imagem_quem_somos'=>$entidadeQuem_somos->get('imagem_quem_somos'), 
				':bool_ativo_quem_somos'=>$entidadeQuem_somos->get('bool_ativo_quem_somos')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO quem_somos (titulo_quem_somos, descricao_quem_somos, imagem_quem_somos, bool_ativo_quem_somos) VALUES (:titulo_quem_somos, :descricao_quem_somos, :imagem_quem_somos, :bool_ativo_quem_somos);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Quem_somos ".$ex->getMessage();
		}
	}
	function atualizaQuem_somos(Quem_somos $entidadeQuem_somos, $id){
		try{
			$param = array(
				':titulo_quem_somos'=>$entidadeQuem_somos->get('titulo_quem_somos'), 
				':descricao_quem_somos'=>$entidadeQuem_somos->get('descricao_quem_somos'), 
				':imagem_quem_somos'=>$entidadeQuem_somos->get('imagem_quem_somos'), 
				':bool_ativo_quem_somos'=>$entidadeQuem_somos->get('bool_ativo_quem_somos')
			);

			$stmt = $this->pdo->prepare("UPDATE quem_somos SET titulo_quem_somos = :titulo_quem_somos, descricao_quem_somos = :descricao_quem_somos, imagem_quem_somos = :imagem_quem_somos, bool_ativo_quem_somos = :bool_ativo_quem_somos WHERE id_quem_somos = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Quem_somos ".$ex->getMessage();
		}
	}
}
?>
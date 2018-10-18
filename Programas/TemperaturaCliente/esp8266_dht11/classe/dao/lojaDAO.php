
<?php 
require_once "../classe/conexao.php";

class lojaDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraLoja(Loja $entidadeLoja){
		try{
			$param = array(
				':titulo_loja'=>$entidadeLoja->get('titulo_loja'), 
				':descricao_loja'=>$entidadeLoja->get('descricao_loja'), 
				':imagem_loja'=>$entidadeLoja->get('imagem_loja'), 
				':configurar_site_id'=>$entidadeLoja->get('configurar_site_id'), 
				':bool_ativo_loja'=>$entidadeLoja->get('bool_ativo_loja')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO loja (titulo_loja, descricao_loja, imagem_loja, configurar_site_id, bool_ativo_loja) VALUES (:titulo_loja, :descricao_loja, :imagem_loja, :configurar_site_id, :bool_ativo_loja);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Loja ".$ex->getMessage();
		}
	}
	function atualizaLoja(Loja $entidadeLoja, $id){
		try{
			$param = array(
				':titulo_loja'=>$entidadeLoja->get('titulo_loja'), 
				':descricao_loja'=>$entidadeLoja->get('descricao_loja'), 
				':imagem_loja'=>$entidadeLoja->get('imagem_loja'), 
				':configurar_site_id'=>$entidadeLoja->get('configurar_site_id'), 
				':bool_ativo_loja'=>$entidadeLoja->get('bool_ativo_loja')
			);

			$stmt = $this->pdo->prepare("UPDATE loja SET titulo_loja = :titulo_loja, descricao_loja = :descricao_loja, imagem_loja = :imagem_loja, configurar_site_id = :configurar_site_id, bool_ativo_loja = :bool_ativo_loja WHERE id_loja = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Loja ".$ex->getMessage();
		}
	}
}
?>
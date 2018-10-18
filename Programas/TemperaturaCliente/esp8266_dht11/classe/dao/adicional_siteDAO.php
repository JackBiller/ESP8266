
<?php 
require_once "../classe/conexao.php";

class adicional_siteDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraAdicional_site(Adicional_site $entidadeAdicional_site){
		try{
			$param = array(
				':titulo_adicional_site'=>$entidadeAdicional_site->get('titulo_adicional_site'), 
				':descricao_adicional_site'=>$entidadeAdicional_site->get('descricao_adicional_site'), 
				':imagem_adicional_site'=>$entidadeAdicional_site->get('imagem_adicional_site'), 
				':saiba_mais_id'=>$entidadeAdicional_site->get('saiba_mais_id'), 
				':usuario_id'=>$entidadeAdicional_site->get('usuario_id'), 
				':bool_ativo_adicional_site'=>$entidadeAdicional_site->get('bool_ativo_adicional_site')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO adicional_site (titulo_adicional_site, descricao_adicional_site, imagem_adicional_site, saiba_mais_id, usuario_id, bool_ativo_adicional_site) VALUES (:titulo_adicional_site, :descricao_adicional_site, :imagem_adicional_site, :saiba_mais_id, :usuario_id, :bool_ativo_adicional_site);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Adicional_site ".$ex->getMessage();
		}
	}
	function atualizaAdicional_site(Adicional_site $entidadeAdicional_site, $id){
		try{
			$param = array(
				':titulo_adicional_site'=>$entidadeAdicional_site->get('titulo_adicional_site'), 
				':descricao_adicional_site'=>$entidadeAdicional_site->get('descricao_adicional_site'), 
				':imagem_adicional_site'=>$entidadeAdicional_site->get('imagem_adicional_site'), 
				':saiba_mais_id'=>$entidadeAdicional_site->get('saiba_mais_id'), 
				':usuario_id'=>$entidadeAdicional_site->get('usuario_id'), 
				':bool_ativo_adicional_site'=>$entidadeAdicional_site->get('bool_ativo_adicional_site')
			);

			$stmt = $this->pdo->prepare("UPDATE adicional_site SET titulo_adicional_site = :titulo_adicional_site, descricao_adicional_site = :descricao_adicional_site, imagem_adicional_site = :imagem_adicional_site, saiba_mais_id = :saiba_mais_id, usuario_id = :usuario_id, bool_ativo_adicional_site = :bool_ativo_adicional_site WHERE id_adicional_site = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Adicional_site ".$ex->getMessage();
		}
	}
}
?>
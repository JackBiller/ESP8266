
<?php 
require_once "../classe/conexao.php";

class destaque_grupoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraDestaque_grupo(Destaque_grupo $entidadeDestaque_grupo){
		try{
			$param = array(
				':titulo_destaque_grupo'=>$entidadeDestaque_grupo->get('titulo_destaque_grupo'), 
				':grupo_id'=>$entidadeDestaque_grupo->get('grupo_id'), 
				':imagem_destaque_grupo'=>$entidadeDestaque_grupo->get('imagem_destaque_grupo'), 
				':descricao_destaque_grupo'=>$entidadeDestaque_grupo->get('descricao_destaque_grupo'), 
				':configurar_site_id'=>$entidadeDestaque_grupo->get('configurar_site_id'), 
				':bool_ativo_destaque_grupo'=>$entidadeDestaque_grupo->get('bool_ativo_destaque_grupo')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO destaque_grupo (titulo_destaque_grupo, grupo_id, imagem_destaque_grupo, descricao_destaque_grupo, configurar_site_id, bool_ativo_destaque_grupo) VALUES (:titulo_destaque_grupo, :grupo_id, :imagem_destaque_grupo, :descricao_destaque_grupo, :configurar_site_id, :bool_ativo_destaque_grupo);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Destaque_grupo ".$ex->getMessage();
		}
	}
	function atualizaDestaque_grupo(Destaque_grupo $entidadeDestaque_grupo, $id){
		try{
			$param = array(
				':titulo_destaque_grupo'=>$entidadeDestaque_grupo->get('titulo_destaque_grupo'), 
				':grupo_id'=>$entidadeDestaque_grupo->get('grupo_id'), 
				':imagem_destaque_grupo'=>$entidadeDestaque_grupo->get('imagem_destaque_grupo'), 
				':descricao_destaque_grupo'=>$entidadeDestaque_grupo->get('descricao_destaque_grupo'), 
				':configurar_site_id'=>$entidadeDestaque_grupo->get('configurar_site_id'), 
				':bool_ativo_destaque_grupo'=>$entidadeDestaque_grupo->get('bool_ativo_destaque_grupo')
			);

			$stmt = $this->pdo->prepare("UPDATE destaque_grupo SET titulo_destaque_grupo = :titulo_destaque_grupo, grupo_id = :grupo_id, imagem_destaque_grupo = :imagem_destaque_grupo, descricao_destaque_grupo = :descricao_destaque_grupo, configurar_site_id = :configurar_site_id, bool_ativo_destaque_grupo = :bool_ativo_destaque_grupo WHERE id_destaque_grupo = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Destaque_grupo ".$ex->getMessage();
		}
	}
}
?>
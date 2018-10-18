
<?php 
require_once "../classe/conexao.php";

class slide_showDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraSlide_show(Slide_show $entidadeSlide_show){
		try{
			$param = array(
				':titulo_slide_show'=>$entidadeSlide_show->get('titulo_slide_show'), 
				':descricao_slide_show'=>$entidadeSlide_show->get('descricao_slide_show'), 
				':imagem_slide_show'=>$entidadeSlide_show->get('imagem_slide_show'), 
				':configurar_site_id'=>$entidadeSlide_show->get('configurar_site_id'), 
				':bool_ativo_slide_show'=>$entidadeSlide_show->get('bool_ativo_slide_show')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO slide_show (titulo_slide_show, descricao_slide_show, imagem_slide_show, configurar_site_id, bool_ativo_slide_show) VALUES (:titulo_slide_show, :descricao_slide_show, :imagem_slide_show, :configurar_site_id, :bool_ativo_slide_show);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Slide_show ".$ex->getMessage();
		}
	}
	function atualizaSlide_show(Slide_show $entidadeSlide_show, $id){
		try{
			$param = array(
				':titulo_slide_show'=>$entidadeSlide_show->get('titulo_slide_show'), 
				':descricao_slide_show'=>$entidadeSlide_show->get('descricao_slide_show'), 
				':imagem_slide_show'=>$entidadeSlide_show->get('imagem_slide_show'), 
				':configurar_site_id'=>$entidadeSlide_show->get('configurar_site_id'), 
				':bool_ativo_slide_show'=>$entidadeSlide_show->get('bool_ativo_slide_show')
			);

			$stmt = $this->pdo->prepare("UPDATE slide_show SET titulo_slide_show = :titulo_slide_show, descricao_slide_show = :descricao_slide_show, imagem_slide_show = :imagem_slide_show, configurar_site_id = :configurar_site_id, bool_ativo_slide_show = :bool_ativo_slide_show WHERE id_slide_show = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Slide_show ".$ex->getMessage();
		}
	}
}
?>

<?php 
require_once "../classe/conexao.php";

class videosDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraVideos(Videos $entidadeVideos){
		try{
			$param = array(
				':descricao_videos'=>$entidadeVideos->get('descricao_videos'), 
				':link_videos'=>$entidadeVideos->get('link_videos'), 
				':bool_ativo_videos'=>$entidadeVideos->get('bool_ativo_videos')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO videos (descricao_videos, link_videos, bool_ativo_videos) VALUES (:descricao_videos, :link_videos, :bool_ativo_videos);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Videos ".$ex->getMessage();
		}
	}
	function atualizaVideos(Videos $entidadeVideos, $id){
		try{
			$param = array(
				':descricao_videos'=>$entidadeVideos->get('descricao_videos'), 
				':link_videos'=>$entidadeVideos->get('link_videos'), 
				':bool_ativo_videos'=>$entidadeVideos->get('bool_ativo_videos')
			);

			$stmt = $this->pdo->prepare("UPDATE videos SET descricao_videos = :descricao_videos, link_videos = :link_videos, bool_ativo_videos = :bool_ativo_videos WHERE id_videos = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Videos ".$ex->getMessage();
		}
	}
}
?>
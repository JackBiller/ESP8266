
<?php 
require_once "../classe/conexao.php";

class links_uteisDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraLinks_uteis(Links_uteis $entidadeLinks_uteis){
		try{
			$param = array(
				':descricao_links_uteis'=>$entidadeLinks_uteis->get('descricao_links_uteis'), 
				':link_links_uteis'=>$entidadeLinks_uteis->get('link_links_uteis'), 
				':usuario_id'=>$entidadeLinks_uteis->get('usuario_id'), 
				':bool_ativo_links_uteis'=>$entidadeLinks_uteis->get('bool_ativo_links_uteis')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO links_uteis (descricao_links_uteis, link_links_uteis, usuario_id, bool_ativo_links_uteis) VALUES (:descricao_links_uteis, :link_links_uteis, :usuario_id, :bool_ativo_links_uteis);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Links_uteis ".$ex->getMessage();
		}
	}
	function atualizaLinks_uteis(Links_uteis $entidadeLinks_uteis, $id){
		try{
			$param = array(
				':descricao_links_uteis'=>$entidadeLinks_uteis->get('descricao_links_uteis'), 
				':link_links_uteis'=>$entidadeLinks_uteis->get('link_links_uteis'), 
				':usuario_id'=>$entidadeLinks_uteis->get('usuario_id'), 
				':bool_ativo_links_uteis'=>$entidadeLinks_uteis->get('bool_ativo_links_uteis')
			);

			$stmt = $this->pdo->prepare("UPDATE links_uteis SET descricao_links_uteis = :descricao_links_uteis, link_links_uteis = :link_links_uteis, usuario_id = :usuario_id, bool_ativo_links_uteis = :bool_ativo_links_uteis WHERE id_links_uteis = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Links_uteis ".$ex->getMessage();
		}
	}
}
?>
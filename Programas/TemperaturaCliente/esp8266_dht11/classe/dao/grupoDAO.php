
<?php 
require_once "../classe/conexao.php";

class grupoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraGrupo(Grupo $entidadeGrupo){
		try{
			$param = array(
				':descricao_grupo'=>$entidadeGrupo->get('descricao_grupo'), 
				':usuario_id'=>$entidadeGrupo->get('usuario_id'), 
				':bool_ativo_grupo'=>$entidadeGrupo->get('bool_ativo_grupo')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO grupo (descricao_grupo, usuario_id, bool_ativo_grupo) VALUES (:descricao_grupo, :usuario_id, :bool_ativo_grupo);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Grupo ".$ex->getMessage();
		}
	}
	function atualizaGrupo(Grupo $entidadeGrupo, $id){
		try{
			$param = array(
				':descricao_grupo'=>$entidadeGrupo->get('descricao_grupo'), 
				':usuario_id'=>$entidadeGrupo->get('usuario_id'), 
				':bool_ativo_grupo'=>$entidadeGrupo->get('bool_ativo_grupo')
			);

			$stmt = $this->pdo->prepare("UPDATE grupo SET descricao_grupo = :descricao_grupo, usuario_id = :usuario_id, bool_ativo_grupo = :bool_ativo_grupo WHERE id_grupo = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Grupo ".$ex->getMessage();
		}
	}
}
?>
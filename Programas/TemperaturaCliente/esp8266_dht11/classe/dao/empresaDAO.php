
<?php 
require_once "../classe/conexao.php";

class empresaDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraEmpresa(Empresa $entidadeEmpresa){
		try{
			$param = array(
				':descricao_empresa'=>$entidadeEmpresa->get('descricao_empresa'), 
				':imagem_logo_empresa'=>$entidadeEmpresa->get('imagem_logo_empresa'), 
				':usuario_id'=>$entidadeEmpresa->get('usuario_id'), 
				':bool_ativo_empresa'=>$entidadeEmpresa->get('bool_ativo_empresa')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO empresa (descricao_empresa, imagem_logo_empresa, usuario_id, bool_ativo_empresa) VALUES (:descricao_empresa, :imagem_logo_empresa, :usuario_id, :bool_ativo_empresa);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Empresa ".$ex->getMessage();
		}
	}
	function atualizaEmpresa(Empresa $entidadeEmpresa, $id){
		try{
			$param = array(
				':descricao_empresa'=>$entidadeEmpresa->get('descricao_empresa'), 
				':imagem_logo_empresa'=>$entidadeEmpresa->get('imagem_logo_empresa'), 
				':usuario_id'=>$entidadeEmpresa->get('usuario_id'), 
				':bool_ativo_empresa'=>$entidadeEmpresa->get('bool_ativo_empresa')
			);

			$stmt = $this->pdo->prepare("UPDATE empresa SET descricao_empresa = :descricao_empresa, imagem_logo_empresa = :imagem_logo_empresa, usuario_id = :usuario_id, bool_ativo_empresa = :bool_ativo_empresa WHERE id_empresa = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Empresa ".$ex->getMessage();
		}
	}
}
?>
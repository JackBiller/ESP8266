
<?php 
require_once "../classe/conexao.php";

class cliefornecDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraCliefornec(Cliefornec $entidadeCliefornec){
		try{
			$param = array(
				':CPF_CGC'=>$entidadeCliefornec->get('CPF_CGC'), 
				':RAZAOSOCIAL'=>$entidadeCliefornec->get('RAZAOSOCIAL')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO cliefornec (CPF_CGC, RAZAOSOCIAL) VALUES (:CPF_CGC, :RAZAOSOCIAL);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Cliefornec ".$ex->getMessage();
		}
	}
	function atualizaCliefornec(Cliefornec $entidadeCliefornec, $id){
		try{
			$param = array(
				':CPF_CGC'=>$entidadeCliefornec->get('CPF_CGC'), 
				':RAZAOSOCIAL'=>$entidadeCliefornec->get('RAZAOSOCIAL')
			);

			$stmt = $this->pdo->prepare("UPDATE cliefornec SET CPF_CGC = :CPF_CGC, RAZAOSOCIAL = :RAZAOSOCIAL WHERE CODIGO = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Cliefornec ".$ex->getMessage();
		}
	}
}
?>
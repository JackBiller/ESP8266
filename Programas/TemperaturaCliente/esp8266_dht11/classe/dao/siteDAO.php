
<?php 
require_once "../classe/conexao.php";

class siteDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraSite(Site $entidadeSite){
		try{
			$param = array(
				':NOME_EMPRESA'=>$entidadeSite->get('NOME_EMPRESA'), 
				':NOME_CIDADE'=>$entidadeSite->get('NOME_CIDADE'), 
				':ESTADO'=>$entidadeSite->get('ESTADO'), 
				':FONE'=>$entidadeSite->get('FONE'), 
				':FONE_APP'=>$entidadeSite->get('FONE_APP'), 
				':EMAIL'=>$entidadeSite->get('EMAIL'), 
				':sendusername'=>$entidadeSite->get('sendusername'), 
				':sendpassword'=>$entidadeSite->get('sendpassword'), 
				':smtpserver'=>$entidadeSite->get('smtpserver'), 
				':smtpserverport'=>$entidadeSite->get('smtpserverport'), 
				':MailFrom'=>$entidadeSite->get('MailFrom'), 
				':MailTo'=>$entidadeSite->get('MailTo'), 
				':MailCc'=>$entidadeSite->get('MailCc'), 
				':bool_ativo_site'=>$entidadeSite->get('bool_ativo_site')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO site (NOME_EMPRESA, NOME_CIDADE, ESTADO, FONE, FONE_APP, EMAIL, sendusername, sendpassword, smtpserver, smtpserverport, MailFrom, MailTo, MailCc, bool_ativo_site) VALUES (:NOME_EMPRESA, :NOME_CIDADE, :ESTADO, :FONE, :FONE_APP, :EMAIL, :sendusername, :sendpassword, :smtpserver, :smtpserverport, :MailFrom, :MailTo, :MailCc, :bool_ativo_site);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Site ".$ex->getMessage();
		}
	}
	function atualizaSite(Site $entidadeSite, $id){
		try{
			$param = array(
				':NOME_EMPRESA'=>$entidadeSite->get('NOME_EMPRESA'), 
				':NOME_CIDADE'=>$entidadeSite->get('NOME_CIDADE'), 
				':ESTADO'=>$entidadeSite->get('ESTADO'), 
				':FONE'=>$entidadeSite->get('FONE'), 
				':FONE_APP'=>$entidadeSite->get('FONE_APP'), 
				':EMAIL'=>$entidadeSite->get('EMAIL'), 
				':sendusername'=>$entidadeSite->get('sendusername'), 
				':sendpassword'=>$entidadeSite->get('sendpassword'), 
				':smtpserver'=>$entidadeSite->get('smtpserver'), 
				':smtpserverport'=>$entidadeSite->get('smtpserverport'), 
				':MailFrom'=>$entidadeSite->get('MailFrom'), 
				':MailTo'=>$entidadeSite->get('MailTo'), 
				':MailCc'=>$entidadeSite->get('MailCc'), 
				':bool_ativo_site'=>$entidadeSite->get('bool_ativo_site')
			);

			$stmt = $this->pdo->prepare("UPDATE site SET NOME_EMPRESA = :NOME_EMPRESA, NOME_CIDADE = :NOME_CIDADE, ESTADO = :ESTADO, FONE = :FONE, FONE_APP = :FONE_APP, EMAIL = :EMAIL, sendusername = :sendusername, sendpassword = :sendpassword, smtpserver = :smtpserver, smtpserverport = :smtpserverport, MailFrom = :MailFrom, MailTo = :MailTo, MailCc = :MailCc, bool_ativo_site = :bool_ativo_site WHERE ID_SITE = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Site ".$ex->getMessage();
		}
	}
}
?>
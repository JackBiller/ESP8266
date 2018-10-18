
<?php 
require_once "../classe/conexao.php";

class contatoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraContato(Contato $entidadeContato){
		try{
			$param = array(
				':nome_contato'=>$entidadeContato->get('nome_contato'), 
				':email_contato'=>$entidadeContato->get('email_contato'), 
				':telefone_contato'=>$entidadeContato->get('telefone_contato'), 
				':assunto_contato'=>$entidadeContato->get('assunto_contato'), 
				':mensagem_contato'=>$entidadeContato->get('mensagem_contato'), 
				':usuario_id'=>$entidadeContato->get('usuario_id'), 
				':bool_ativo_contato'=>$entidadeContato->get('bool_ativo_contato')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO contato (nome_contato, email_contato, telefone_contato, assunto_contato, mensagem_contato, usuario_id, bool_ativo_contato) VALUES (:nome_contato, :email_contato, :telefone_contato, :assunto_contato, :mensagem_contato, :usuario_id, :bool_ativo_contato);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Contato ".$ex->getMessage();
		}
	}
	function atualizaContato(Contato $entidadeContato, $id){
		try{
			$param = array(
				':nome_contato'=>$entidadeContato->get('nome_contato'), 
				':email_contato'=>$entidadeContato->get('email_contato'), 
				':telefone_contato'=>$entidadeContato->get('telefone_contato'), 
				':assunto_contato'=>$entidadeContato->get('assunto_contato'), 
				':mensagem_contato'=>$entidadeContato->get('mensagem_contato'), 
				':usuario_id'=>$entidadeContato->get('usuario_id'), 
				':bool_ativo_contato'=>$entidadeContato->get('bool_ativo_contato')
			);

			$stmt = $this->pdo->prepare("UPDATE contato SET nome_contato = :nome_contato, email_contato = :email_contato, telefone_contato = :telefone_contato, assunto_contato = :assunto_contato, mensagem_contato = :mensagem_contato, usuario_id = :usuario_id, bool_ativo_contato = :bool_ativo_contato WHERE id_contato = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Contato ".$ex->getMessage();
		}
	}
}
?>
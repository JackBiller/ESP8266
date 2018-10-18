
<?php 
require_once "../classe/conexao.php";

class endereco_siteDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraEndereco_site(Endereco_site $entidadeEndereco_site){
		try{
			$param = array(
				':descricao_endereco_site'=>$entidadeEndereco_site->get('descricao_endereco_site'), 
				':endereco_endereco_site'=>$entidadeEndereco_site->get('endereco_endereco_site'), 
				':numero_endereco_site'=>$entidadeEndereco_site->get('numero_endereco_site'), 
				':complemento_endereco_site'=>$entidadeEndereco_site->get('complemento_endereco_site'), 
				':bairro_endereco_site'=>$entidadeEndereco_site->get('bairro_endereco_site'), 
				':cidade_endereco_site'=>$entidadeEndereco_site->get('cidade_endereco_site'), 
				':estado_id'=>$entidadeEndereco_site->get('estado_id'), 
				':cep_endereco_site'=>$entidadeEndereco_site->get('cep_endereco_site'), 
				':telefone_endereco_site'=>$entidadeEndereco_site->get('telefone_endereco_site'), 
				':celular_endereco_site'=>$entidadeEndereco_site->get('celular_endereco_site'), 
				':email_endereco_site'=>$entidadeEndereco_site->get('email_endereco_site'), 
				':horario_funcionamento_endereco_site'=>$entidadeEndereco_site->get('horario_funcionamento_endereco_site'), 
				':latitude_endereco_site'=>$entidadeEndereco_site->get('latitude_endereco_site'), 
				':longitude_endereco_site'=>$entidadeEndereco_site->get('longitude_endereco_site'), 
				':configurar_site_id'=>$entidadeEndereco_site->get('configurar_site_id'), 
				':bool_ativo_endereco_site'=>$entidadeEndereco_site->get('bool_ativo_endereco_site')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO endereco_site (descricao_endereco_site, endereco_endereco_site, numero_endereco_site, complemento_endereco_site, bairro_endereco_site, cidade_endereco_site, estado_id, cep_endereco_site, telefone_endereco_site, celular_endereco_site, email_endereco_site, horario_funcionamento_endereco_site, latitude_endereco_site, longitude_endereco_site, configurar_site_id, bool_ativo_endereco_site) VALUES (:descricao_endereco_site, :endereco_endereco_site, :numero_endereco_site, :complemento_endereco_site, :bairro_endereco_site, :cidade_endereco_site, :estado_id, :cep_endereco_site, :telefone_endereco_site, :celular_endereco_site, :email_endereco_site, :horario_funcionamento_endereco_site, :latitude_endereco_site, :longitude_endereco_site, :configurar_site_id, :bool_ativo_endereco_site);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Endereco_site ".$ex->getMessage();
		}
	}
	function atualizaEndereco_site(Endereco_site $entidadeEndereco_site, $id){
		try{
			$param = array(
				':descricao_endereco_site'=>$entidadeEndereco_site->get('descricao_endereco_site'), 
				':endereco_endereco_site'=>$entidadeEndereco_site->get('endereco_endereco_site'), 
				':numero_endereco_site'=>$entidadeEndereco_site->get('numero_endereco_site'), 
				':complemento_endereco_site'=>$entidadeEndereco_site->get('complemento_endereco_site'), 
				':bairro_endereco_site'=>$entidadeEndereco_site->get('bairro_endereco_site'), 
				':cidade_endereco_site'=>$entidadeEndereco_site->get('cidade_endereco_site'), 
				':estado_id'=>$entidadeEndereco_site->get('estado_id'), 
				':cep_endereco_site'=>$entidadeEndereco_site->get('cep_endereco_site'), 
				':telefone_endereco_site'=>$entidadeEndereco_site->get('telefone_endereco_site'), 
				':celular_endereco_site'=>$entidadeEndereco_site->get('celular_endereco_site'), 
				':email_endereco_site'=>$entidadeEndereco_site->get('email_endereco_site'), 
				':horario_funcionamento_endereco_site'=>$entidadeEndereco_site->get('horario_funcionamento_endereco_site'), 
				':latitude_endereco_site'=>$entidadeEndereco_site->get('latitude_endereco_site'), 
				':longitude_endereco_site'=>$entidadeEndereco_site->get('longitude_endereco_site'), 
				':configurar_site_id'=>$entidadeEndereco_site->get('configurar_site_id'), 
				':bool_ativo_endereco_site'=>$entidadeEndereco_site->get('bool_ativo_endereco_site')
			);

			$stmt = $this->pdo->prepare("UPDATE endereco_site SET descricao_endereco_site = :descricao_endereco_site, endereco_endereco_site = :endereco_endereco_site, numero_endereco_site = :numero_endereco_site, complemento_endereco_site = :complemento_endereco_site, bairro_endereco_site = :bairro_endereco_site, cidade_endereco_site = :cidade_endereco_site, estado_id = :estado_id, cep_endereco_site = :cep_endereco_site, telefone_endereco_site = :telefone_endereco_site, celular_endereco_site = :celular_endereco_site, email_endereco_site = :email_endereco_site, horario_funcionamento_endereco_site = :horario_funcionamento_endereco_site, latitude_endereco_site = :latitude_endereco_site, longitude_endereco_site = :longitude_endereco_site, configurar_site_id = :configurar_site_id, bool_ativo_endereco_site = :bool_ativo_endereco_site WHERE id_endereco_site = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Endereco_site ".$ex->getMessage();
		}
	}
}
?>
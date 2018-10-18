
<?php 
require_once "../classe/conexao.php";

class configurar_siteDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraConfigurar_site(Configurar_site $entidadeConfigurar_site){
		try{
			$param = array(
				':titulo_configurar_site'=>$entidadeConfigurar_site->get('titulo_configurar_site'), 
				':titulo_menu_configurar_site'=>$entidadeConfigurar_site->get('titulo_menu_configurar_site'), 
				':cor_pagina_configurar_site'=>$entidadeConfigurar_site->get('cor_pagina_configurar_site'), 
				':contra_cor_pagina_configurar_site'=>$entidadeConfigurar_site->get('contra_cor_pagina_configurar_site'), 
				':imagem_icone_configurar_site'=>$entidadeConfigurar_site->get('imagem_icone_configurar_site'), 
				':imagem_logo_configurar_site'=>$entidadeConfigurar_site->get('imagem_logo_configurar_site'), 
				':imagem_logo_sm_configurar_site'=>$entidadeConfigurar_site->get('imagem_logo_sm_configurar_site'), 
				':bem_vindo_configurar_site'=>$entidadeConfigurar_site->get('bem_vindo_configurar_site'), 
				':bool_ativo_configurar_site'=>$entidadeConfigurar_site->get('bool_ativo_configurar_site')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO configurar_site (titulo_configurar_site, titulo_menu_configurar_site, cor_pagina_configurar_site, contra_cor_pagina_configurar_site, imagem_icone_configurar_site, imagem_logo_configurar_site, imagem_logo_sm_configurar_site, bem_vindo_configurar_site, bool_ativo_configurar_site) VALUES (:titulo_configurar_site, :titulo_menu_configurar_site, :cor_pagina_configurar_site, :contra_cor_pagina_configurar_site, :imagem_icone_configurar_site, :imagem_logo_configurar_site, :imagem_logo_sm_configurar_site, :bem_vindo_configurar_site, :bool_ativo_configurar_site);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Configurar_site ".$ex->getMessage();
		}
	}
	function atualizaConfigurar_site(Configurar_site $entidadeConfigurar_site, $id){
		try{
			$param = array(
				':titulo_configurar_site'=>$entidadeConfigurar_site->get('titulo_configurar_site'), 
				':titulo_menu_configurar_site'=>$entidadeConfigurar_site->get('titulo_menu_configurar_site'), 
				':cor_pagina_configurar_site'=>$entidadeConfigurar_site->get('cor_pagina_configurar_site'), 
				':contra_cor_pagina_configurar_site'=>$entidadeConfigurar_site->get('contra_cor_pagina_configurar_site'), 
				':imagem_icone_configurar_site'=>$entidadeConfigurar_site->get('imagem_icone_configurar_site'), 
				':imagem_logo_configurar_site'=>$entidadeConfigurar_site->get('imagem_logo_configurar_site'), 
				':imagem_logo_sm_configurar_site'=>$entidadeConfigurar_site->get('imagem_logo_sm_configurar_site'), 
				':bem_vindo_configurar_site'=>$entidadeConfigurar_site->get('bem_vindo_configurar_site'), 
				':bool_ativo_configurar_site'=>$entidadeConfigurar_site->get('bool_ativo_configurar_site')
			);

			$stmt = $this->pdo->prepare("UPDATE configurar_site SET titulo_configurar_site = :titulo_configurar_site, titulo_menu_configurar_site = :titulo_menu_configurar_site, cor_pagina_configurar_site = :cor_pagina_configurar_site, contra_cor_pagina_configurar_site = :contra_cor_pagina_configurar_site, imagem_icone_configurar_site = :imagem_icone_configurar_site, imagem_logo_configurar_site = :imagem_logo_configurar_site, imagem_logo_sm_configurar_site = :imagem_logo_sm_configurar_site, bem_vindo_configurar_site = :bem_vindo_configurar_site, bool_ativo_configurar_site = :bool_ativo_configurar_site WHERE id_configurar_site = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Configurar_site ".$ex->getMessage();
		}
	}
}
?>
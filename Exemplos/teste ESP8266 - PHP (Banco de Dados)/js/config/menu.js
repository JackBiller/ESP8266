function menuPrincipal(){
	var jk_config = "";
	jk_config += "<div class='btn-group' role='group' aria-label='...'>";
	jk_config += jk_montarBotaoGrupo(
		"filter", "Filtro", 
		//jk_MontarListaBotaoGrupoImgem(id, imagem, titulo, parametro, accessKey)
		  jk_MontarListaBotaoGrupoImgem("linha_cliente"			, "img/cliente.png"				, "Cliente"				, "_cliente"			, "1")
		+ jk_MontarListaBotaoGrupoImgem("linha_cacamba_cinza"	, "img/cacamba_temp.png"		, "Caçamba Pedida"		, "_cacamba_cinza"		, "2")
		+ jk_MontarListaBotaoGrupoImgem("linha_cacamba_vermelha", "img/cacamba_vermelha.png"	, "Caçamba em Uso"		, "_cacamba_vermelha"	, "3")
		+ jk_MontarListaBotaoGrupoImgem("linha_cacamba_verde"	, "img/cacamba_verde.png"		, "Caçamba há Recolher"	, "_cacamba_verde"		, "4")
		+ jk_MontarListaBotaoGrupoImgem("linha_caminhao"		, "img/truck.png"				, "Caminhão"			, "_caminhao"			, "5")
	);

	jk_config += jk_montarBotaoGrupo(
		"plus", "Caçamba", 
		//jk_MontarListaBotaoGrupoModal(id, click, icon, titulo, accessKey, idModal)
		  jk_MontarListaBotaoGrupoModal("buttonCacambaResidencial", "listarClientesCombo();montarComboBuscaCacambaModal();", "home", "Rápida", "r", "modalAdicinarMarcador")
		+ jk_MontarListaBotaoGrupoModal("buttonCacambaCliente", "", "building-o", "Detalhada", "g", "modalcacambaCliente")
		+ jk_MontarListaBotaoTela("buttonMovimentacao", "chamarTelaMovimentacao();", "users", "Movimentação", "w")
	);

	jk_config += jk_montarBotaoGrupo(
		"list-ul", "Cadastro", 
		//jk_MontarListaBotaoTela(id, click, icon, titulo, accessKey)
		  jk_MontarListaBotaoTela("buttonCliente", "chamarTelaCliente();", "users", "Cliente", "c")
		+ jk_MontarListaBotaoTela("buttonCacambaCadastro", "chamarTelaCacamba();", "archive", "Caçamba", "q")
		+ jk_MontarListaBotaoTela("buttonCaminhao", "chamarTelaCaminhao();", "truck", "Caminhão", "t")
		+ jk_MontarListaBotaoTela("buttonMotorista", "chamarTelaMotorista();", "card", "Motrista", "m")
	);

	jk_config += jk_button( "buttonAtualizar", "default", "", "u", "atualizaPosicaoCaminhao();atualizaCacamba();", jk_icon("refresh")+" Atualizar" );
	jk_config += "</div><br>";

	$("#botoesOperacoesMenu").html(jk_config);
}

function jk_montarBotaoGrupo(icon, titulo, lista){
	var jk_config = "	<div class='btn-group' role='group'>";
	jk_config += 			jk_buttonDropdown("", "default", jk_icon(icon)+" "+titulo);
	jk_config += "			<ul class='dropdown-menu text-left'>";
	jk_config += 				lista;
	jk_config += "			</ul>";
	jk_config += "		</div>";
	return jk_config;
}

function jk_MontarListaBotaoGrupoImgem(id, imagem, titulo, parametro, accessKey){
	var jk_config = "<li>";
	jk_config += jk_button(id, "", "linhaFiltro btn-block", accessKey, "marcaFiltro(\""+parametro+"\");", jk_b(jk_img(imagem, "auto", "auto")+" "+titulo));
	jk_config += "</li>";
	return jk_config;
}

function jk_MontarListaBotaoGrupoModal(id, click, icon, titulo, accessKey, idModal){
	var jk_config =  "<li>";
	jk_config += jk_buttonModal( id, "default", "btn-block", accessKey, click, jk_icon(icon)+" "+titulo, idModal );
	jk_config += "</li>";
	return jk_config;
}

function jk_MontarListaBotaoTela(id, click, icon, titulo, accessKey){
	var jk_config = "<li>";
	jk_config += jk_button( id, "default", "btn-block", accessKey, click, jk_icon(icon)+" "+titulo );
	jk_config += "</li>";
	return jk_config;
}
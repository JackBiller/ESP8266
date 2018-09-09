$('#formLogin').submit(function(e){
	var msmErroLogin = "<span color:'red'>*</span>&nbsp;Se tiver demorando muito para logar verifique sua conecção com a rede,";
	msmErroLogin += " se o servidor está ligado e funcionado corretamente e se o endereço ip está correto!";
	$("#msmErrorLogin").val(msmErroLogin);
	e.preventDefault();
	var identificador = $("#login").val();
	var senha = $("#password").val();
	var dataLogada = pegarData();
	var conteudoArquivoTxt = identificador+","+senha+","+dataLogada;

	logarSistema(tratarString(identificador) , tratarString(senha));
	adicionarLogin(tratarString(identificador) , tratarString(senha));
	/* $.ajax({
		type: 'GET',
		url: "http://"+hostWebService+"/VendasCDI/alteraArquivo.php?arquivo=json/"+arquivoTXT+".txt&conteudo="+conteudoArquivoTxt,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){  }); */
});

function validarLogarSistema(){
	var msmErroLogin = "<span color:'red'>*</span>&nbsp;Se tiver demorando muito para logar verifique sua conecção com a rede,";
	msmErroLogin += " se o servidor está ligado e funcionado corretamente e se o endereço ip está correto!";
	$("#msmErrorLogin").val(msmErroLogin);
	var identificador = $("#login").val();
	var senha = $("#password").val();
	var dataLogada = pegarData();
	var conteudoArquivoTxt = identificador+","+senha+","+dataLogada;

	if (identificador != "" && senha != "") {
		logarSistema(tratarString(identificador) , tratarString(senha));
		adicionarLogin(tratarString(identificador) , tratarString(senha));
	} else {
		toastGeral("error", "Os campos 'Usuário' e 'Senha' devem ser preenchidos!");
	}
	/* $.ajax({
		type: 'GET',
		url: "http://"+hostWebService+"/VendasCDI/alteraArquivo.php?arquivo=json/"+arquivoTXT+".txt&conteudo="+conteudoArquivoTxt,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){  }); */
}

function logarSistema(identificador , senha){
	var user = { 
		"identificador": identificador, 
		"senha": senha
	};
	/*$.ajax({
		type: 'GET',
		url: urlWebService+"UsuarioWs/autencicar/"+identificador+"/"+senha+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){*/
	$.ajax({
		type: 'POST',
		cache: false,
		url: urlWebService+"UsuarioWs/logar",
		dataType: "text",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(user)
	}).done( function(data){
		var arrayJson = JSON.parse(data);
		if (arrayJson.length == 0) {
			toastGeral("error", "Login ou senha incorretos!");
		} else {
			document.getElementById("telaLogin").style.display = "none";
			document.getElementById("rodapeView").style.display = "none";
			document.getElementById("telaPrincipal").style.display = "block";

			toastGeral("info", "Você está logado!");

			for(i in arrayJson){
				var filial = arrayJson[i].filial;
				$("#filial").val(filial);

				var vendedor = arrayJson[i].vendedor;
				/* var dataAtual = pegarData();

				Montando o texto html a ser preenchido no cabaçario principal */

				var nomeHiddenUsuario = "<input type='hidden' value='"+arrayJson[i].identificador+"' id='identificador' data-razaosocial='"+arrayJson[i].nome+"'>";

				$("#nomeUsuario").html('<i class="fa fa-user"></i>&nbsp;&nbsp;<b>'+arrayJson[i].nome+'</b>');

		/* 		var cabecario_text_html = "<br><h2 class='text-center'>Página Principal</h2>";
				var cabecario_text_html = "<div class='col-md-12' style='margin-top:10px;'>";
				cabecario_text_html += "<table class='table' style='margin-bottom: -20px;'><tr><td>"

				cabecario_text_html += "<h4 style='margin-bottom:1px;margin-top:1px;'>";
				cabecario_text_html += 		arrayJson[i].identificador+":"+arrayJson[i].nome;
				cabecario_text_html += "</h4>";

				cabecario_text_html += "</td><td>";

				cabecario_text_html += "<button class='btn btn-block btn-primary' onclick='montarListaPedsito( $(\"#filial\").val() );'>Atualizar</button>";

				cabecario_text_html += "<h4 style='margin-bottom:1px;margin-top:1px;'>"+arrayJson[i].identificador+":"+arrayJson[i].nome+"</h4>";
				cabecario_text_html += "<input type='text' value='' class='form-control' disabled>";
				
				cabecario_text_html += "</td><tr></tr><td width='50%'>";
				
				cabecario_text_html += "<h4>Data</h4>";
				cabecario_text_html += "<input type='date' id='dataPedido' value='"+dataAtual+"' style='height: 50px;' class='form-control' onclick='montarListaPedsito()'>";
				
				cabecario_text_html += "</td><td width='50%'>";
				
				cabecario_text_html += "<button id='buttonAdicionaPedido' class='btn btn-primary btn-block' onclick='montarListaPedsito()'>";
				cabecario_text_html += "Listar";
				cabecario_text_html += "</button>";
				cabecario_text_html += "</div>";

				cabecario_text_html += "</td></tr></table>";
				cabecario_text_html += "<hr>";
				var botaoVoltarFixo = "<button class='btn btn-info' onclick='logoff();'>";
				botaoVoltarFixo += '<i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;';
				botaoVoltarFixo += "Sair";
				botaoVoltarFixo += "</button>";

				var botaoFichaFixo = "<button class='btn btn-warning' ";
				botaoFichaFixo += "data-toggle='modal' data-target='#modalMesaPedido'>";
				botaoFichaFixo += "<i class='fa fa-search' aria-hidden='true'></i>&nbsp;";
				botaoFichaFixo += "Mesa";
				botaoFichaFixo += "</button>"; */
			}

			$("#filial").val(filial);
			$("#vendedor").val(vendedor);
			$("#hiddenUsuario").html(nomeHiddenUsuario);

			montarViewAdicionaItem(0);
			montarListaPedido(filial);

			/* $("#cabecarioPrincipal").html(cabecario_text_html);
			$("#botaoVoltarFixo").html(botaoVoltarFixo);
			$("#botaoPesquisarFicha").html(botaoFichaFixo);
			montarListaPedsito( $("#filial").val() );

			Mensagem de sucesso da autenticação
			
			subirPagina(); */
		}
	});
	return false;
}

function logoff(){
	bootbox.confirm({
		title: "Tem certeza que deseja sair da aplicação?",
		message: "Você será direcionado para tela de login!",
		buttons: {
			confirm: {
				label: 'Sim',
				className: 'btn-success'
			},
			cancel: {
				label: 'Não',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if (result) {
				removerLogin(true);
			}
		}
	});	

}

function tratarString(texto){
	texto = texto.replace(/\\/g, "\\\\");
	texto = texto.replace(/\"/g, "\\\"");
	texto = texto.replace(/\'/g, "\\\'");
	texto = texto.replace(/\=/g, "");

	return texto;
}
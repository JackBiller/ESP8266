function motarviewConsultarMesa(){
	var tipo = $("#tipoMesa").val();
	var numero_tipo = document.getElementById(tipo+"_input").value;
	var valorDaVez = "";
	var numero_datalist = document.getElementById(tipo+"_datlist").options.length;
	var valido = false;
	var id_mesa = "";
	var descricao = "";
	var situacaoMesa = "";
	var dataAtual = pegarData();
	var filial = $("#filial").val();
	var documento = "";

	if (numero_tipo.length == 1) {
		numero_tipo = "0"+numero_tipo;
	}

	for (var i = 0; i < numero_datalist; i++) {
		valorDaVez = document.getElementById(tipo+"_datlist").options[i].value;
		if (valorDaVez == numero_tipo) {
			valido = true;
			i = numero_datalist;
		}
	}

	if (!valido) {
		toastGeral("error", "Número ívalido!\nVerifique o número digitado!");
		document.getElementById(tipo+"_input").value = "";
		document.getElementById(tipo+"_input").focus();
	} else {
		$.ajax({
			type: 'GET',
			url: urlWebService+"MesaWs/listarMesaDesc/"+tipo+"/"+numero_tipo+"/"+filial+parametrosWebService,
			contentType: "application/json",
			jsonpCallback: "localJsonpCallback"
		}).done( function(data){
			for(i in data){
				valorTotal = data[i].total;
				valorTotal = formataValorParaImprimir(valorTotal);
				if (data[i].emissao == "") {
					emissaoItem = dataAtual;
				} else {
					emissaoItem = data[i].emissao.replace(" 00:00:00.0", "");
				}
				

				id_mesa = data[i].codigo;
				descricao = data[i].descricao;
				documento = data[i].documento;

				if (data[i].cliente == 0) {situacaoMesa = "d"; montarViewAdicionaMesa(id_mesa, descricao); } /* verde /* d == disponivel */
				else if (emissaoItem != dataAtual) {situacaoMesa = "n" } /* vermelho /* n == não finalizado */
				else {situacaoMesa = "o"; montarListaItem(documento); } /* azul /* o == ocupado */
			}

			if (situacaoMesa == "n") {
				toastGeral("error","Mesa não finalizada!");
			} else {
				document.getElementById("fecharModalMesaPedido").click();
			}
		});
	}

/*
	var dataAtual = pegarData();
	var montarListaPedido = "";
	$("#mesaPesquisa").val(ficha);

	$.ajax({
		type: 'GET',
		url: urlWebService+"PedidoWS/listarFichaAnteriorId/"+ficha+"/"+dataAtual+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){

		if (data.length == 0) {
			$.ajax({
				type: 'GET',
				url: urlWebService+"PedidoWS/listarFicha/"+ficha+"/"+dataAtual+parametrosWebService,
				contentType: "application/json",
				jsonpCallback: "localJsonpCallback"
			}).done( function(data){

				if (data.length == 0) {
					montarViewAdicionaPedido();
				} else {

					for(i in data){
						editarId(data[i].idLancPedido);
						montarListaItem(data[i].idLancPedido);
					}

				}
				document.getElementById("fecharModalFichaPedido").click();
				setStatus('pagina2');
			});
		} else {
			botaVoltarMenuPrincipal();
			montarListaPedido += "<div class='text-left' style='margin-top: 15px;'>";
			montarListaPedido += "	<button onclick='setStatus(\"inicial\");n_editar();montarMenuPrincipal();' class='btn btn-block btn-info' title='Voltar'>";
			montarListaPedido += "		<i class='fa fa-arrow-left' aria-hidden='true'></i>&nbsp;";
			montarListaPedido += "		Voltar";
			montarListaPedido += "	</button>";
			montarListaPedido += "</div>";


			montarListaPedido += "<h3 class='text-center'>";
			montarListaPedido += "O número da ficha contêm um pedido não finalizado";
			montarListaPedido += "</h3>";
			montarListaPedido += "<table class='table'><tr>";
			montarListaPedido += "<td align='left' style='padding-top:1px;padding-bottom:1px;'>";

			montarListaPedido += "<button class='btn btn-warning' ";
			montarListaPedido += "data-toggle='modal' data-target='#modalFichaPedido' onclick='setStatus(\"ficha2\");'>";
			montarListaPedido += "<i class='fa fa-search' aria-hidden='true'></i>&nbsp;";
			montarListaPedido += "Ficha";
			montarListaPedido += "</button>";

			montarListaPedido += "</td></tr></table>";

			
			montarListaPedido += "<table class='table' style='margin-top:-15px;'>";
			montarListaPedido += "<tr bgcolor='white'>";
			montarListaPedido += "<td>Ficha</td>";
			montarListaPedido += "<td>Documento</td>";
			montarListaPedido += "<td>Razão Social</td>";
			montarListaPedido += "<td>Emissão</td>";
			montarListaPedido += "</tr>";
			
			for(i in data){
				emissaoPerc = data[i].emissao;
				emissaoPerc = emissaoPerc.replace(" 00:00:00.0", "");
				emissaoPerc = formatarData(emissaoPerc);				

				montarListaPedido += "<tr>";

				montarListaPedido += "<td>"+data[i].ficha+"</td>";
				montarListaPedido += "<td>"+data[i].documento+"</td>";
				montarListaPedido += "<td>"+data[i].razaoSocial+"</td>";
				montarListaPedido += "<td>"+emissaoPerc+"</td>";
			}
			
			montarListaPedido += "</tr>";
			montarListaPedido += "</table>";

			$("#cabecarioPrincipal").html(montarListaPedido);
			$("#listaPagina").html("<br><br><br><br><br><br><br>");
			document.getElementById("fecharModalFichaPedido").click();
			setStatus('pagina2');
		}
	});
	*/
}

function limparCamposModalMesaPedido(){
	var numInput = document.getElementsByName("ultimoTipo_input").length;
	for(var i = 0; i < numInput; i++){
		document.getElementsByName("ultimoTipo_input")[i].value = "";
	}
}
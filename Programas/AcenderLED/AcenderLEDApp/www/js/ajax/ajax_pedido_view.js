function montarListaItemVisualizar(documento){
	document.getElementById("talaPedidos").style.display = "none";
	document.getElementById("talaPedidosItensView").style.display = "block";

	document.getElementById("btn_pedido_itens_ListaCabecario").className = "hidden";
	document.getElementById("btn_pedido_ListaCabecario").className = "col-xs-3";

	/* document.getElementById("btn_excluir_todos").disabled = true; */
	var filial = $("#filial").val();
	/* var motarSubMenu = ""; */
	var valorTotalPedido = 0;
	var documentoGeral = "";
	var emissaoItem = 0;
	var codigoMesa = 0;

	$("#numPedidoItens_numero_view").val("Carregando...");
	$("#numPedidoItens_totalPedido_view").val("Carregando...");
	$("#numPedidoItens_cliente_view").val("Carregando...");
	
	$("#conteudo_itens_pedido_tabela_view").html("<h4>Carregando&nbsp;&nbsp;&nbsp;<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></h4>");
	$("#conteudo_itens_pedido_tabela").html("");
	$("#cabecarioItensDivView").html("");

	/* Monta cabeçario do pedido */
	$.ajax({
		type: 'GET',
		url: urlWebService+"MesaWs/listarPedidoId/"+filial+"/"+documento+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		for(i in data){
			/* documentoGeral = documento;//data[i].documento;
			codigoMesa = data[i].codigo; */

			valorTotalPedido = data[i].total;
			valorTotalPedido = formataValorParaImprimir(valorTotalPedido);

			emissaoItem = data[i].emissao;
			emissaoItem = emissaoItem.replace(" 00:00:00.0", "");
			emissaoItem = formatarData(emissaoItem);
			
			$("#numPedidoItens_cliente_view").val(data[i].razaoSocial);

			/* botaVoltarMenuPrincipal(); */

			$("#numPedidoItens_numero_view").val(documento);
			/* $("#numPedidoItens_nomeCliente").val(data[i].razaoSocial); */
			$("#numPedidoItens_totalPedido_view").val(valorTotalPedido)

		}
	});

	
	/* Pega os itens que estão no pedido */
	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarLancPedidoItem/"+filial+"/"+documento+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		var idLancPedidoItem = 0;
		/* var valorTotalItem = 0; */
		var valorQuantidade = 0;
		var valorTotalItemU = 0;
		var valorUnitarioItemU = 0;
		var numRegistrosItens = 0;
		var desabilita = "";
		var desabilitaExcluir = "";

		var montarListaItens = "";
		/* var montarListaItens = "<h2 class='text-center'>";
		montarListaItens += "<table class='table'><tr><td align='left'>";
		montarListaItens += "Itens";
		montarListaItens += "</td><td align='right'>";
		montarListaItens += "<button class='btn btn-info' onclick='imprimirTodos();'>";
		montarListaItens += "<i class='fa fa-print' aria-hidden='true'></i>&nbsp;";
		montarListaItens += "Imprimir Todos";
		montarListaItens += "</button>";
		montarListaItens += "&nbsp;&nbsp;";
		montarListaItens += "<button class='btn btn-success' onclick='setStatus(\"pagina3\");montarViewAdicionaItem(document.getElementById(\"descricaoMesaPedido\").innerHTML);'>";
		montarListaItens += "<i class='fa fa-plus' aria-hidden='true'></i>&nbsp;";
		montarListaItens += "Adicionar Item";
		montarListaItens += "</button>";
		montarListaItens += "</td></tr></table>";
		montarListaItens += "</h2>"; */

		if (data.length == 0) {
			/* document.getElementById("btn_excluir_todos").disabled = false; */
			$("#cabecarioItensDivView").html("");
			montarListaItens += "<br>";
			montarListaItens += "<div class='text-center'>";
			montarListaItens += 	"<h3>Nenhum item a este pedido foi encontrado!</h3><br>";
			/* montarListaItens += 	"<button class='btn btn-info ' onclick='desocuparMesa(\""+documento+"\");'>";
			montarListaItens += 		"<!--i class='fa fa-plus' aria-hidden='true'></i-->&nbsp;";
			montarListaItens += 		"Desocupar Mesa";
			montarListaItens += 	"</button>"; */
			montarListaItens += "</div>";

		} else {
			montarListaItens += "<table class='table'><tr>";

			arrayIdLancPedidosItens = [];
			for(i in data){

				/* if (data[i].flagImpressao == 1) { desabilita = "style='background-color: #5cb85c;' disabled"; desabilitaExcluir = "disabled" }
				else { desabilita = "style='background-color: #d9534f;'"; desabilitaExcluir = "" } */

				numRegistrosItens++;
				idLancPedidoItem = data[i].idLancPedido;
				arrayIdLancPedidosItens.push(idLancPedidoItem);

				valorTotalItemU = data[i].valorTotal;
				valorTotalItemU = formataValorParaImprimir(valorTotalItemU);

				valorUnitarioItemU = data[i].valorUnitario;
				valorUnitarioItemU = formataValorParaImprimir(valorUnitarioItemU);

				valorQuantidade = data[i].quantidade;
				valorQuantidade = formatarValorParaDecimal(valorQuantidade);

				/* acumula valor total
				valorTotalItem += data[i].valorTotal;

				monta linha com a informação do item */
				montarListaItens += "<tr id='linhaItem"+documento+"_"+data[i].sequencia+"'>";

				/* montarListaItens += "<td align='left' style=\"width: 5%;\">"+numRegistrosItens+"</td>" */
				montarListaItens += "<td align='left' style=\"width: 50%;\">";
				montarListaItens += 	"<span id='imprimirPedido_"+idLancPedidoItem+"' style='font-size: 15px;'>" +data[i].itemNome+"</span>";
				montarListaItens += 	"<span style='color: red;  font-size: 15px;' id='spanDescExcecao_"  +idLancPedidoItem+"'></span>";
				montarListaItens += 	"<span style='color: blue; font-size: 15px;' id='spanDescPreparo_"  +idLancPedidoItem+"'></span>";
				montarListaItens += 	"<span style='color: green;font-size: 15px;' id='spanDescAdicional_"+idLancPedidoItem+"'></span>";
				montarListaItens += 	"<input type='hidden' value='"+data[i].item+"' id='codigoItemLanc_"+idLancPedidoItem+"'>";
				montarListaItens += 	"<input type='hidden' value='"+data[i].sequencia+"' id='sequenciaItemLanc_"+idLancPedidoItem+"'>";
				montarListaItens += "</td>";
				montarListaItens += "<td align='left' style=\"width: 10%;\">";
				montarListaItens += 	"<div id='imprimirPedidoQtd_"+data[i].idLancPedido+"'>";
				montarListaItens += 		valorQuantidade;
				montarListaItens += 	"</div>";
				montarListaItens += "</td>";

				montarListaItens += "<td align='left' style=\"width: 10%;\">"+valorUnitarioItemU+"</td>";
				montarListaItens += "<td align='left' style=\"width: 10%;\">"+valorTotalItemU+"</td>";
				
				/* if (tipo == "editar") {
					montarListaItens += "<td style=\"width: 10%;\">";
					montarListaItens += "<button class='btn' style='color:red;' id='excluirItemLanc_"+idLancPedidoItem+"' ";
					montarListaItens += "onclick='excluirItemPedido("+data[i].sequencia+",\""+documento+"\","+data[i].valorTotal+")' ";
					montarListaItens += desabilita+">";
					montarListaItens += "<i class='fa fa-times' aria-hidden='true'></i>";
					montarListaItens += "</button>";
					montarListaItens += "</td>";
				}

				montarListaItens += "<td style=\"/*width: 10%;* /\">";
				montarListaItens += "<button class='btn botoesTelaPedidoImprimir hidden' id='imprimirItemLanc_"+idLancPedidoItem+"' ";
				montarListaItens += 	"onclick='imprimirPedido("+data[i].idLancPedido+")' ";
				montarListaItens += desabilita+">";
				montarListaItens += "<i class='fa fa-print' aria-hidden='true'></i>";
				montarListaItens += "</button>";
				montarListaItens += "</td>"

				montarListaItens += "<td>";
				montarListaItens += "<button class='btn' style='color:blue;' ";
				montarListaItens += 	"onclick='exibirItemPedido("+data[i].idLancPedido+","+data[i].item+",\""+data[i].itemNome+"\")' ";
				montarListaItens += 	"data-toggle='modal' data-target='#modalVisualizarExcao'";
				montarListaItens += ">";
				montarListaItens += "<i class='fa fa-eye' aria-hidden='true'></i>";
				montarListaItens += "</button>";
				montarListaItens += "</td>";*/
				montarListaItens += "</tr>";

			}

			/* valorTotalItem = formataValorParaImprimir(valorTotalItem);
			montarListaItens += "<tr>";
			montarListaItens += 	"<td colspan='3'></td>";
			montarListaItens += 	"<td align='left'>";
			montarListaItens += 		"<span id='valorTotalPedidoSpan'>"+valorTotalItem+"</span>";
			montarListaItens += 	"</td>";
			montarListaItens += 	"<td colspan='2'</td>";
			montarListaItens += "</tr>"; */

			montarListaItens += "</table>";


			var cabecarioItensDivView = "";
			cabecarioItensDivView += "<table class=\"table\">";
			cabecarioItensDivView += 	"<tr>";
			/* cabecarioItensDivView += 		"<td align='left' style=\"width: 5%;\"></td>"; */
			cabecarioItensDivView += 		"<td align='left' style=\"width: 46%;\"><b>Item</b></td>";
			cabecarioItensDivView += 		"<td align='left' style=\"width: 10%;\"><b>Qtd</b></td>";
			cabecarioItensDivView += 		"<td align='left' style=\"width: 10%;\"><b>Valor</b></td>";
			cabecarioItensDivView += 		"<td align='left' style=\"width: 10%;\"><b>Total</b></td>";
			/* cabecarioItensDivView += 		"<td style=\"width: 10%;\"></td>";
			cabecarioItensDivView += 		"<td style=\"width: 10%;\"></td>"; */
			cabecarioItensDivView += 	"</tr>";
			cabecarioItensDivView += "</table>";

			$("#cabecarioItensDivView").html(cabecarioItensDivView);
		}
		numRegistrosItens++;
		$("#conteudo_itens_pedido_tabela_view").html(montarListaItens+"<br><br><br>");

		if (arrayIdLancPedidosItens.length == data.length) {
			montarComplementoItem();
		}

		/* $.ajax({
		 	type: 'GET',
			url: urlWebService+"ItemWs/retornaSeguencia/"+filial+"/"+documento+parametrosWebService,
			contentType: "application/json",
			jsonpCallback: "localJsonpCallback"
		}).done( function(data){
			var sequenciaReal = parseInt(data) + 1;
			$("#sequencia").val(sequenciaReal);
		}); */
	});
}
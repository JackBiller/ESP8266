var codigoConsumidor = "10003";
var carregarComboCliente = true;

function verificarPedidoSelecionado(){
	document.getElementById("conteudo_adicionar_pedido").style.display = "none";
	document.getElementById("conteudo_item_pedido_geral").style.display = "block";


	if (carregarComboCliente) {
		montarListaClienteFlexdataList();
		carregarComboCliente = false;
	} else {
		setarValorClienteComboPre();
		if ($("#documentoGeral").val() == "0") {
			novoPedido();
		} else {
			montarListaItem($("#documentoGeral").val()), 'editar';
		}
	}

	abrirTelaPedido('talaPedidosItens');
}

var arrayIdLancPedidosItens = [];
document.getElementById("btn_apertarUmaVezBug").click();
/* function montarViewAdicionaMesa(id, descricao){
	subirPagina();
	var motarSubMenu = "";
	var resultado = "";

	$.ajax({
		type: 'GET',
		url: urlWebService+"ClienteWs/listar/"+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){

		botaVoltarMenuPrincipal();

		if (data.length == 0) {
			motarSubMenu += "<br>Não tem nenhum registro de Cliente no Servidor!";
		} else {
			resultado = data;

			motarSubMenu += "<br><br><form id='formAdicionaPedido'>";
			motarSubMenu += "<div class='col-md-12'>";
			motarSubMenu += "<table class='table' width='100%'>";

			motarSubMenu += "<tr><td colspan='3'  onclick='document.getElementById(\"checkboxConsumidor\").click();'>";

			motarSubMenu += "<input type='hidden' value='0' id='selectConsumidorBootBox'>";

			motarSubMenu += "<div id='divCheckConsumidor'>";
			
			motarSubMenu += "<table><tr><td>";
			motarSubMenu += "<h4>Consumidor: <span id='situacaoConsumidor'></span>";
			motarSubMenu += "</td><td>";
			motarSubMenu += "<input class='hidden' type='checkbox' style='font-size:100px;' id='checkboxConsumidor' onclick='confereCheckConsumidor();'>";
			motarSubMenu += "</td></tr></table>";
			motarSubMenu += "</h4>";

			motarSubMenu += "</div>";


			motarSubMenu += "</td></tr>";

			motarSubMenu += "<tr><td colspan='3'>";

			motarSubMenu += "<h4>Cliente</h4>";

			motarSubMenu += "<div id='inputCampoClienteData'>";

			motarSubMenu += "<input type='text' id='clienteInputList'";
			motarSubMenu += "class='flexdatalist form-control'";
			motarSubMenu += "data-min-length='0' data-visible-properties='[\"razaoSocial\"]'";
			motarSubMenu += "data-selection-required='true' data-value-property='codigo'";
			motarSubMenu += "list='clienteDataList' required>";

			motarSubMenu += "</div>";

			motarSubMenu += "</td></tr>";


			motarSubMenu += "<tr><td colspan='1'>";
			if ($("#fichaPesquisa").val() == 0) {
				motarSubMenu += "<h4>Mesa</h4>";
				motarSubMenu += "<input type='number' id='mesa' maxlength='6' class='form-control'>";
			} else {
				var numeroPesquisadoFicha = $("#mesaPesquisa").val();
			
			}

			motarSubMenu += "<tr>";
			motarSubMenu += "<td>";
			motarSubMenu += "<h4>Emissão</h4>";
			var dataAtual = pegarData();
			motarSubMenu += "<input type='date' id='emissao' value='"+dataAtual+"' class='form-control' disabled>";
			motarSubMenu += "<h4>Mesa</h4>";
			motarSubMenu += "<input type='text' value='"+descricao+"' id='mesa' maxlength='6' class='form-control' disabled>";

			motarSubMenu += "</td>";

			motarSubMenu += "<td>";
			motarSubMenu += "&nbsp;&nbsp;&nbsp;&nbsp;";
			motarSubMenu += "</td><td>";

			motarSubMenu += "<h4>Total</h4>";
			motarSubMenu += "<input type='text' style='text-align: right;' id='totalPedido' rel='dinheiro' value='R$ 0,00' class='form-control' disabled>";

			motarSubMenu += "</td></tr></table><br><br>";

			motarSubMenu += "</div>";
			motarSubMenu += "</form>";
			motarSubMenu += "<table class='table'><tr>";
			motarSubMenu += "<td align='left' style='padding-top:1px;padding-bottom:1px;'>";

			motarSubMenu += "<button class='btn btn-warning btn-block' ";
			motarSubMenu += "data-toggle='modal' data-target='#modalFichaPedido' onclick='setStatus(\"ficha1\")'>";
			motarSubMenu += "<i class='fa fa-search' aria-hidden='true'></i>&nbsp;";
			motarSubMenu += "Ficha";
			motarSubMenu += "</button>";

			motarSubMenu += "</td></tr></table>";

			if ($("#editar").val() == 0) {

				var montarListaPedido = "<div id='botaoAdicionarPedidoUmaVez' class='text-center'>";
				montarListaPedido += "<button id='buttonAdicionaPedido' class='btn btn-success btn-block' onclick='adicionaPedido("+id+")'>";
				montarListaPedido += "<i class='fa fa-plus' aria-hidden='true'></i>&nbsp;";
				montarListaPedido += "Ocupar Mesa";
				montarListaPedido += "</button>";
				montarListaPedido += "</div>";

			} else {
				var montarListaPedido = "";
				var lancPedidoId = $("#editar").val();
				montarListaItem(lancPedidoId);
			}
		}

		$("#cabecarioPrincipal").html(motarSubMenu);
		$("#listaPagina").html(montarListaPedido+"<br><br><br>");
		setarValorClienteInputList(resultado);
		document.getElementById("checkboxConsumidor").click();
	});
} */

function montarListaClienteFlexdataList(){
	/*bancoDeDados.transaction (function (tx) {
		tx.executeSql ('SELECT * FROM IP', [], function (tx, results) {
			/*var len = results.rows.length, i;
			var ip = "";
			var dataAtualLogar = pegarData();
			msg = "<p> Registros encontrados:" + len + "</ p>";
			for (i = 0; i <len; i ++) {
				ip = results.rows.item(i).ip;
			}
			if (ip != "") {
				// hostWebService = ip;
				// hostServeImage = ip;
				// $("#modalIpConfig").val(ip);
				// urlWebService = "http://"+hostWebService+portaWebService+caminhoWebService;
			}*/
		/*}, null);
	});*/


	var motarSubMenu = "";
	$.ajax({
		type: 'GET',
		url: urlWebService+"ClienteWs/listar/"+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		motarSubMenu += "<div class=\"input-group\" style='width:100%'>";
		motarSubMenu += 	"<span class=\"input-group-addon\" onclick='setarClienteComoConsumidor();'>";
		motarSubMenu += 		"<i class='fa fa-shopping-cart'></i>";
		motarSubMenu += 	"</span>";
		motarSubMenu += 	"<input type='text' ";
		motarSubMenu += 	"	id='clienteInputList'";
		motarSubMenu += 	"	class='flexdatalist form-control'";
		motarSubMenu += 	"	data-min-length='0' ";
		motarSubMenu += 	"	data-visible-properties='[\"razaoSocial\"]'";
		motarSubMenu += 	"	data-selection-required='true' ";
		motarSubMenu += 	"	data-value-property='codigo'";
		motarSubMenu += 	"	list='clienteDataList' ";
		motarSubMenu += 	"	onchange='setarClientePedido(this.value)'";
		motarSubMenu += 	"required>";
		motarSubMenu += 	"<span class=\"input-group-addon\" onclick='paesquisarClienteModal();'>";
		motarSubMenu += 		"<i class='fa fa-search'></i>";
		motarSubMenu += 	"</span>";
		motarSubMenu += 	"<span class=\"input-group-addon\" onclick='abrirModalCadastroCliente();'>";
		motarSubMenu += 		"<i class='fa fa-plus'></i>";
		motarSubMenu += 	"</span>";
		/* motarSubMenu += 	"<span class=\"input-group-addon\" onclick='definirTelefone();'>";
		motarSubMenu += 		"<i class='fa fa-phone'></i>";
		motarSubMenu += 	"</span>"; */
		motarSubMenu += "</div>";

		$("#clienteDivListTesteUnico").html(motarSubMenu);
		setarValorClienteInputList(data);
	});
}



function confereCheckConsumidor(){
	var check = document.getElementById("checkboxConsumidor").checked;
	if (check) {
		document.getElementById("clienteInputList-flexdatalist").disabled = true;
		document.getElementById("clienteInputList-flexdatalist").value = "CONSUMIDOR";
		$("#situacaoConsumidor").html("Sim");
	} else {
		document.getElementById("clienteInputList-flexdatalist").value = "";
		document.getElementById("clienteInputList-flexdatalist").disabled = false;
		$("#clienteInputList-flexdatalist").focus();
		$("#situacaoConsumidor").html("Não");
	}
}



function setarClienteComoConsumidor(){
	document.getElementById("clienteInputList-flexdatalist").value = "CONSUMIDOR";
	document.getElementById("clienteInputList").value = codigoConsumidor;
	setarClientePedido(codigoConsumidor);
}




function paesquisarClienteModal(){
	$("#modalpesquisaCliente").modal("show");
}




function setarValorClienteComboPre(){
	var filial = $("#filial").val();
	var documento = $("#documentoGeral").val();
	if (documento != "0") {
		$.ajax({
			type: 'GET',
			url: urlWebService+"MesaWs/listarPedidoId/"+filial+"/"+documento+parametrosWebService,
			contentType: "application/json",
			jsonpCallback: "localJsonpCallback"
		}).done( function(data){
			for(i in data){
				document.getElementById("clienteInputList-flexdatalist").value = data[i].razaoSocial;
				document.getElementById("clienteInputList").value = data[i].cliente == 0 ? codigoConsumidor : data[i].cliente;
			}
		});
	}
	else {
		document.getElementById("clienteInputList-flexdatalist").value = "CONSUMIDOR";
		document.getElementById("clienteInputList").value = codigoConsumidor;
	}
	
	document.getElementById("clienteInputList-flexdatalist").onfocus = function () { 
		if (this.value != "") {
			this.value = "";
			$("#clienteInputList").val("");
			document.getElementById("clienteInputList-flexdatalist").blur();
			document.getElementById("clienteInputList-flexdatalist").focus();
		}
	};
}

function setarValorClienteInputList(elJSON){
	$('#clienteInputList').flexdatalist({
		selectionRequired: true,
		valueProperty: 'codigo',
		searchIn: 'razaoSocial',
		minLength: 1,
		data: elJSON
	});
	verificarPedidoSelecionado();
}


function setarClientePedido(codigo){
	if(codigo != ""){
		var filial = $("#filial").val();
		var documento = $("#documentoGeral").val();
		if (documento != "0") {
			$.ajax({
				type: 'GET',
				url: urlWebService+"MesaWs/setaClientePedido/"+codigo+"/"+filial+"/"+documento+parametrosWebService,
				contentType: "application/json",
				jsonpCallback: "localJsonpCallback"
			}).done( function(data){
				if (data == "1" || data == 1) {
					toastGeral("success", "Cliente alterado com sucesso!");
				}
				else {
					toastGeral("error", "Falha ao alterar cliente!");
				}
			});
		}
	}
}




function adicionaPedido(origem){
	/* var carregando = "<h4>Carregando&nbsp;&nbsp;&nbsp;<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></h4>";
	$("#botaoAdicionarPedidoUmaVez").html(carregando); */

	var nome = $("#clienteInputList").val();
	var selectConsumidorBootBox = $("#selectConsumidorBootBox").val();
	var clienteId = "";

	clienteId = codigoConsumidor;

	if (clienteId != "0") {
		var emissao = pegarData();

		var filial = $("#filial").val();
		var total = $("#totalPedido").val();
		var vendedor = $("#vendedor").val();

		total = total.replace("R$", "");
		total = total.replace(",", ".");
		total = parseFloat(total);

		vendedor = parseInt(vendedor);

		var identificacao = $("#identificador").val();
		var flagImpressao = 0;

		var user = { 
			"filial": filial, 
			"emissao": emissao, 
			"total": total, 
			"cliente": clienteId, 
			"identificacao": identificacao, 
			"condPagamento": flagImpressao, 
			"vendedor": vendedor
		};
		$.ajax({
			type: 'POST',
			cache: false,
			url: urlWebService+"MesaWs/inserir",
			dataType: "text",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(user)
		}).done( function(data){
			if (data == "0") {
				toastGeral("error", "Erro ao ocupar mesa!");
			} else {
				editarId(data);
				if (origem == "item") {
					/* Chama a funcao de adicionar Item */
					adicionaItemAoPedido()
				}
			}
		});
	} else {
		toastGeral("error", "Verifique se todos os dados foram preenchidos!");
	}
}



function montarListaItem(documento, tipo){
	/* document.getElementById("btn_excluir_todos").disabled = true; */
	var filial = $("#filial").val();
	/* var motarSubMenu = ""; */
	var valorTotalPedido = 0;
	var documentoGeral = "";
	var emissaoItem = 0;
	var codigoMesa = 0;

	$("#numPedidoItens_numero").val("Carregando...");
	$("#numPedidoItens_totalPedido").val("Carregando...");
	$("#conteudo_itens_pedido_tabela").html("<h4>Carregando&nbsp;&nbsp;&nbsp;<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></h4>");
	$("#cabecarioItensDiv").html("");

	/* Monta cabeçario do pedido */
	$.ajax({
		type: 'GET',
		url: urlWebService+"MesaWs/listarPedidoId/"+filial+"/"+documento+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		for(i in data){
			/*documentoGeral = documento;//data[i].documento;
			codigoMesa = data[i].codigo; */

			valorTotalPedido = data[i].total;
			valorTotalPedido = formataValorParaImprimir(valorTotalPedido);

			emissaoItem = data[i].emissao;
			emissaoItem = emissaoItem.replace(" 00:00:00.0", "");
			emissaoItem = formatarData(emissaoItem);

			/* botaVoltarMenuPrincipal(); */

			$("#numPedidoItens_numero").val(documento);
			/* $("#numPedidoItens_nomeCliente").val(data[i].razaoSocial); */
			$("#numPedidoItens_totalPedido").val(valorTotalPedido)

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
			$("#cabecarioItensDiv").html("");
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

				if (data[i].flagImpressao == 1) { desabilita = "style='background-color: #5cb85c;' disabled"; desabilitaExcluir = "disabled" }
				else { desabilita = "style='background-color: #d9534f;'"; desabilitaExcluir = "" }

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
				valorTotalItem += data[i].valorTotal; */

				/* monta linha com a informação do item */
				montarListaItens += "<tr id='linhaItem"+documento+"_"+data[i].sequencia+"'>";

				/* montarListaItens += "<td align='left' style=\"width: 5%;\">"+numRegistrosItens+"</td>" */
				montarListaItens += "<td align='left' style=\"width: 50%;\">";
				montarListaItens += 	"<span id='imprimirPedido_"+idLancPedidoItem+"' name='itemPedidoArray' style='font-size: 15px;'>" +data[i].itemNome+"</span>";
				montarListaItens += 	"<span style='color: red;  font-size: 15px;'    name='itemPadidoArrayExcecao' id='spanDescExcecao_"  +idLancPedidoItem+"'></span>";
				montarListaItens += 	"<span style='color: blue; font-size: 15px;'    name='itemPadidoArrayPreparo' id='spanDescPreparo_"  +idLancPedidoItem+"'></span>";
				montarListaItens += 	"<span style='color: green;font-size: 15px;'    name='itemPadidoArrayAdicional' id='spanDescAdicional_"+idLancPedidoItem+"'></span>";
				montarListaItens += 	"<span class='hidden' name='itemPadidoArrayAdicionalSPreco' id='spanDescAdicionalSPreco_"+idLancPedidoItem+"'></span>";
				montarListaItens += 	"<input type='hidden' value='"+data[i].item+"' id='codigoItemLanc_"+idLancPedidoItem+"'>";
				montarListaItens += 	"<input type='hidden' value='"+data[i].sequencia+"' id='sequenciaItemLanc_"+idLancPedidoItem+"'>";
				montarListaItens += "</td>";
				montarListaItens += "<td align='left' style=\"width: 10%;\">";
				montarListaItens += 	"<div id='imprimirPedidoQtd_"+data[i].idLancPedido+"' name='qtdItemPedidoArray'>";
				montarListaItens += 		valorQuantidade;
				montarListaItens += 	"</div>";
				montarListaItens += "</td>";

				montarListaItens += "<td align='left' style=\"width: 10%;\">"+valorUnitarioItemU+"</td>";
				montarListaItens += "<td align='left' style=\"width: 10%;\">"+valorTotalItemU+"</td>";
				
				/* if (tipo == "editar") { */
					montarListaItens += "<td style=\"width: 10%;\">";
					montarListaItens += "<button class='btn' style='color:red;' id='excluirItemLanc_"+idLancPedidoItem+"' ";
					montarListaItens += "onclick='excluirItemPedido("+data[i].sequencia+",\""+documento+"\","+data[i].valorTotal+")' ";
					montarListaItens += desabilita+">";
					montarListaItens += "<i class='fa fa-times' aria-hidden='true'></i>";
					montarListaItens += "</button>";
					montarListaItens += "</td>";
				/* }

				montarListaItens += "<td style=\"/*width: 10%;/\">";
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


			var cabecarioItensDiv = "";
			cabecarioItensDiv += "<table class=\"table\">";
			cabecarioItensDiv += 	"<tr>";
			/* cabecarioItensDiv += 		"<td align='left' style=\"width: 5%;\"></td>"; */
			cabecarioItensDiv += 		"<td align='left' style=\"width: 46%;\"><b>Item</b></td>";
			cabecarioItensDiv += 		"<td align='left' style=\"width: 10%;\"><b>Qtd</b></td>";
			cabecarioItensDiv += 		"<td align='left' style=\"width: 10%;\"><b>Valor</b></td>";
			cabecarioItensDiv += 		"<td align='left' style=\"width: 10%;\"><b>Total</b></td>";
			cabecarioItensDiv += 		"<td style=\"width: 10%;\"></td>";
			/* cabecarioItensDiv += 		"<td style=\"width: 10%;\"></td>"; */
			cabecarioItensDiv += 	"</tr>";
			cabecarioItensDiv += "</table>";

			$("#cabecarioItensDiv").html(cabecarioItensDiv);
		}
		numRegistrosItens++;
		$("#conteudo_itens_pedido_tabela").html(montarListaItens+"<br><br><br>");

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


function imprimirTodos(){
	for(var i = 0; i < arrayIdLancPedidosItens.length; i++){
		if (!document.getElementById("imprimirItemLanc_"+arrayIdLancPedidosItens[i]).disabled) {
			imprimirPedido(arrayIdLancPedidosItens[i]);
		}
	}
}


function imprimirPedido(id){
	var qtd = document.getElementById("imprimirPedidoQtd_"+id).innerHTML;
	qtd = parseInt(qtd);
	var impressao = document.getElementById("imprimirPedido_"+id).innerHTML;
	impressao += document.getElementById("spanDescExcecao_"+id).innerHTML;
	impressao += document.getElementById("spanDescPreparo_"+id).innerHTML;
	impressao += document.getElementById("spanDescAdicional_"+id).innerHTML;

	var filial = $("#filial").val();
	var documento = $("#documentoGeral").val();
	var sequenciaItem = document.getElementById("sequenciaItemLanc_"+id).value;
	var item = document.getElementById("codigoItemLanc_"+id).value;
	var user = $("#identificador").val();
	var ultima_atualizacao = new Date();

	var dataAtual = pegarData();
	var hora = ultima_atualizacao.getHours()+":"+ultima_atualizacao.getMinutes()+":"+ultima_atualizacao.getSeconds();

	var lancPedidoItemImpressaoObject = { 
			"idLancPedido": id,
			"filial": filial, 
			"documento": documento, 
			"sequencia": sequenciaItem,
			"item": item,
			"quantidade": qtd,
			"unidadeMedida": impressao,
			"adicionalProduto": user,
			"itemNome": dataAtual,
			"horaComplemento": hora
		};
	$.ajax({
		type: 'POST',
		cache: false,
		url: urlWebService+"ItemWs/inserirImpressao",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(lancPedidoItemImpressaoObject)
	}).done( function(data){
		if (data != "0") {
			toastGeral("info", "Solicitação de Impressão mandada com sucesso!");

			document.getElementById("excluirItemLanc_"+id).disabled = true;
			document.getElementById("imprimirItemLanc_"+id).disabled = true;
			document.getElementById("imprimirItemLanc_"+id).style.backgroundColor = "#5cb85c";
		} else {
			toastGeral("error", "Erro ao solicitar Impressão!");
		}
	});

	/*$.ajax({
		url:'http://'+hostServeImage+'/panquecasCDI/dompdf_gerar/index.php',
		type: 'POST',
		dataType: 'html',
		data: {
			'id_lanc_item': id,
			'texto': 	  	impressao,
			'qtd':  		qtd
		}
	}).done( function(data){
		if (data == "1" || data == 1) {
			toastGeral("info", "Pdf gerado com sucesso!");
		} else {
			toastGeral("error", "Erro ao gerar PDF!");
		}
	});

	var pagina = document.body.innerHTML;
	
	document.body.innerHTML = "http://"+hostServeImage+"/panquecasCDI/pedidos/"+id+".php";

	document.body.innerHTML = pagina;*/
}


function exibirItemPedido(id, item, nomeItem){
	var tabelaOperacao = "";

	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarItensComposicao/"+item+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		if (data.length == 0) {
			tabelaOperacao = "<br>Nenhum item na composição desse item!";
		} else {
			tabelaOperacao += "<h2>Composição: "+nomeItem+"</h2>";
			tabelaOperacao += "<table class='table'>";
			tabelaOperacao += "<tr>";
			tabelaOperacao += "<td>Descricao</td>";
			tabelaOperacao += "<td>Condição</td>";
			tabelaOperacao += "</tr>";

			for(i in data){
				itensComposicaoArray.push(data[i].item);
				tabelaOperacao += "<tr id='linhaComposicaoV_"+data[i].item+"' bgcolor='#5cb85c'>";

				tabelaOperacao += "<td>";
				tabelaOperacao += 	data[i].descricao;
				tabelaOperacao += 	"<input class='hidden' type='checkbox' id='inputComposicaoV_"+data[i].item+"' checked>";
				tabelaOperacao += "</td>";
				tabelaOperacao += "<td>";
				tabelaOperacao += 	"<span id='spanComposicaoV_"+data[i].item+"'>";
				tabelaOperacao += 		"<i class='fa fa-check' aria-hidden='true'></i>";
				tabelaOperacao += 	"</span>";
				tabelaOperacao += "</td>";

				tabelaOperacao += "</tr>";
			}
		}
		$("#conteudoComposicaoModalVisualizarExcao").html(tabelaOperacao);

		$.ajax({
			type: 'GET',
			url: urlWebService+"ItemWs/listarItensComposicaoExcecao/"+id+parametrosWebService,
			contentType: "application/json",
			jsonpCallback: "localJsonpCallback"
		}).done( function(data){
			for(i in data){
				document.getElementById("inputComposicaoV_"+data[i].item).checked = false;
				document.getElementById("linhaComposicaoV_"+data[i].item).style.backgroundColor = "#d9534f";
				document.getElementById("spanComposicaoV_"+data[i].item).innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";
			}
		});
	});
}



function setarDescricaoMesa(codigoMesa){
	$.ajax({
		type: 'GET',
		url: urlWebService+"MesaWs/listarMesaId/"+codigoMesa+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		for(i in data){
			$("#descricaoMesaPedido").html(data[i].descricao);
		}
	});
}


function montarComplementoItem(){
	var spanDescExcecao_ = "";
	var spanDescPreparo_ = "";
	var spanDescAdicional_ = "";
	var idDaVez = 0;

	for(var i = 0; i < arrayIdLancPedidosItens.length; i++){
		idDaVez = arrayIdLancPedidosItens[i];
		/* chamar composição */
		$.ajax({
			type: 'GET',
			url: urlWebService+"ItemWs/listarLancPedidoItemExecao/"+arrayIdLancPedidosItens[i]+parametrosWebService,
			dataType: 'html',
			jsonpCallback: "localJsonpCallback"
		}).done( function(data1){
			if (data1 != "") {
				data1 = data1.split("+");
				if (data1[0] != null && data1[0] != "null") {
					jogarValoresNoSpanComplementoItem("<br>Exceção: "+data1[0], "Excecao", data1[1]);
				}
			}
		});

		/* chamar preparo */
		$.ajax({
			type: 'GET',
			url: urlWebService+"ItemWs/listarLancPedidoItemPreparo/"+arrayIdLancPedidosItens[i]+parametrosWebService,
			dataType: 'html',
			jsonpCallback: "localJsonpCallback"
		}).done( function(data2){
			if (data2 != "") {
				data2 = data2.split("+");
				if (data2[0] != null && data2[0] != "null") {
					jogarValoresNoSpanComplementoItem("<br>Preparo: "+data2[0], "Preparo", data2[1]);
				}
			}
		});

		/* chamar adicional */
		$.ajax({
			type: 'GET',
			url: urlWebService+"ItemWs/listarLancPedidoItemAdicional/"+arrayIdLancPedidosItens[i]+parametrosWebService,
			contentType: "application/json",
			dataType: 'text',
			jsonpCallback: "localJsonpCallback"
		}).done( function(data3){
			if (data3 != "") {
				data3 = data3.split("+");
				if (data3[0] != null && data3[0] != "null") {
					jogarValoresNoSpanComplementoItem("<br>Adicional: "+data3[0], "Adicional", data3[1]);
				}
			}
		});

		$.ajax({
			type: 'GET',
			url: urlWebService+"ItemWs/listarLancPedidoItemAdicionalSPreco/"+arrayIdLancPedidosItens[i]+parametrosWebService,
			contentType: "application/json",
			dataType: 'text',
			jsonpCallback: "localJsonpCallback"
		}).done( function(data4){
			if (data4 != "") {
				data4 = data4.split("+");
				if (data4[0] != null && data4[0] != "null") {
					jogarValoresNoSpanComplementoItem("<br>Adicional: "+data4[0], "AdicionalSPreco", data4[1]);
				}
			}
		});
	}
}

function jogarValoresNoSpanComplementoItem(texto, tipo, id){
	document.getElementById("spanDesc"+tipo+"_"+id).innerHTML = texto;
}


function desocuparMesa(documento){
	var filial = $("#filial").val();

	if (documento != "") {
		documento = "000000"+documento;
		documento = documento.substring(documento.length - 6, documento.length);

		bootbox.confirm({
			title: "Tem certeza que deseja desocupar mesa?",
			message: "Ao aperta o botão \"Sim\" você irá remover o pedido atribuido a essa mesa!",
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
					$.ajax({
						type: 'GET',
						url: urlWebService+"MesaWs/remover/"+filial+"/"+documento+parametrosWebService,
						contentType: "application/json",
						jsonpCallback: "localJsonpCallback"
					}).done( function(data){ });

					/* Voltar para Pagina Principal */
					n_editar();
					$("#documentoGeral").val("0");
					verificarPedidoSelecionado();
					/* montarMenuPrincipal();*/
					fecharModalModalFinalizaPedido();
					/* Mesagem de feedBack*/
					toastGeral("info", "O pedido foi excluido com sucesso!");
				}
			}
		});
	} else {
		toastGeral("error", "Não pode ser excluido!\nPedido em branco!");
	}
	
}


function excluirItemPedido(sequencia, documento, valor){
	var filial = $("#filial").val();
	documento = "000000"+documento;
	documento = documento.substring(documento.length - 6, documento.length);

	bootbox.confirm({
		title: "Tem certeza que deseja remover este item do pedido?",
		message: "Ao aperta o botão \"Sim\" você irá remover este item do pedido por completo do sistema",
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
				fecharModalModalFinalizaPedido();
				$.ajax({
					type: 'GET',
					url: urlWebService+"ItemWs/atualizaValorPedido/"+filial+"/"+documento+"/"+valor+parametrosWebService,
					contentType: "application/json",
					jsonpCallback: "localJsonpCallback"
				}).done( function(data){  });

				/* remover item do pedido*/
				$.ajax({
					type: 'GET',
					url: urlWebService+"ItemWs/remover/"+filial+"/"+documento+"/"+sequencia+parametrosWebService,
					contentType: "application/json",
					jsonpCallback: "localJsonpCallback"
				}).done( function(data){  });

				toastGeral("info", "Item removido com sucesso!");
				
				$("#linhaItem"+documento+"_"+sequencia).remove();
				var valorTotalAtualiza = $("#numPedidoItens_totalPedido").val();
				valorTotalAtualiza = formataValorParaCalcular2(valorTotalAtualiza);
				valorTotalAtualiza = parseFloat(valorTotalAtualiza) - parseFloat(valor);
				valorTotalAtualiza = formataValorParaImprimir(valorTotalAtualiza);
				$("#numPedidoItens_totalPedido").val(valorTotalAtualiza);
				$("#valorTotalPedidoSpan").html(valorTotalAtualiza);
			}
		}
	});
}
/* function finalizarPedido(id){
 	var valorTotal = $("#valorTotalPedidoInputList").val();
 	valorTotal = formataValorParaCalcular2(valorTotal);

 	if (valorTotal <= 0) {
 		toastGeral("error", "Pedido com valor zerado não pode ser finalizado!");
 	} else {
 		bootbox.confirm({
 			title: "Tem certeza que deseja finalizar este pedido?",
 			message: "Ao aperta o botão \"Sim\" você não poderá excluir e nem editar este pedido!",
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
 					n_editar();
 					finaliza pedido
 					$.ajax({
 						type: 'GET',
 						url: urlWebService+"PedidoWS/finalizar/"+id+parametrosWebService,
 						contentType: "application/json",
 						jsonpCallback: "localJsonpCallback"
 					}).done( function(data){  });

 					toastGeral("success", "Pedido foi finalizado com sucesso!");
 					var dataDoPedido = $("#emissaoInputList").val();
 					montarMenuPrincipal();
 				}
 			}
 		});
 	}
 }*/
function finalizarPedidoAcao(nomeInformado, contato){
	bootbox.confirm({
		title: "Tem certeza que deseja finalizar este pedido?",
		message: "Ao aperta o botão \"Sim\" você não poderá excluir e nem editar este pedido!",
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
				var nome = $("#clienteInputList").val();
				var selectConsumidorBootBox = $("#selectConsumidorBootBox").val();

				var clienteId = nome;
				if (clienteId == "0") clienteId = codigoConsumidor;

				var filial = $("#filial").val();
				var documento = $("#documentoGeral").val();
				
				var valorTotal = $("#valorTotal_ModalFinalizaPedido").val();
				valorTotal = formataValorParaCalcular2(valorTotal);
				/*var valorEntrega = $("#valorEntrega_ModalFinalizaPedido").val();
				valorEntrega = formataValorParaCalcular2(valorEntrega);*/
				var valorDesconto = $("#valorDesconto_ModalFinalizaPedido").val();
				valorDesconto = formataValorParaCalcular2(valorDesconto);
				var dinheiro = $("#dinheiro_ModalFinalizaPedido").val();
				dinheiro = formataValorParaCalcular2(dinheiro);
				var cartaoDebito = $("#cartaoDebito_ModalFinalizaPedido").val();
				cartaoDebito = formataValorParaCalcular2(cartaoDebito);
				var cartaoCredito = $("#cartaoCredito_ModalFinalizaPedido").val();
				cartaoCredito = formataValorParaCalcular2(cartaoCredito);
				var troco = $("#troco_ModalFinalizaPedido").val();
				troco = formataValorParaCalcular2(troco);


				/* Salvar para chamada */
				$.ajax({
					url:'chamada/operacoesTela.php',
					type: 'POST',
					dataType: 'text',
					data: {
						'adicionarPedido': true,
						'pedido': documento,
						'nome': nomeInformado
					}
				}).done( function(data){  });



				var tipoDescontoIcon = $("#tipoDescontoIcon").html();
				if (tipoDescontoIcon == "<b>%</b>") valorDesconto = (valorTotal * valorDesconto) / 100;

				var identificacao = $("#identificador").val();
				var flagImpressao = 0;

				var user = { 
					"filial": filial, 
					"documento": documento, 
					"cliente": clienteId,
					/* "entrega": valorEntrega */
					"desconto": valorDesconto, 
					"troco": troco, 
					"dinheiro": dinheiro, 
					"cartaoDebito": cartaoDebito, 
					"cartaoCredito": cartaoCredito,
					"razaoSocial": nomeInformado,
					"contato": contato
				};
				/* Teste Web Service
				{ 
					"filial": 10, 
					"documento": '003903', 
					"cliente": '1',
					"desconto": 0, 
					"troco": 2, 
					"dinheiro": 10, 
					"cartaoDebito": 0, 
					"cartaoCredito": 0,
					"razaoSocial": 'teste',
					"contato": '123'
				}
				*/
				$.ajax({
					type: 'POST',
					cache: false,
					url: urlWebService+"MesaWs/finalizar",
					dataType: "text",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(user)
				}).done( function(data){
					if (data == "0") {
						toastGeral("error", "Erro ao ocupar mesa!");
					} else {
						toastGeral("success", "Pedido Finalizado com sucesso");
						fecharModalModalFinalizaPedido();
						novoPedido();
					}
				});
			}
		}
	});
}


function chamarPedido(documento){
	$.ajax({
		url:'chamada/operacoesTela.php',
		type: 'POST',
		dataType: 'text',
		data: {
			'atualizaParaChamado': true,
			'pedido': documento
		}
	}).done( function(data){ toastGeral("success", "Solicitação de chamada feita com sucesso!"); });
}



var oldLinha = "";
var documentoSelecionado = "";
function menuOptionPedidoFinalizado(documento){
	if (oldLinha != "") cancelarEntrega(documentoSelecionado);

	oldLinha = document.getElementById("linhaMesa"+documento).innerHTML;
	documentoSelecionado = documento;

var newLinha  = "<td>"+documento+"</td>";
	newLinha += "<td colspan='3'>";
	newLinha += 	"<table width='100%'>";
	newLinha += 		"<tr>";
	newLinha += 			"<td width='33%'>";
	newLinha += 				"<button class='btn btn-block' onclick='chamarPedido(\""+documento+"\")'>";
	newLinha += 					"Chamar";
	newLinha += 				"</button>";
	newLinha += 			"</td>";
	newLinha += 			"<td width='33%'>";
	newLinha += 				"<button class='btn btn-block' onclick='entregarPedido(\""+documento+"\")'>";
	newLinha += 					"Entregar";
	newLinha += 				"</button>";
	newLinha += 			"</td>";
	newLinha += 			"<td width='33%'>";
	newLinha += 				"<button class='btn btn-block' onclick='cancelarEntrega(\""+documento+"\")'>";
	newLinha += 					"Cancelar";
	newLinha += 				"</button>";
	newLinha += 			"</td>";
	newLinha += 		"</tr>";
	newLinha += 	"</table>";
	newLinha += "</td>";

	document.getElementById("linhaMesa"+documento).innerHTML = newLinha
}

function entregarPedido(documento){
	bootbox.confirm({
		title: "Tem certeza que deseja entregar este pedido?",
		message: "Ao aperta o botão \"Sim\" você somente poderá visualizar este pedido!",
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
				var filial = $("#filial").val();

				/* Finalização para chamada */
				$.ajax({
					url:'chamada/operacoesTela.php',
					type: 'POST',
					dataType: 'text',
					data: {
						'atualizaParaFinalizado': true,
						'pedido': documento
					}
				}).done( function(data){  });


				/* Finalizar no web service Java */
				$.ajax({
					type: 'GET',
					url: urlWebService+"MesaWs/entregarPedido/"+filial+"/"+documento+parametrosWebService,
					contentType: "application/json",
					jsonpCallback: "localJsonpCallback"
				}).done( function(data){
					if (data == "1" || data == 1) {
						toastGeral("success", "Pedido Entregue!");
						montarListaPedido(filial);
					} else {
						toastGeral("error", "Falha ao tentar entregar Pedido!");
					}
				});
				/* cancelarEntrega(documento); */
			}
		}
	});
}

function cancelarEntrega(documento){
	document.getElementById("linhaMesa"+documento).innerHTML = oldLinha;
}
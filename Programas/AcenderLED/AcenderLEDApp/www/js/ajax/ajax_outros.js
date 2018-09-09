function jogarValorModalPedido(elemento){
	var idLancPedido = $(elemento).data("idlancpedido");
	var filial = $(elemento).data("filial");
	var documento = $(elemento).data("documento");
	var emissao = $(elemento).data("emissao");
	var valorTotal = $(elemento).data("total");
	var cliente = $(elemento).data("cliente");
	var identificacao = $(elemento).data("identificacao");
	var flagImpressao = $(elemento).data("flagimpressao");
	var razaoSocial = $(elemento).data("razaosocial");
	var ficha = $(elemento).data("ficha");

	itensPedidoModal(idLancPedido);

	/* setando valor nos campos do modal */
	$("#modalFilialPedido").val(filial);
	$("#modalDocumentoPedido").val(documento);
	$("#modalEmissaoPedido").val(emissao);
	$("#modalBalorTotalPedido").val(valorTotal);
	$("#modalRazaoSocialPedido").val(razaoSocial);
	$("#modalIdentificacaoPedido").val(identificacao);
	$("#modalNumFicha").html(ficha);

	if (flagImpressao == "0") {
		$("#modalFinalizadaPedido").val("Não finalizado");
	} else {
		$("#modalFinalizadaPedido").val("Finalizado");
	}
	

}


function itensPedidoModal(idLancPedido){
	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarLancPedidoItem/"+idLancPedido+"/"+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		var valorTotalItem = 0;
		var valorTotalItemU = 0;
		var valorUnitarioItemU = 0;
		var numRegistrosItens = 0;

		var montarListaItens = "<h2 class='text-center'>Itens</h2>";

		if (data.length == 0) {
			montarListaItens += "<br>Nenhum item a este pedido foi encontrado!";
		} else {
			montarListaItens += "<table class='table'><tr>";

			montarListaItens += "<td align='left'>Qtd</td>";
			montarListaItens += "<td align='left'>Item</td>";
			montarListaItens += "<td align='left'>Valor</td>";
			montarListaItens += "<td align='left'>Total</td>";

			for(i in data){
				numRegistrosItens++;

				valorTotalItemU = data[i].valorTotal;
				valorTotalItemU = formataValorParaImprimir(valorTotalItemU);

				valorUnitarioItemU = data[i].valorUnitario;
				valorUnitarioItemU = formataValorParaImprimir(valorUnitarioItemU);

				/* acumula valor total */
				valorTotalItem += data[i].valorTotal;

				/* monta linha com a informação do item */
				montarListaItens += "<tr>";

				montarListaItens += "<td align='left'>"+data[i].quantidade+"</td>";
				montarListaItens += "<td align='left'>"+data[i].itemNome+"</td>";
				montarListaItens += "<td align='left'>"+valorUnitarioItemU+"</td>";
				montarListaItens += "<td align='left'>"+valorTotalItemU+"</td>";

				montarListaItens += "</tr>";
			}

			valorTotalItem = formataValorParaImprimir(valorTotalItem);
			montarListaItens += "<tr><td colspan='3'></td><td align='left'>"+valorTotalItem+"</td></tr>";	
			montarListaItens += "</table>";
		}
		$("#modalPedidoItens").html(montarListaItens);
	});
}

function setarIpCampoConfig(){
	$("#modalIpConfig").val(hostWebService);
	$("#modalPortaConfig").val(portaImgService);
	$("#modalChaveConfig").val('');
	$("#modalUsuarioConfig").val('');
	document.getElementById("divOcultarIp").className = "hidden";
	document.getElementById("divAutenticaIP").className = "";
	document.getElementById("confimerIpButton").className = "hidden";
}

function autenticarIp(){
	var Usuario = $("#modalUsuarioIPConfig").val();
	var Chave = $("#modalChaveIPConfig").val();

	if ((Usuario == "ADM" || Usuario == "adm" || Usuario == "Adm") && (Chave == "9100")) {
		document.getElementById("divOcultarIp").className = "";
		document.getElementById("divAutenticaIP").className = "hidden";
		document.getElementById("confimerIpButton").className = "btn btn-success";
		$("#modalUsuarioIPConfig").val('');
		$("#modalChaveIPConfig").val('');
	} else {
		toastGeral("error", "Login e/ou Senha inválido(s)!");
	}

}

/* Focar campo quantidade do modal de item */
$('#modalAdicinarItem').on('shown.bs.modal', function () {
    $('#modalQtdItem').focus();
});

/* Focar campo IP do modal Config IP */
$('#modalConfiguraIp').on('shown.bs.modal', function () {
    $('#modalIpConfig').focus();
});


/* focar campo ficha do modal de consultar pedido por ficha */
$('#modalMesaPedido').on('shown.bs.modal', function () {
	var tipo = $("#tipoMesa").val();
	document.getElementById(tipo+"_input").focus();
    /* $('#modalCampoFichaPedido').focus(); */
});
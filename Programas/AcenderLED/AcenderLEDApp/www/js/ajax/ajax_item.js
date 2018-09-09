
var itensComposicaoArray = [];
var itensPreparoArray = [];
var itensAdicionalArray = [];

function montarViewAdicionaItem(mesa){
	var motarSubMenu = "";
	var complementoMotarSubMenu = "";
	var lancPedidoId = $("#documentoGeral").val();
	var controleDeLinha = -1;
	var controleDeLinhaContanti = 5;
	var contRegistro = 0;

	var espacoEntreImagens = "";
	var descricaoConpleta = "";
	var descricaoVetorizada = [];

	$.ajax({
		type: 'GET',
		url: urlWebService+"GrupoWs/listar/"+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		if (data.length == 0) {
			motarSubMenu += "<br>Não tem nenhum registro de Cliente no Servidor!";
		} else {	
			for(i in data){

				descricaoConpleta = data[i].descricao;
				while( descricaoConpleta.substring(descricaoConpleta.length - 1) == " " ){
					descricaoConpleta = descricaoConpleta.substring(0, descricaoConpleta.length - 1);
				}

				descricaoVetorizada = descricaoConpleta.split(" ");
				espacoEntreImagens = descricaoVetorizada.length > 1 ? "" : "<br><br><br>";

				motarSubMenu += "<div  class='col-xs-4 col-sm-3 col-lg-2 text-center'";
				motarSubMenu += 	"onclick='montarViewSubGrupo("+data[i].grupoItem+", \""+data[i].descricao+"\")' ";
				motarSubMenu += 	"data-toggle='modal' data-target='#modalViewSubGrupo' ";
				motarSubMenu += ">";
				/* http://"+hostServeImage+":"+portaImgService+"/panquecasCDI/img  */
				motarSubMenu += 	"<img src='img_grupo/"+data[i].imagem+"' height='auto' width='80%'>";
				motarSubMenu += 	"<br><span class='text-center' style='font-size:15px;margin-top: -10px;'>"+descricaoConpleta+"</span>"+espacoEntreImagens;
				motarSubMenu += "</div>";

				/* http://"+hostServeImage+":"+portaImgService+"/panquecasCDI/img */
				complementoMotarSubMenu  = "<div class='col-xs-4 col-sm-3 col-lg-2 text-center' style='opacity: 0;width: 25%>";
				complementoMotarSubMenu += 	"<img src='img_grupo/"+data[i].imagem+"' height='auto' width='80%'>";
				complementoMotarSubMenu += 	"<br><span class='text-center' style='font-size:15px;margin-top: -10px;' name='descricaoSubGrupoSpan'>"+descricaoConpleta+"</span>"+espacoEntreImagens;
				complementoMotarSubMenu += "</div>";

				contRegistro++;
			}

			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
		}
		if (window.innerWidth <= 450) {
			motarSubMenu += "<style>";
			motarSubMenu += "span { font-size: 65%; }";
			motarSubMenu += "</style>";
		}

		$("#gruposListaDiv").html(motarSubMenu);
	});
}



function montarViewSubGrupo(idGrupoItem, descricaoGrupoItem){
	var motarSubMenu = "";
	var lancPedidoId = $("#documentoGeral").val();
	var controleDeLinha = -1;
	var controleDeLinhaContanti = 4;
	var contRegistro = 0;
	var complementoMotarSubMenu = "";


	var espacoEntreImagens = "";
	var descricaoConpleta = "";
	var descricaoVetorizada = [];

	$.ajax({
		type: 'GET',
		url: urlWebService+"SubGrupoWs/listar/"+idGrupoItem+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		if (data.length == 0) {
			motarSubMenu += "<br>O grupo não tem Sub Grupo!";
		} else {
			for(i in data){

				descricaoConpleta = data[i].descricao;
				while( descricaoConpleta.substring(descricaoConpleta.length - 1) == " " ){
					descricaoConpleta = descricaoConpleta.substring(0, descricaoConpleta.length - 1);
				}

				/* descricaoVetorizada = descricaoConpleta.split(" ");
				 espacoEntreImagens = descricaoVetorizada.length > 2 ? "" : "<br><br><br>";
				 espacoEntreImagens = descricaoVetorizada.length > 3 && espacoEntreImagens == "" ? "" : "<br><br>"; */

				complementoMotarSubMenu = "";

				motarSubMenu += "<div class='col-xs-4 col-sm-3 col-lg-2 text-center' name='listaSubGrupoDivRespon'";
				motarSubMenu += 	"onclick='montarListaItensGrup(";
				motarSubMenu += 		data[i].subGrupoItem+", ";
				motarSubMenu += 		data[i].grupoItem+", ";
				motarSubMenu += 		"\""+descricaoGrupoItem+" <i class=\\\"fa fa-arrow-right\\\" aria-hidden=\\\"true\\\"></i> "+data[i].descricao+"\"";
				motarSubMenu += 	")' ";
				motarSubMenu += 	"align='center' height='auto' width='20%'";
				motarSubMenu += ">";
				/* http://"+hostServeImage+":"+portaImgService+"/panquecasCDI/img */
				motarSubMenu += 	"<img src='img_grupo/"+data[i].imagem+"' height='auto' width='80%'>";
				motarSubMenu += 	"<br><span class='text-center' style='font-size:15px;margin-top: -10px;'>"+descricaoConpleta+"</span>"+espacoEntreImagens;
				motarSubMenu += "</div>";

				complementoMotarSubMenu += "<div class='col-xs-4 col-sm-3 col-lg-2 text-center' style='opacity: 0;width: 33%'>";

				/* http://"+hostServeImage+":"+portaImgService+"/panquecasCDI/img */
				complementoMotarSubMenu += 	"<img src='img_grupo/"+data[i].imagem+"' height='auto' width='80%'>";
				complementoMotarSubMenu += 	"<br><span class='text-center' name='descricaoSubGrupoSpan' style='font-size:15px;margin-top: -10px;'>"+descricaoConpleta+"</span>"+espacoEntreImagens;
				complementoMotarSubMenu += "</div>";

				contRegistro++;
			}
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
		}
		$("#tabelaSubGrupoModal").html(motarSubMenu);
		$("#modalSubGrupoDescricao").html(descricaoGrupoItem);
		document.getElementById("modalSubGrupo").style.display = "block";
	});
}


function montarListaItensGrup(idSubGrupoItem, idGrupoItem, descricaoGrupoItem){
	var filial = $("#filial").val();
	document.getElementById("modalSubGrupo").style.display = "none";
	var motarSubMenu = "";

	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarItem/"+idSubGrupoItem+"/"+idGrupoItem+"/"+filial+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){

		if (data.length == 0) {
			motarSubMenu += "<input type=\"text\" id=\"itemAoProduto\" class=\"form-control\" value='Nenhum item nesse grupo!' disabled>";
			$("#listaItensPorGrupo").html(motarSubMenu);
		} else {
			motarSubMenu += "<input type='text' style='font-size: 15px;'";
			motarSubMenu += "	id='itemInputList'";
			motarSubMenu += "	class='flexdatalist form-control'";
			motarSubMenu += "	data-min-length='0' ";
			motarSubMenu += "	data-visible-properties='[\"descricao\"]'";
			motarSubMenu += "	data-selection-required='true' ";
			motarSubMenu += "	data-value-property='*'";
			motarSubMenu += "	list='clienteDataList' ";
			motarSubMenu += "	onchange='selecionarItem()'";
			motarSubMenu += "required>";

			$("#listaItensPorGrupo").html(motarSubMenu);
			setarValorItemInputList(data);
			document.getElementById("itemInputList-flexdatalist").focus();
		}
	});
}

function montarListaItensTodos(){
	var filial = $("#filial").val();
	var motarSubMenu = "";

	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarTodosItem/"+filial+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		if (data.length == 0) {
			motarSubMenu += "<h2 class='text-center' style='margin-top:-15px;'>Todos os Itens</h2>";
			motarSubMenu += "<br>Nenhum item encontrado!";
			$("#listaItensPorGrupo").html(motarSubMenu);
		} else {
			motarSubMenu += "<input type='text' ";
			motarSubMenu += "	id='itemInputList'";
			motarSubMenu += "	class='flexdatalist form-control'";
			motarSubMenu += "	data-min-length='0' ";
			motarSubMenu += "	data-visible-properties='[\"descricao\"]'";
			motarSubMenu += "	data-selection-required='true' ";
			motarSubMenu += "	data-value-property='*'";
			motarSubMenu += "	list='clienteDataList' ";
			motarSubMenu += "	onchange='selecionarItem()'";
			/* setStatus(\"item\"); */
			motarSubMenu += "required>";
			
			$("#listaItensPorGrupo").html(motarSubMenu);
			setarValorItemInputList(data);
			document.getElementById("itemInputList-flexdatalist").focus();
			
			document.getElementById('modalSubGrupo').style.display='none';
		}
	});
}


function setarValorItemInputList(elJSON){
	$('#itemInputList').flexdatalist({
		selectionRequired: true,
		valueProperty: '*',
		searchIn: 'descricao',
		minLength: 1,
		data: elJSON
	});

	document.getElementById("itemInputList-flexdatalist").onfocus = function (){ 
		document.getElementById('modalAdicionarItemConfig').style.display='none';
		if(this.value != ""){
			$("#itemInputList").val("");
			this.value = "";
			this.blur();
			this.focus();
		}
	};
}




/* {"item":6,"grupoItem":1,"subGrupoItem":1,"unidade_medida":"UN+vlr","descricao":"ABACAXI"}, */
function selecionarItem(){
	var objetoItem = $('#itemInputList').val();
	var montarOparacoes = "";
	var subVetorUM = [];
	var valorUnitario = 0;

	if (objetoItem == '') {
		/* document.getElementById("fecharModalBottun").click(); */
		document.getElementById('modalAdicionarItemConfig').style.display='none';
	} else {
		objetoItem = objetoItem.replace("{", "");
		objetoItem = objetoItem.replace("}", "");
		objetoItem = objetoItem.replace("\"\"descricao\":", "");
		objetoItem = objetoItem.replace("\"subGrupoItem\":", "");
		objetoItem = objetoItem.replace("\"unidade_medida\":\"", "");
		objetoItem = objetoItem.replace("\"grupoItem\":", "");
		objetoItem = objetoItem.replace("\"item\":", "");

		objetoItem = objetoItem.split(",");

		var item = objetoItem[0];
		var grupo = objetoItem[1];
		var subGrupo = objetoItem[2];
		var unidadeMedida = objetoItem[3];
		unidadeMedida = unidadeMedida.replace("\"", "");
		subVetorUM = unidadeMedida.split("+");
		unidadeMedida = subVetorUM[0];
		valorUnitario = subVetorUM[1];

		var desc = objetoItem[4];
		desc = desc.replace("\"descricao\":", "");

		$("#modalIdItem").val(item);
		$("#modalNomeItem").html(desc);
		$("#modalUnidadeMedidaItem").val(unidadeMedida);
		$("#modalSubGrupoItem").val(subGrupo);
		$("#modalGrupoItem").val(grupo);


		document.getElementById("modalAdicionarItemConfig").style.display = "block";
		concluirCodigoItem();
		document.getElementById('modalSubGrupo').style.display = 'none';

		var tabelaComplementos = document.getElementsByName("operacoesItemModalAdicionar");
		for (var i = 0; i < tabelaComplementos.length; i++) {
			tabelaComplementos[i].className = "hidden";
		}

		/* if (
			$("#documentoGeral").val() 	== "0" ||
			$("#editar").val() 			== "0"
		) 		
		document.getElementById("btn_salvar_item_ao_pedido").disabled = true;
		else */

		document.getElementById("btn_salvar_item_ao_pedido").disabled = false;
		$("#modalQtdItem").val("1");
		document.getElementById("modalQtdItem").focus();
		montarComposicaoItem(item);
		/* $("#operacoesItemModalAdicionar").html(montarOparacoes); */
		$("#modalVlrUnitarioItem").val(formataValorParaImprimir(valorUnitario));
		$("#modalVlrUnitarioItemReal").val(formataValorParaImprimir(valorUnitario));
		$("#titulo_adicional_dos_itens").html("");
		calculaTotalItem();
		$("#codigoProduto").val("");
		concluirCodigoItem();
	}
}



function selecioneItemCodigo(itemParam){
	var filial = $("#filial").val();
	/*var item = $("#codigoProduto").val(); */
	$("#buttonPesquisaCodigoItem").html("<i class='fa fa-spinner fa-spin fa-fw'></i>");
	var resultado = "";
	var subVetorUM = [];
	var valorUnitario = "";
	if (itemParam != "") {
		$.ajax({
			type: 'GET',
			url: urlWebService+"ItemWs/listarItemCodigo/"+itemParam+"/"+filial+parametrosWebService,
			contentType: "application/json",
			jsonpCallback: "localJsonpCallback"
		}).done( function(data){
			if (data.length == 0) {
				resultado = "<input class='form-control' value='Codigo Inválido' disabled>";
			} else {
				for(i in data){
					/* resultado += "<div class=\"input-group\"><!-- style='width:100%' -->"; */
					resultado += 	"<input class='form-control' value='"+data[i].descricao+"' disabled>";
					/* resultado += 	"<span class=\"input-group-addon\" style=\"padding: 0px;\">";
					resultado += 		"<button onclick='selecioneItemCodigo("+data[i].item+");' style=\"padding-top: 0px;padding-bottom: 0px;\" class=\"btn\">";
					resultado += 			"<i class='fa fa-location-arrow'></i>";
					resultado += 		"</button>";
					resultado += 	"</span>";
					resultado += "</div>";

					resultado += "<input class='form-control' value='"+data[i].descricao+"' disabled>";*/

					var item = data[i].item;
					var grupo = data[i].grupoItem;
					var subGrupo = data[i].subGrupoItem;
					var unidadeMedida = data[i].unidade_medida;
					unidadeMedida = unidadeMedida.replace("\"", "");
					subVetorUM = unidadeMedida.split("+");
					unidadeMedida = subVetorUM[0];
					valorUnitario = subVetorUM[1];

					var desc = data[i].descricao;
					desc = desc.replace("\"descricao\":", "");

					$("#modalIdItem").val(item);
					$("#modalNomeItem").html(desc);
					$("#modalUnidadeMedidaItem").val(unidadeMedida);
					$("#modalSubGrupoItem").val(subGrupo);
					$("#modalGrupoItem").val(grupo);


					document.getElementById("modalAdicionarItemConfig").style.display = "block";
					concluirCodigoItem();
					document.getElementById('modalSubGrupo').style.display = 'none';

					var tabelaComplementos = document.getElementsByName("operacoesItemModalAdicionar");
					for (var i = 0; i < tabelaComplementos.length; i++) {
						tabelaComplementos[i].className = "hidden";
					}

					document.getElementById("btn_salvar_item_ao_pedido").disabled = false;
					$("#modalQtdItem").val("1");
					document.getElementById("modalQtdItem").focus();
					montarComposicaoItem(item);
					/* $("#operacoesItemModalAdicionar").html(montarOparacoes); */
					$("#modalVlrUnitarioItem").val(formataValorParaImprimir(valorUnitario));
					$("#modalVlrUnitarioItemReal").val(formataValorParaImprimir(valorUnitario));
					$("#titulo_adicional_dos_itens").html("");
					$("#codigoProduto").val("");
					calculaTotalItem();
				}
			}
			$("#buttonPesquisaCodigoItem").html("<i class='fa fa-location-arrow'></i>");
			$("#listaItensPorGrupo").html(resultado);
			concluirCodigoItem();
		});
	} else {
		toastGeral("error", "Digite o codigo do produto!");
		$("#buttonPesquisaCodigoItem").html("<i class='fa fa-location-arrow'></i>");
	}
}



function montarComposicaoItem(item){
	itensComposicaoArray = [];
	itensPreparoArray = [];
	itensAdicionalArray = [];

	var tabelaComposicao = "";
	var tabelaPreparo = "";
	var tabelaAdicional = "";
	var quantidade = 0;
	var filial = $("#filial").val();
	var subVetorUM = [];
	var valorUnitarioAdicional = 0;

	/* Composição do item */
	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarItensComposicao/"+item+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		if (data.length == 0) {
			tabelaComposicao = "<br><h2>Nenhum item na composição desse item!</h2>";
		} else {
			/* tabelaComposicao += "<h2>Composição</h2><div class='text-center'></div>"; */
			tabelaComposicao += "<table class='table fontTable'>";
			/* position: fixed;width: 100%; background-color: white; */
			tabelaComposicao += "<tr style='color: black'>";
			tabelaComposicao += "<td><b>Descrição</b></td>";
			tabelaComposicao += "<td align='center'><b>Qtd</b></td>";
			tabelaComposicao += "<td align='center'><b>Condição</b></td>";
			tabelaComposicao += "</tr>";

			for(i in data){
				quantidade = formataValorParaQuantidade(data[i].unidade_medida);

				itensComposicaoArray.push(data[i].item);
				tabelaComposicao += "<tr onclick='mudarCondicaoItem("+data[i].item+", \"Composicao\")' id='linhaComposicao_"+data[i].item+"' bgcolor='#5cb85c'>";

				tabelaComposicao += "<td>";
				tabelaComposicao += 	data[i].descricao;
				tabelaComposicao += 	"<input class='hidden' type='checkbox' id='inputComposicao_"+data[i].item+"' checked>";
				tabelaComposicao += "</td>";
				tabelaComposicao += "<td align='right'>";
				tabelaComposicao += 	quantidade+"&nbsp;&nbsp;&nbsp;";
				tabelaComposicao += "</td>";
				tabelaComposicao += "<td align='center'>";
				tabelaComposicao += 	"<span id='spanComposicao_"+data[i].item+"'>";
				tabelaComposicao += 		"<i class='fa fa-check' aria-hidden='true'></i>";
				tabelaComposicao += 	"</span>";
				tabelaComposicao += "</td>";

				tabelaComposicao += "</tr>";
			}
		}
		$("#conteudoComposicaoModalAdicionarItem").html(tabelaComposicao);
	});



	/* Prepraro do item */
	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarItensPreparo/"+item+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		if (data.length == 0) {
			tabelaPreparo = "<br><h2>Nenhum modo diferente de preparo para esse item!</h2>";
		} else {
			/* tabelaPreparo += "<h2>Preparo</h2><div class='text-center'></div>"; */
			tabelaPreparo += "<table class='table fontTable'>";
			tabelaPreparo += "<tr style='color: black'>";
			tabelaPreparo += "<td><b>Descrição</b></td>";
			tabelaPreparo += "<td align='center'><b>Condição</b></td>";
			tabelaPreparo += "</tr>";

			for(i in data){
				itensPreparoArray.push(data[i].item);
				tabelaPreparo += "<tr onclick='mudarCondicaoItem("+data[i].item+", \"Preparo\")' id='linhaPreparo_"+data[i].item+"' bgcolor='#f0ad4e'>";

				tabelaPreparo += "<td>";
				tabelaPreparo += 	"<span id='spanDescricaoPreparo_"+data[i].item+"'>"+data[i].descricao+"</span>";
				tabelaPreparo += 	"<input class='hidden' type='checkbox' id='inputPreparo_"+data[i].item+"'>";
				tabelaPreparo += "</td>";
				tabelaPreparo += "<td align='center'>";
				tabelaPreparo += 	"<span id='spanPreparo_"+data[i].item+"'>";
				tabelaPreparo += 		"<i class='fa fa-times' aria-hidden='true'></i>";
				tabelaPreparo += 	"</span>";
				tabelaPreparo += "</td>";

				tabelaPreparo += "</tr>";

				data[i].item++;
			}
		}
		$("#conteudoPreparoModalAdicionarItem").html(tabelaPreparo);
	});


	var descricaoItemParaMostrar = "";
	var QTD_NAO_COBRAR = "";
	var array_desc_atdN = [];

	/* Adicional do item */
	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarItensAdicional/"+item+"/"+filial+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		if (data.length == 0) {
			tabelaAdicional = "<br><h2>Nenhum item adicional a esse item!</h2>";
		} else {
			/* tabelaAdicional += "<h2>Adicional</h2>";
			tabelaAdicional += "<div class='text-center'></div>"; */
			tabelaAdicional += "<table class='table fontTable'>";
			tabelaAdicional += "<tr style='color: black'>";
			tabelaAdicional += "<td><b>Descrição</b></td>";
			tabelaAdicional += "<td align='center'><b>Qtd</b></td>";
			tabelaAdicional += "<td align='center'><b>Valor</b></td>";
			tabelaAdicional += "<td align='center'><b>Condição</b></td>";
			tabelaAdicional += "</tr>";

			for(i in data){
				array_desc_atdN = data[i].descricao.split("++");
				descricaoItemParaMostrar = array_desc_atdN[0];
				QTD_NAO_COBRAR = array_desc_atdN[1];
				$("#qtd_n_cobrar").val(QTD_NAO_COBRAR);
				subVetorUM = data[i].unidade_medida.split("+");
				quantidade = formataValorParaQuantidade(subVetorUM[0]);
				valorUnitarioAdicional = subVetorUM[1];

				itensAdicionalArray.push(data[i].item);
				tabelaAdicional += "<tr ";
				tabelaAdicional += 		"onclick='mudarCondicaoItem("+data[i].item+", \"Adicional\");calculaTotalItem();' ";
				tabelaAdicional += 		"id='linhaAdicional_"+data[i].item+"' ";
				tabelaAdicional += 		"bgcolor='#f0ad4e'";
				tabelaAdicional += ">";

				tabelaAdicional += "<td>";
				tabelaAdicional += 	descricaoItemParaMostrar;
				tabelaAdicional += 	"<input class='hidden' type='checkbox' id='inputAdicional_"+data[i].item+"'>";
				tabelaAdicional += "</td>";
				tabelaAdicional += "<td align='right'>";
				tabelaAdicional += 	quantidade+"&nbsp;&nbsp;&nbsp;";
				tabelaAdicional += "</td>";
				tabelaAdicional += "<td align='right'>";
				tabelaAdicional += 		"<span id='vlrUnitarioItemComplemento_"+data[i].item+"'>";
				tabelaAdicional += 			valorUnitarioAdicional;
				tabelaAdicional += 		"</span>&nbsp;&nbsp;&nbsp;";
				tabelaAdicional += "</td>";
				tabelaAdicional += "<td align='center'>";
				tabelaAdicional += 	"<span id='spanAdicional_"+data[i].item+"'>";
				tabelaAdicional += 		"<i class='fa fa-times' aria-hidden='true'></i>";
				tabelaAdicional += 	"</span>";
				tabelaAdicional += "</td>";

				tabelaAdicional += "</tr>";
			}
			tabelaAdicional += "</table>";
		}
		$("#conteudoAdicionalModalAdicionarItem").html(tabelaAdicional);
	});
}



var permissaodeAlteracaoCondItem = true;


function mudarCondicaoItem(item, tipo){
	if (permissaodeAlteracaoCondItem) {
		var check = document.getElementById("input"+tipo+"_"+item).checked;
		if (check) {
			document.getElementById("input"+tipo+"_"+item).checked = false;
			document.getElementById("linha"+tipo+"_"+item).style.backgroundColor = "#f0ad4e";
			document.getElementById("span"+tipo+"_"+item).innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";
		} else {
			document.getElementById("input"+tipo+"_"+item).checked = true;
			document.getElementById("linha"+tipo+"_"+item).style.backgroundColor = "#5cb85c";
			document.getElementById("span"+tipo+"_"+item).innerHTML = "<i class='fa fa-check' aria-hidden='true'></i>";
		}
	}
}



function mostrarComposicaoDoItem(especificacao, titulo){
	$("#titulo_adicional_dos_itens").html("<h2 style='margin: 0;width: 100%;'>"+titulo+"</h2>");
	var numOperadores = document.getElementsByName("operacoesItemModalAdicionar").length;
	for(var i = 0; i < numOperadores; i++){
		document.getElementsByName("operacoesItemModalAdicionar")[i].className = "hidden";
	}
	if (especificacao != "0") {
		document.getElementById("conteudo"+especificacao+"ModalAdicionarItem").className = "blocoTabelaComplementoItem";	
	}
}



function limparCamposModalItem(){
	$("#modalQtdItem").val(1);
	$("#modalVlrUnitarioItem").val("");
	$("#modalVlrTotalItem").val("");
	/* $("#modalComplementoItem").val(""); */
	mostrarComposicaoDoItem("0", "");
}































function preAdicionaItemPedido(){
	document.getElementById("btn_salvar_item_ao_pedido").disabled = true;
	var valorTotal = $("#modalVlrTotalItem").val();
	valorTotal = formataValorParaCalcular2(valorTotal);
	if(valorTotal > 0){
		if ($("#documentoGeral").val() == "0") { /* && $("#editar").val() == "0" */
			adicionaPedido("item");
		} else {
			adicionaItemAoPedido();
		}
	}
	else {
		toastGeral("error", "Valor Total tem que ser maior que zero!");
	}
}






function adicionaItemAoPedido(){
	permissaodeAlteracaoCondItem = false;
	var quantidade = $("#modalQtdItem").val();
	var valorUnitario = $("#modalVlrUnitarioItem").val();
	var valorUnitarioReal = $("#modalVlrUnitarioItemReal").val();
	var valorTotal = $("#modalVlrTotalItem").val();
	var item = $("#modalIdItem").val();
	var filial = $("#filial").val();
	var documento = $("#documentoGeral").val();
	var sequecia = 0; /* $("#sequencia").val(); */
	var unidadeMedida = $("#modalUnidadeMedidaItem").val(unidadeMedida);
	var subGrupo = $("#modalSubGrupoItem").val(subGrupo);
	var grupo = $("#modalGrupoItem").val(grupo);
	var complemeto = "";/* $("#modalComplementoItem").val(); */
	var valorUnitarioComplemento = 0;
	var parametrosAdicional = "";

	quantidade = formataValorParaCalcular(quantidade);
	valorUnitario = formataValorParaCalcular2(valorUnitario);
	valorUnitarioReal = formataValorParaCalcular2(valorUnitarioReal);

	valorTotal = formataValorParaCalcular2(valorTotal);

	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/retornaSeguencia/"+filial+"/"+documento+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		sequecia = parseInt(data) + 1;
		if (
			   quantidade != "" 
			&& valorUnitario != "" 
			&& valorTotal != ""  
			&& item != "" 
			&& sequecia != 0 
			&& quantidade != 0 
			&& valorTotal > 0 
			&& valorUnitario > 0 
			&& valorUnitarioReal > 0
		){

			var lancPedidoIdObject = { 
				"filial": filial, 
				"documento": documento, 
				"sequencia": sequecia,
				"item": item,
				"quantidade": quantidade, 
				"valorUnitario": valorUnitario, 
				"valorTotal": valorTotal,
				"grupoItem" : grupo,
				"subGrupoItem": subGrupo,
				"unidadeMedida": unidadeMedida,
				"adicionalProduto": complemeto
			};

			$.ajax({
				type: 'POST',
				cache: false,
				url: urlWebService+"ItemWs/inserir",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(lancPedidoIdObject)
			}).done( function(data){
				if (data != 0) {

					var filialItem = $("#filial").val();
					var documentoGeral = $("#documentoGeral").val();

			 		/* gravar as exeções da grade */
					var idAdicionado = data;
					for(var i = 0; i < itensComposicaoArray.length; i++){
						if (!document.getElementById("inputComposicao_"+itensComposicaoArray[i]).checked) {
							$.ajax({
								type: 'GET',
								url: urlWebService+"ItemWs/adicionarItemExecao/"+idAdicionado+"/"+itensComposicaoArray[i]+parametrosWebService,
								contentType: "application/json",
								jsonpCallback: "localJsonpCallback"
							}).done( function(data){});
						}
					}


			 		/*  grava preparo da grade */
					var descricaoPreparo = "";
					var vetor = [];
					for(var i = 0; i < itensPreparoArray.length; i++){
						if (document.getElementById("inputPreparo_"+itensPreparoArray[i]).checked) {
							descricaoPreparo = document.getElementById("spanDescricaoPreparo_"+itensPreparoArray[i]).innerHTML;
							descricaoPreparo = descricaoPreparo.replace(/ /g, "-");
							$.ajax({
								type: 'GET',
								url: urlWebService+"ItemWs/adicionarItemPreparo/"+idAdicionado+"/"+descricaoPreparo+"/"+filialItem+"/"+documentoGeral+parametrosWebService,
								contentType: "application/json",
								jsonpCallback: "localJsonpCallback"
							}).done( function(data){});
						}
					}

			 		/* gravar adicional */
					for(var i = 0; i < itensAdicionalArray.length; i++){
						if (document.getElementById("inputAdicional_"+itensAdicionalArray[i]).checked) {
							valorUnitarioComplemento = $("#vlrUnitarioItemComplemento_"+itensAdicionalArray[i]).html();
							valorUnitarioComplemento = formataValorParaCalcular(valorUnitarioComplemento);

							parametrosAdicional = idAdicionado+"/"+itensAdicionalArray[i]+"/"+filialItem+"/"+documentoGeral+"/"+valorUnitarioComplemento+"/"+String(parseFloat($("#modalQtdItem").val()));
							$.ajax({
								type: 'GET',
								url: urlWebService+"ItemWs/adicionarItemAdicional/"+parametrosAdicional+parametrosWebService,
								contentType: "application/json",
								jsonpCallback: "localJsonpCallback"
							}).done( function(data){});
						}
					}
					toastGeral("success", "Item adicionado com sucesso!");

					document.getElementById("modalAdicionarItemConfig").style.display = "none";
					document.getElementById("tecladoNumerico").style.display = "none";
					
					/* if (document.getElementById("talaPedidosItens").style.display == "block") { */
					montarListaItem($("#documentoGeral").val(), 'editar');
					abrirTelaPedido('talaPedidosItens');
					permissaodeAlteracaoCondItem = true;
					document.getElementById("codigoProduto").focus();
					document.getElementById("itemInputList-flexdatalist").value = "";
					/* } */
				} else {
					toastGeral("error", "Erro ao adicinar item ao pedido!");
					permissaodeAlteracaoCondItem = true;
				}
			/* 	limparCamposModaltem(); */
			});
		} else {
			toastGeral("error", "Verifique se todos os dados foram preenchidos e se o valor unitário não veio zeradao!");
			permissaodeAlteracaoCondItem = true;
		}
	});
}

function calcQtdItem(op){
	if ($("#modalQtdItem").val() == "") {$("#modalQtdItem").val(0);}
	if (op == "+") {
		var result = parseInt($("#modalQtdItem").val()) + 1;
	} else {
		var result = parseInt($("#modalQtdItem").val()) - 1;
	}	
	if (result > 0) {$("#modalQtdItem").val(result);}
	else {$("#modalQtdItem").val(1);}
	calculaTotalItem();
}
// Funções particulares desse projeto
function montarListaPedsito(filial){

	var carregando = "<div class='text-center'>";
	carregando += "<br><br><br><h4>Carregando&nbsp;&nbsp;&nbsp;<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></h4>";
	carregando += "</div>";
	$("#listaPagina").html(carregando);

	subirPagina();
	
	// variaveis de configuração do metodo
	var corLinha = "";
	var valorTotal = 0;
	var emissaoItem = "";
	var dataAtual = pegarData();
	var montarListaPedido = "";
	var situacaoMesa = "";

	// variaveis de configuração de registro por linha na tabela
	var controleDeLinha = -1;
	var controleDeLinhaContanti = 6;
	var contRegistro = 0;
	var vetor = [];

	// var filial = $("#filial").val();


	$.ajax({
		type: 'GET',
		url: urlWebService+"MesaWs/listar/"+filial+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		setStatus('inicial');

		if (data.length == 0) {
			montarListaPedido += "<br>Nenhum registro encontrado!";
		} else {
			// table de mesas
			montarListaPedido += "<br><div class='col-md-12'>";
			// montarListaPedido += "<table border='2'>";// class='table' style='margin-top:-5px; color:#fff;'


			for(i in data){
				valorTotal = data[i].total;
				valorTotal = formataValorParaImprimir(valorTotal);
				emissaoItem = data[i].emissao.replace(" 00:00:00.0", "");
				vetor = data[i].descricao.split(" ");

				// verificação de configuração de linha 
				if (controleDeLinha == -1) {
					// montarListaPedido += "<tr>";
					controleDeLinha++;
				} else if (controleDeLinha >= controleDeLinhaContanti) {
					// montarListaPedido += "</tr><tr>";
					controleDeLinha = 0;
				}


				// verificação da mesa de forma individual
				if (data[i].cliente == 0) {	corLinha = "#5cb85c"; situacaoMesa = "d" } // verde /* d == disponivel */

				else if (emissaoItem != dataAtual) {	corLinha = "#d9534f"; situacaoMesa = "n";valorTotal = formatarData(emissaoItem)} // vermelho /* n == não finalizado */

				else {	corLinha = "#428bca"; situacaoMesa = "o" } // azul /* o == ocupado */

				// montarListaPedido += "<tr >";
				if (situacaoMesa == "d") {
					montarListaPedido += "<div class='text-center col-xs-3' name='divMesaLista' id='linhaMesa"+data[i].codigo+"' style='background-color: "+corLinha+";border-style: ridge;' ";
					montarListaPedido += 		"onclick='montarViewAdicionaMesa("+data[i].codigo+",\""+data[i].descricao+"\")'";
					montarListaPedido += ">";
				} else if (situacaoMesa == "o") {
					montarListaPedido += "<div class='text-center col-xs-3' name='divMesaLista' id='linhaMesa"+data[i].codigo+"' style='background-color: "+corLinha+";border-style: ridge;' ";
					montarListaPedido += 		"onclick='montarListaItem(\""+data[i].documento+"\")'";
					montarListaPedido += ">";
				} else {
					montarListaPedido += "<div class='text-center col-xs-3' name='divMesaLista' id='linhaMesa"+data[i].codigo+"' style='background-color: "+corLinha+";border-style: ridge;'>";
				}


				if (vetor[0] == "MESA") {
					montarListaPedido += "<img src='img/mesa.png'  height='auto' width='100%'><br>";
				} else if (vetor[0] == "RETIRA") {
					montarListaPedido += "<img src='img/retira.png'  height='auto' width='100%'><br>";
				} else if (vetor[0] == "ENTREGA") {
					montarListaPedido += "<img src='img/entrega.png'  height='auto' width='100%'><br>";
				} else {
					montarListaPedido += "<img src='img/outros.png'  height='auto' width='100%'><br>";
				}

					
					// montarListaPedido += data[i].codigo+"<br>";
					montarListaPedido += data[i].descricao+"<br>";
					if (situacaoMesa != "d") {
						montarListaPedido += valorTotal;
					} else {
						montarListaPedido += "-";
					}

				montarListaPedido += "</div>";


				// continuação da verificação de controle de linha da tabela
				controleDeLinha++;
				contRegistro++;

				if (data.length == contRegistro) {
					// montarListaPedido += "</tr>";
				}

			}
			// montarListaPedido += "</table>";
			montarListaPedido += "</div>";



			// legenda de cores da tabela de mesas
			montarListaPedido += "<table style='margin-left:15px;'><tr>";

			montarListaPedido += "<td>";
			montarListaPedido += "<div style='background-color: #5cb85c;' class='legenda'></div>";
			montarListaPedido += "</td><td>";
			montarListaPedido += "&nbsp;&nbsp;Mesa Livre&nbsp;&nbsp;&nbsp;";
			montarListaPedido += "</td>";

			montarListaPedido += "<td>";
			montarListaPedido += "<div style='background-color: #428bca;' class='legenda'></div>";			
			montarListaPedido += "</td><td>";
			montarListaPedido += "&nbsp;&nbsp;Ocupada&nbsp;&nbsp;&nbsp;";
			montarListaPedido += "</td>";

			montarListaPedido += "<td>";
			montarListaPedido += "<div style='background-color: #d9534f;' class='legenda'></div>";
			montarListaPedido += "</td><td>";
			montarListaPedido += "&nbsp;&nbsp;Não finalizado&nbsp;&nbsp;&nbsp;";
			montarListaPedido += "</td>";
			
			montarListaPedido += "</tr></table><br><br><br>";
		};

		$("#listaPagina").html(montarListaPedido);
		var arrayDivMesas = document.getElementsByName('divMesaLista');
		for (var i = 0; i < arrayDivMesas.length; i++) {
			if (window.innerWidth <= 600) {
				arrayDivMesas[i].className = "text-center col-xs-3";
			} else {
				arrayDivMesas[i].className = "text-center col-xs-2";
			}
			
		}
	});
}

function montarMenuPrincipal(){

	// Configuração de data
	// var dataAtual = pegarData();
	var dataAtual = dataDaVezRodando;


	var identificador = $("#identificador").val();
	var razaoSocial = $("#identificador").data("razaosocial");


	// var cabecario_text_html = "<br><h2 class='text-center'>Página Principal</h2>";
	var cabecario_text_html = "<div class='col-md-12' style='margin-top:10px;'>";
	cabecario_text_html += "<table class='table' style='margin-bottom: -20px;'><tr><td colspan='2'>"
	
	cabecario_text_html += "<h4 style='margin-bottom:1px;margin-top:1px;'>";
	cabecario_text_html += 		identificador+":"+razaoSocial;
	cabecario_text_html += "</h4>";

	cabecario_text_html += "</td><td>";

	cabecario_text_html += "<button class='btn btn-block btn-primary' onclick='montarListaPedsito( $(\"#filial\").val() );'>Atualizar</button>";
	// cabecario_text_html += "<input type='text' value='' class='form-control' disabled>";
	
	cabecario_text_html += "</td><tr></tr><td width='50%'>";
	
	// cabecario_text_html += "<h4>Data</h4>";
	// cabecario_text_html += "<input type='date' id='dataPedido' value='"+dataAtual+"' class='form-control' style='height: 50px;' onclick='montarListaPedsito()'>";
	
	// cabecario_text_html += "</td><td width='50%'>";
	
	// cabecario_text_html += "<button id='buttonAdicionaPedido' class='btn btn-primary btn-block' onclick='montarListaPedsito()'>";
	// cabecario_text_html += "Listar";
	// cabecario_text_html += "</button>";
	// cabecario_text_html += "</div>";

	cabecario_text_html += "</td></tr></table>";

	
	cabecario_text_html += "</div>";

	var botaoVoltarFixo = "<button class='btn btn-info' onclick='logoff();'>";
	botaoVoltarFixo += '<i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;';
	botaoVoltarFixo += "Sair";
	botaoVoltarFixo += "</button>";

	// var botaoFichaFixo = "<button class='btn btn-warning' ";
	// botaoFichaFixo += "data-toggle='modal' data-target='#modalFichaPedido' onclick='setStatus(\"ficha1\")'>";
	// botaoFichaFixo += "<i class='fa fa-search' aria-hidden='true'></i>&nbsp;";
	// botaoFichaFixo += "Mesa";
	// botaoFichaFixo += "</button>";
	2
	$("#cabecarioPrincipal").html(cabecario_text_html);
	$("#botaoVoltarFixo").html(botaoVoltarFixo);
	// $("#botaoPesquisarFicha").html(botaoFichaFixo);
	montarListaPedsito( $("#filial").val() );
}

function excluirPedido(id){

	bootbox.confirm({
		title: "Tem certeza que deseja excluir este pedido?",
		message: "Ao aperta o botão \"Sim\" você irá excluir este pedido por completo do sistema",
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
				// remover itens
				$.ajax({
					type: 'GET',
					url: urlWebService+"PedidoWS/removerItens/"+id+parametrosWebService,
					contentType: "application/json",
					jsonpCallback: "localJsonpCallback"
				}).done( function(data){ console.log("data:"+data); });

				// remover pedido
				$.ajax({
					type: 'GET',
					url: urlWebService+"PedidoWS/remover/"+id+parametrosWebService,
					contentType: "application/json",
					jsonpCallback: "localJsonpCallback"
				}).done( function(data){ console.log("data:"+data); });

				toastGeral("info", "Pedido removido com sucesso!");
				$("#linhaPedido"+id).remove();
			}
		}
	});
}


function montarListaMesasCombo(){
	var montarListaPedido = "";
	var vetor = [];
	var select = "";
	var dataList = "";
	var ultimoTipo = "";
	var totalRegistro = "";
	var filial = $("#filial").val();

	$.ajax({
		type: 'GET',
		url: urlWebService+"MesaWs/listar/"+filial+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		if (data.length == 0) {
			montarListaPedido += "<br>Nenhum registro encontrado!";
		} else {
			select += "<select id='tipoMesa' class='form-control' onchange='input_datalist()'>";
			for(i in data){
				vetor = data[i].descricao.split(" ");
				if (ultimoTipo == "") {
					ultimoTipo = vetor[0];

					select += "<option value='"+ultimoTipo+"'>"+ultimoTipo+"</option>";

					dataList += "<input class='hidden' type='number' list='"+ultimoTipo+"_datlist' name='ultimoTipo_input' id='"+ultimoTipo+"_input'>";
					dataList += "<datalist id='"+ultimoTipo+"_datlist'>";
					dataList += "<option value='"+vetor[1]+"'>";

				} else if (ultimoTipo == vetor[0]) {
					// dataList += "<input class='hidden' list='"+ultimoTipo+"_datlist' id='"+ultimoTipo+"_input'>";
					// dataList += "<datalist id='"+ultimoTipo+"_datlist'>";
					dataList += "<option value='"+vetor[1]+"'>";

				} else {
					dataList += "</datalist>";

					ultimoTipo = vetor[0];

					select += "<option value='"+ultimoTipo+"'>"+ultimoTipo+"</option>";

					dataList += "<input class='hidden' type='number' list='"+ultimoTipo+"_datlist' name='ultimoTipo_input' id='"+ultimoTipo+"_input'>";
					dataList += "<datalist id='"+ultimoTipo+"_datlist'>";
					dataList += "<option value='"+vetor[1]+"'>";
				}

				totalRegistro++;
				if (totalRegistro == data.length) {
					dataList += "</datalist>";
					select += "</select><br>"+dataList;
					montarListaPedido = select;
				}
			}
			// montarListaPedido += "<input type='text' id='mesaInputList'";
			// montarListaPedido += "class='flexdatalist form-control'";
			// montarListaPedido += "data-min-length='0' data-visible-properties='[\"descricao\"]'";
			// montarListaPedido += "data-selection-required='true' data-value-property='codigo'";
			// montarListaPedido += "list='clienteDataList' required>";
		}
		$("#comboMesaModalMesa").html(montarListaPedido);
		// setarValorMesaInputList(resultado);
		input_datalist();
	});
}

function input_datalist(){
	var numInput = document.getElementsByName("ultimoTipo_input").length;
	for(var i = 0; i < numInput; i++){
		document.getElementsByName("ultimoTipo_input")[i].className = "hidden";
		document.getElementsByName("ultimoTipo_input")[i].value = "";
	}
	var tipoMesa = $("#tipoMesa").val();
	document.getElementById(tipoMesa+"_input").className = "form-control";
	document.getElementById(tipoMesa+"_input").focus();
}

// function setarValorMesaInputList(elJSON){
// 	$('#mesaInputList').flexdatalist({
// 		selectionRequired: true,
// 		valueProperty: 'codigo',
// 		searchIn: 'descricao',
// 		minLength: 1,
// 		data: elJSON
// 	});
// 	$("#mesaInputList-flexdatalist").val("MESA ");
// 	$('#mesaInputList-flexdatalist').focus();
// }

/*********************************************************************************************************************/
/*-----------------------------------------//** Separado Codigo **//*------------------------------------------------*/
/*********************************************************************************************************************/



// Funções Genericas Para Projetos
function editar(el){
	var id_cliente_unid_cons = $(el).data("id");
	$("#editar").val(id_cliente_unid_cons);
}

function editarId(id){
	$("#editar").val(id);
}

function n_editar(){
	$("#editar").val(0);
	$("#fichaPesquisa").val(0);
}

function maius(obj){
	obj.value = obj.value.toUpperCase();
}

function subirPagina(){
	var html = document.documentElement;
	html.scrollLeft = 0;
	html.scrollTop = 0;
}


function pegarData(){
	var now = new Date;
	var diaCerto = now.getDate();
	var mesCerto = now.getMonth() + 1;

	if (diaCerto < 10) 	diaCerto = "0" + diaCerto;
	if (mesCerto < 10) 	mesCerto = "0" + mesCerto;

	var dataAtual = now.getFullYear() + "-" + mesCerto + "-" + diaCerto;
	return dataAtual;
}

function formatarData(dataUN){
	dataUN = dataUN.split("-");
	var anoCerto = dataUN[0].substring(2, 4);
	dataUN = dataUN[2]+"/"+dataUN[1]+"/"+anoCerto;
	return dataUN;
}


function calculaTotalItem(){
	var quantidade = $("#modalQtdItem").val();
	
	formataValorParaCalcular(quantidade);
	var vlrUnitario = $("#modalVlrUnitarioItemReal").val();
	vlrUnitario = formataValorParaCalcular2(String(vlrUnitario));
	
	var codDescota = $("#qtd_n_cobrar").val();
	codDescota = codDescota != "" ? codDescota : 0;
	var contSelecionado = 0;
	var valorDesconto = 0;
	var numItemsDesconto = 0;
	var valorUnitario = 0;
	var contDesconto = 0;

	var vlrUnitarioComplemto = [];
	for(var i = 0; i < itensAdicionalArray.length; i++){
		if (document.getElementById("inputAdicional_"+itensAdicionalArray[i]).checked) {
			valorUnitario = $("#vlrUnitarioItemComplemento_"+itensAdicionalArray[i]).html();
			// console.log("valorUnitario: "+valorUnitario);
			vlrUnitarioComplemto.push(parseFloat(valorUnitario));
			contSelecionado++;
		}
	}

	vlrUnitarioComplemto.sort();
	// console.log("contSelecionado: "+contSelecionado+"\ncodDescota: "+codDescota);
	numItemsDesconto = parseInt(contSelecionado) - parseInt(codDescota);
	if (numItemsDesconto > 0) {
		for (var i = vlrUnitarioComplemto.length - 1; i >= 0; i--) {
			valorDesconto = parseFloat(vlrUnitarioComplemto[i]) + parseFloat(valorDesconto);
			contDesconto++;
			i = numItemsDesconto == contDesconto ? -1 : i;
		}
	}
	// console.log(valorDesconto);

	vlrUnitario = parseFloat(valorDesconto) + parseFloat(vlrUnitario);

	if (quantidade != "" && vlrUnitario != "") {
		// vlrUnitario = formataValorParaCalcular2(vlrUnitario);
		// vlrAdicional = formataValorParaCalcular(vlrAdicional);

		var total = quantidade * vlrUnitario;
		// total = parseFloat(total) + parseFloat(vlrAdicional);

		total = formataValorParaImprimir(total);
		vlrUnitario = formataValorParaImprimir(vlrUnitario);
		$("#modalVlrTotalItem").val(total);
		$("#modalVlrUnitarioItem").val(vlrUnitario);
	} else {
		$("#modalVlrTotalItem").val("");
	}
}

function formataValorParaCalcular(valor){
	valor = String(valor);
	valor = valor.replace("R$", "");
	// valor = valor.replace(".", "");
	valor = valor.replace(" ", "");
	valor = valor.replace(",", "");
	valor = parseFloat(valor);
	valor = valor.toFixed(2);
	return valor;
}

function formataValorParaCalcular2(valor){
	valor = valor.replace("R$", "");
	valor = valor.replace(".", "");
	valor = valor.replace(" ", "");
	valor = valor.replace(",", ".");
	valor = parseFloat(valor);
	valor = valor.toFixed(2);
	return valor;
}

function formataValorParaImprimir(valor){
	valor = parseFloat(valor);
	valor = moeda(valor , 2 , "," , ".");
	//valor = valor.toFixed(2);
	//valor = valor.replace(".", ",");
	valor = "R$"+valor;
	return valor;
}

function formatarValorParaDecimal(valor){	
	valor = parseFloat(valor);
	valor = valor.toFixed(2);
	valor = valor.replace(".", ",");
	// valor = "R$ "+valor;
	return valor;
}

function formataValorParaQuantidade(valor){
	valor = parseFloat(valor);
	valor = valor.toFixed(3);
	valor = valor.replace(".",",");
	return valor;
}


function botaVoltarMenuPrincipal(){
	var motarSubMenu = "<button onclick='setStatus(\"inicial\");n_editar();montarMenuPrincipal()' class='btn btn-info' title='Voltar'>";
	motarSubMenu += "<i class='fa fa-arrow-left' aria-hidden='true'></i>&nbsp;";
	motarSubMenu += "Voltar";
	motarSubMenu += "</button>";

	$("#botaoVoltarFixo").html(motarSubMenu);
}

function botaoVoltarPedido(id){
	var motarSubMenu = "	<button onclick='setStatus(\"pagina2\");montarListaItem(\""+id+"\")' class='btn btn-info' title='Voltar'>";
	motarSubMenu += "		<i class='fa fa-arrow-left' aria-hidden='true'></i>&nbsp;";
	motarSubMenu += "		Voltar ao pedido";
	motarSubMenu += "	</button>";

	$("#botaoVoltarFixo").html(motarSubMenu);
}

function moeda(valor, casas, separdor_decimal, separador_milhar){ 
 	var valor_total = parseInt(valor * (Math.pow(10,casas)));
	var inteiros =  parseInt(parseInt(valor * (Math.pow(10,casas))) / parseFloat(Math.pow(10,casas)));
	var centavos = parseInt(parseInt(valor * (Math.pow(10,casas))) % parseFloat(Math.pow(10,casas)));
	
	if(centavos%10 == 0 && centavos+"".length<2 ){
		centavos = centavos+"0";
	}else if(centavos<10){
		centavos = "0"+centavos;
	}
	 
	var milhares = parseInt(inteiros/1000);
	inteiros = inteiros % 1000; 
	
	var retorno = "";
	
	if(milhares>0){
		retorno = milhares+""+separador_milhar+""+retorno
		if(inteiros == 0){
			inteiros = "000";
		} else if(inteiros < 10){
			inteiros = "00"+inteiros; 
		} else if(inteiros < 100){
			inteiros = "0"+inteiros; 
		}
	}
	retorno += inteiros+""+separdor_decimal+""+centavos;	
	return retorno;
}

function mask(){
	jQuery(function($){
		$('.cpf').mask("999.999.999-99");
		$('.rg').mask("aa-99.999.999");
		$('.cnpj').mask("99.999.999/9999-9");

		$('.telefone').mask("(99) 9999-9999");
		$('.celular').mask("(99) 9 9999-9999");

		$('.cep').mask("99.999-999");
	});

	$.mask.definitions['H'] = "[0-2]";
	$.mask.definitions['h'] = "[0-9]";
	$.mask.definitions['O'] = "[0-5]";
	$.mask.definitions['m'] = "[0-9]";

	$("input[rel=data], input[data-mask=data]").mask("99/99/9999");
	$("input[data-mask=ano]").mask("9999");
	$("input[rel=hora], input[data-mask=hora]").mask("Hh:Om");
	$("input[rel=minutos], input[data-mask=minutos]").mask("99?9M");
	$("input[rel=placa], input[data-mask=placa]").mask("aaa-9999");
	$("input[rel=cpf], input[data-mask=cpf]").mask("999.999.999-99");
	$("input[rel=cnpj], input[data-mask=cnpj]").mask("99.999.999/9999-99");
	$("input[rel=cei], input[data-mask=cei]").mask("99.9999999.99-99");
	$("input[rel=ncm], input[data-mask=ncm]").mask("9999.99.99");
	$("input[rel=cest], input[data-mask=cest]").mask("99.9999.99");
	$("input[rel=cnae], input[data-mask=cnae]").mask("9999-9.99");
	$("input[rel=planoDeContas], input[data-mask=planoDeContas]").mask("9.9.99.99.99");
	$("input[rel=cep], input[data-mask=cep]").mask("99999-999");
	$("input[rel=ean], input[data-mask=ean]").mask("9999999999999");

	$("input[rel=quantidade], input[data-mask=quantidade]").maskMoney({showSymbol: false, precision: 4, decimal: ",", thousands: ""});
	$("input[rel=porcento], input[data-mask=porcento]").maskMoney({showSymbol: true, symbol:"%" , decimal: ",", thousands: ""});
	$("input[rel=decimalGeral], input[data-mask=decimalGeral]").maskMoney({showSymbol: true, symbol:"" , decimal: ",", thousands: ""});
	$("input[rel=dinheiro], input[data-mask=dinheiro]").maskMoney({showSymbol: true, symbol: "R$", decimal: ",", thousands: ""});
	$("input[rel=peso4dec], input[data-mask=peso4dec]").maskMoney({showSymbol: false, precision: 4, decimal: ",", thousands: "."});

	$("input[data-mask=num1dec]").maskMoney({showSymbol: false, precision: 1, decimal: ",", thousands: "."});
	$("input[data-mask=num2dec]").maskMoney({showSymbol: false, precision: 2, decimal: ",", thousands: "."});
	$("input[data-mask=num3dec]").maskMoney({showSymbol: false, precision: 3, decimal: ",", thousands: "."});
	$("input[data-mask=num4dec]").maskMoney({showSymbol: false, precision: 4, decimal: ",", thousands: "."});

	$("input[rel=telefone], input[rel=celular], input[data-mask=telefone], input[data-mask=celular]").focusout(function () {
		var phone, element;
		element = $(this);
		element.unmask();
		phone = element.val().replace(/\D/g, '');
		if (phone.length > 10) {
			element.mask("(99) 99999-999?9");
		} else {
			element.mask("(99) 9999-9999?9");
		}
	}).trigger('focusout');

	$("input[rel=telefone_sem_ddd], input[rel=celular], input[data-mask=telefone_sem_ddd], input[data-mask=celular]").focusout(function () {
		var phone, element;
		element = $(this);
		element.unmask();
		phone = element.val().replace(/\D/g, '');
		if (phone.length > 10) {
			element.mask("99999-999?9");
		} else {
			element.mask("9999-9999?9");
		}
	}).trigger('focusout');
}

function maiuscula(z){
	return z.toUpperCase();
}

function ajaxGeral(type, pasta, caminho, param){
	var result = 0;
	if (type == "GET") {
		$.ajax({
			type: 'GET',
			url: urlWebService+pasta+"/"+caminho+"/"+param+parametrosWebService,
			contentType: "application/json",
			jsonpCallback: "localJsonpCallback"
		}).done( function(data){
			result = data;
		});
	}
	return result;
}

function toastGeral(icone, text){
	$.toast({
		text: text, 
		heading: 'Nota', 
		icon: icone, 
		showHideTransition: 'slide', 
		allowToastClose: true, 
		hideAfter: 2500, 
		stack: 5, 
		position: 'bottom-center',
		extAlign: 'center',
		loader: true,
		loaderBg: '#44f'
	});
}

var virgula = true;

var balanca_Global = "";
var codigoBalanca_Global = 1;
var balancas_Global = "";


var urlWebService = "http://192.168.1.102/balanca/controller/";

var vendedor = 0;
var filialGearl = 0;
var sequencia = 0;
var documentoGeral = "";


atualizaPesagem();

function atualizaPesagem(){
	atualizaListBalanca();

	setInterval(function (){
		$.ajax({
			url: urlWebService+"funcoesController.php",
			type: 'POST',
			dataType: "text",
			data: {
				'buscarPesoBalanca': true,
				'id': codigoBalanca_Global
			}
		}).done( function(data){
			// console.log(data);
			balanca_Global = JSON.parse(data);
			// console.log(balanca_Global);
			$("#tituloBase").html(balanca_Global.descricao_balanca);
			var peso = balanca_Global.peso_balanca;
			peso = preRetornaTotalFormatado("P&nbsp;&nbsp;&nbsp;", peso);
			$("#display1").html(peso);
			calcularTotal();
		});	
	}, 1000);
}


function atualizaListBalanca(){
	$.ajax({
		url: urlWebService+"funcoesController.php",
		type: 'POST',
		dataType: "text",
		data: { 'listaBalanca': true }
	}).done( function(data){
		balancas_Global = JSON.parse(data);

		var select = "";
		select += "<select class='form-control' id='selectBalanca' onchange='mudarBalanca(this.value)'>";
		for (var i = 0; i < balancas_Global.length; i++) {
			select += "<option value='"+balancas_Global[i].id_balanca+"'>"+balancas_Global[i].descricao_balanca+"</option>";
		}
		select += "</select>";

		$("#selectBalancaDiv").html(select);
	});
}

function abrirModalSelectBalanca(){
	$("#modalSelecionaBalanca").modal("show");
}



function mudarBalanca(id){
	codigoBalanca_Global = id;
}



function orperarUnidade(op){
	var valor = document.getElementById("display2").innerHTML;
	valor = valor.replace("R$ ", "");
	valor = valor.replace("<span id='digitatorio'>", "");
	valor = valor.replace("<span id=\"digitatorio\">", "");
	valor = valor.replace("</span>", "");
	console.log(valor);
	valor = valor.split(",");

	var setarOperador = true;

	console.log(valor[0]);
	console.log("valor[0].substring(0,3): "+valor[0].substring(0,3));
	console.log("valor[0].substring(0,2): "+valor[0].substring(0,2));
	console.log("valor[0].substring(0,1): "+valor[0].substring(0,1));

	if (op == ',') {
		if (virgula) {
			virgula = false;
			valor = "R$ " + valor[0] + "," + valor[1].substring(0,1) + "<span id='digitatorio'>" + valor[1].substring(1,2) + "</span>";
		} else {
			virgula = true;
			valor = "R$ " + valor[0].substring(0,2) + "<span id='digitatorio'>" + valor[0].substring(2,3) + "</span>," + valor[1];
		}
		/* setarOperador = false; */
	} else if(op == '<'){
		if (virgula) {
			valor = "R$ 0" + valor[0].substring(0,1) + "<span id='digitatorio'>" + valor[0].substring(1,2) + "</span>," + valor[1];
		} else {
			if (valor[1] == "00") {
				virgula = true;
				orperarUnidade(op);
				setarOperador = false;
			} else {
				valor = "R$ " + valor[0] + ",0<span id='digitatorio'>" + valor[1].substring(0,1) + "</span>";
			}
		}
	} else if(virgula){
		if (valor[0].substring(0,3) == '000') {
			valor = "R$ 00<span id='digitatorio'>" + op + "</span>," + valor[1];
		} else if(valor[0].substring(0,2) == '00'){
			valor = "R$ 0" + valor[0].substring(2,3) + "<span id='digitatorio'>" + op + "</span>," + valor[1];
		} else if(valor[0].substring(0,1) == '0'){
			valor = "R$ " + valor[0].substring(1,2) + valor[0].substring(2,3) + "<span id='digitatorio'>" + op + "</span>," + valor[1];
		} else {
			virgula = false;
			orperarUnidade(op);
			setarOperador = false;
		}
	} else {
		if( valor[1] == "00"){
			valor = "R$ " + valor[0] + ",0<span id='digitatorio'>" + op + "</span>";
		} else if (valor[1].substring(0,1) == "0") {
			valor = "R$ " + valor[0] + "," + valor[1].substring(1,2) + "<span id='digitatorio'>" + op + "</span>";
		} else {
			setarOperador = false;
		}
	}

	if (setarOperador) {
		document.getElementById("display2").innerHTML = valor;
	}
	/* calcularTotal(); */
}


function calcularTotal(){
	var peso = document.getElementById("display1").innerHTML;
	var valor = document.getElementById("display2").innerHTML;
	var total = 0;

	peso = peso.replace("P", "");
	peso = peso.replace(/&nbsp;/g, "");
	peso = peso.replace(/ /g, "");
	peso = peso.replace(",", ".");
	peso = parseFloat(peso);

	valor = valor.replace("R$ ", "");
	valor = valor.replace("<span id='digitatorio'>", "");
	valor = valor.replace("<span id=\"digitatorio\">", "");
	valor = valor.replace("</span>", "");
	valor = valor.replace(",", ".");
	valor = parseFloat(valor);

	total = peso * valor;

	/* console.log("total: " + total); */
	total = preRetornaTotalFormatado("R$ ", total);
	/* console.log("total: " + total); */
	document.getElementById("display3").innerHTML = total;
}


function preRetornaTotalFormatado(descricao, total){
	total = total.toFixed(2);
	if (total >= 100) {
		total = (descricao+total).replace(".", ",");
		total = retornaTotalFormatado(total);
	} else if(total > 10){
		total = (descricao+"0"+total).replace(".", ",");
		total = retornaTotalFormatado(total);
	} else {
		total = (descricao+"00"+total).replace(".", ",");
		total = retornaTotalFormatado(total);
	}
	return total;
}


function retornaTotalFormatado(total){
	total = total.split(",");
	if (total.length > 1) {
		total[1] = parseInt(total[1]);
		if (total[1] > 10) {
			total = total[0]+","+total[1];
		} else {
			total = total[0]+",0"+total[1];
		}
	} else {
		total = total[0]+",00";
	}
	return total;
}
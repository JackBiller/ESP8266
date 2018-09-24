/************************************************************************************************************************
* Scrips Jk-19
*
*
* Este arquivo traz funções que poderão se usadas em todo o projeto, ele é aberto em todas as paginas com o intuito de 
* facilitar no desenvolvimento 
/************************************************************************************************************************/



/************************************************************************************************************************
* Funções do Login
/************************************************************************************************************************/
function deslogar(){
	$.ajax({
		url:'app/controllers/login.php',
		type: 'POST',
		dataType: 'html',
		data: { 'deslogar': true }
	}).done( function(data){
		window.location.assign("index.php");
	});
}

function verificaAcess(area){
	var result = "";
	$.ajax({
		url:'app/controllers/funcoesController.php',
		type: 'POST',
		dataType: 'html',
		data: {
			'acesso'	: true,
			'area'		: area,
			'usuario'	: $("#usuario").val()
		}
	}).done( function(data){
		console.log(data);
		result = parseInt(data);
		if (result != 1) window.location.assign("principal.php#!acesso_bloqueado");
	});
}

function verificaAcess2(area, especificacao){
	var result = "";
	$.ajax({
		url:'app/controllers/funcoesController.php',
		type: 'POST',
		dataType: 'html',
		data: {
			'acessoEspecifico'	: true,
			'area'				: area,
			'especificacao'		: especificacao,
			'usuario'			: $("#usuario").val()
		}
	}).done( function(data){
		console.log(data);
		result = parseInt(data);
		if (result != 1) window.location.assign("principal.php#!acesso_bloqueado");
	});
}



/************************************************************************************************************************
* Funções de Editar
/************************************************************************************************************************/
function editar(el){
	var id = $(el).data("id");
	id = parseInt(id);
	$("#editar").val(id);
}

function n_editar(){
	$("#editar").val(0);
}


/************************************************************************************************************************
* Funções de configurações da Grade
/************************************************************************************************************************/
var caminhoGrade = "";
var accesskeyVoltarGrade = " accesskey=\"v\"";

function grade(el, tabelaP, tabelaG){
	var grades = document.getElementsByName("grade");
	var id = 0;
	for (var i = grades.length - 1; i >= 0; i--) {
		if ($(grades[i]).data("p") == tabelaP && $(grades[i]).data("g") == tabelaG) {
			id = parseInt($(el).data("id"));
			$(grades[i]).val(id);
			ajaxGradeSetar(tabelaG+"-"+tabelaP, id);
			configAreaDeAtucao(tabelaG+"-"+tabelaP);
		}
	}
}

function n_grade(tabelaP, tabelaG){
	var setouAreaDeAtuacao = false;
	var grades = document.getElementsByName("grade");
	for (var i = grades.length - 1; i >= 0; i--) {
		if ($(grades[i]).data("p") == tabelaP && $(grades[i]).data("g") == tabelaG) {
			$(grades[i]).val(0);
			ajaxGradeSetar(tabelaG+"-"+tabelaP, 0);
			
		}
		else if ($(grades[i]).data("g") == tabelaP && $(grades[i]).val() != 0) {
			configAreaDeAtucao(tabelaP+"-"+$(grades[i]).data("p"));
			setouAreaDeAtuacao = true;
		}
	}
	if (!setouAreaDeAtuacao) configAreaDeAtucao(tabelaP);
}


function ajaxGradeSetar(grade, id){
	/* console.log("ajaxGradeSetar(): "+grade+" - "+id); */
	$.ajax({
		url:'app/controllers/mapa_gradeController.php',
		type: 'POST',
		dataType: 'html',
		data: {
			'grade'	: grade,
			'id': id
		}
	}).done( function(data){
		/* console.log("data ajaxGradeSetar: "+data); */
	});
}


function verificaGrade(tabela, tabelaG, tabelaForm){
	var botaoVoltarGrade = "";
	var recebeGradeElemento = "";
	var contGrade = 0;
	caminhoGrade = "<li class=\"breadcrumb-item active\">" + tabelaG + "</li>";
	accesskeyVoltarGrade = " accesskey=\"v\"";

	verificaGradeElemento( tabela, tabelaG ); 

	caminhoGrade = "<ol class=\"breadcrumb\">" + caminhoGrade + "</ol>" ;

	return caminhoGrade;
}

function configAreaDeAtucao(area){
	$("#areaDeAtuacao").val(area);
	$.ajax({
		url:'app/controllers/funcoesController.php',
		type: 'POST',
		dataType: 'html',
		data: {
			'setarAreaDeAtuacao': true,
			'area': area
		}
	}).done( function(data){});
}


function verificaGradeElemento(tabela, tabelaG){
	var tabP = "";
	var tabG = "";
	var backUp_caminho = "";
	var temGrade = false;
	var grades = document.getElementsByName("grade");

	if (caminhoGrade != "") backUp_caminho = caminhoGrade;
	// " / " +

	for (var i = grades.length - 1; i >= 0; i--) {
		if ($(grades[i]).data("g") == tabela && $(grades[i]).val() != 0) {
			tabP = $(grades[i]).data("p");
			tabG = $(grades[i]).data("g");

			caminhoGrade  = "<li class=\"breadcrumb-item\">";
			caminhoGrade += 	"<a href=\"principal.php#!grade_"+tabela+"-"+$(grades[i]).data("p")+"\" onclick=\"n_grade('"+tabela+"', '"+tabelaG+"')\" style=\"color: blue;\""+accesskeyVoltarGrade+">";
			caminhoGrade += 		tabela;
			caminhoGrade += 	"</a>";
			caminhoGrade += "</li>";

			caminhoGrade += backUp_caminho;
			i = -1;
			temGrade = true;
			accesskeyVoltarGrade = "";

			verificaGradeElemento( tabP, tabG );
		}
	}

	if (!temGrade) {
		caminhoGrade  = "<li class=\"breadcrumb-item\">";
		caminhoGrade += 	"<a href=\"principal.php#!"+tabela+"\" onclick=\"n_grade('"+tabela+"', '"+tabelaG+"')\" style=\"color: blue;\""+accesskeyVoltarGrade+">";
		caminhoGrade += 		tabela;
		caminhoGrade += 	"</a>";
		caminhoGrade += "</li>";
		caminhoGrade += backUp_caminho;
	}
}


function zerarTabelaGrade(){
	var grades = document.getElementsByName("grade");
	for (var i = grades.length - 1; i >= 0; i--) grades[i].value = 0;

	$.ajax({
		url:'app/controllers/mapa_gradeController.php',
		type: 'POST',
		dataType: 'html',
		data: {
			'zerarGrades': true,
			'grade': ""
		}
	}).done( function(data){});
}



function retornaValorIdTabelaPrimaria(tabelaP, tabelaG){
	var grades = document.getElementsByName("grade");
	var idTabelaPrimaria = 0;
	for (var i = grades.length - 1; i >= 0; i--) {
		if ($(grades[i]).data("p") == tabelaP && $(grades[i]).data("g") == tabelaG) {
			idTabelaPrimaria = $(grades[i]).val();
		}
	}
	return idTabelaPrimaria;
}




/************************************************************************************************************************
* Funções de Caracteres
/************************************************************************************************************************/
function maius(obj){
    obj.value = obj.value.toUpperCase();
}

function maius(obj){
	obj.value = obj.value.toUpperCase();
}
function maiuscula(z){
	return z.toUpperCase();
}



/************************************************************************************************************************
* Funções de Data
/************************************************************************************************************************/
function pegarData(){
	var now = new Date;
	var diaCerto = now.getDate();
	var mesCerto = now.getMonth() + 1;

	if (diaCerto < 10) 	diaCerto = "0" + diaCerto;
	if (mesCerto < 10) 	mesCerto = "0" + mesCerto;

	var dataAtual = now.getFullYear() + "-" + mesCerto + "-" + diaCerto;
	return dataAtual;
}

function pegarDataHora(){
	var now = new Date;
	var diaCerto = now.getDate();
	var mesCerto = now.getMonth() + 1;

	if (diaCerto < 10) 	diaCerto = "0" + diaCerto;
	if (mesCerto < 10) 	mesCerto = "0" + mesCerto;

	var dataAtual = now.getFullYear()+"-"+mesCerto+"-"+diaCerto+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();  
	return dataAtual;
}

function formatarData(dataUN){
	var arrayCompleto = dataUN.split(" ");
	dataUN = arrayCompleto[0];
	dataUN = dataUN.split("-");
	var anoCerto = dataUN[0].substring(2, 4);
	dataUN = dataUN[2]+"/"+dataUN[1]+"/"+anoCerto;
	dataUN = arrayCompleto.length > 1 ? dataUN+" "+arrayCompleto[1] : dataUN;
	return dataUN;
}

function formatarDataHora(dataUN){
	dataUN = dataUN.split(" ");
	var tempo = dataUN[1].split(":");
	var hora = tempo[0] < 10 ? "0"+tempo[0] : tempo[0];
	var minuto = tempo[1] < 10 ? "0"+tempo[1] : tempo[1];
	var segundo = tempo[2] < 10 ? "0"+tempo[2] : tempo[2];
	dataUN = dataUN[0].split("-");
	var anoCerto = dataUN[0].substring(2, 4);
	dataUN = dataUN[2]+"/"+dataUN[1]+"/"+anoCerto+" "+hora+":"+minuto+":"+segundo;
	return dataUN
}





/************************************************************************************************************************
* Funções para formatar / validar valor
/************************************************************************************************************************/
function limitarValorNum(id, valor){
	/* console.log("limitarValorNum"); */
	var valorElemento = document.getElementById(id).value;
	if (valorElemento.length > valor) {
		document.getElementById(id).value = valorElemento.substring(0, valor);
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



/************************************************************************************************************************
* Funções para fazer donwload
/************************************************************************************************************************/
function donwnloadFile(diretorio){
	window.location.assign("download.php?arquivo="+diretorio);
}

function viewFile(diretorio){
	window.open(diretorio, '_blank');
}



/************************************************************************************************************************
* Funções padrão de Excluir
*
** Obs: Esta funções é um ajaxs para um controller padrão onde não exclui nenhum arquivo mas, apenas altera seu Status
/************************************************************************************************************************/
function excluir(el , table, boolAtivo, href){
	var botaoAtivo = "";
	boolAtivo = boolAtivo == 1 ? 0 : 1;

	bootbox.confirm({
		title: "Tem certeza que deseja alterar o status deste cadastro?",
		message: "Ao aperta o botão \"Sim\" você irá alterar o estatus deste cadastro",
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
					url:'app/controllers/funcoesController.php',
					type: 'POST',
					dataType: 'html',
					data: {
						'excluir'	: true,
						'id'		: $(el).data("id"),
						'table' 	: table,
						'boolAtivo' : boolAtivo
					}
				}).done( function(data){
					console.log(data);
					if (parseInt(data) == 1) {
						toast.success("Status alterado com sucesso!");

						if (boolAtivo == 1) { 
							icone_ativo = "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>";
							cor_ativo = "#0f0;";
						} else {
							icone_ativo = "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>";
							cor_ativo = "#f00;";
						}

						botaoAtivo += "<a href='#!"+href+"' style='color: "+cor_ativo+"' data-id='"+$(el).data("id")+"' onclick=\"excluir(this , '"+table+"', "+boolAtivo+", '"+href+"')\">";
						botaoAtivo += 		icone_ativo;
						botaoAtivo += "</a>";


						document.getElementById("ativo_"+$(el).data("id")).innerHTML = botaoAtivo;
					} else {
						toast.danger("Falha ao altera status!");
					}
				});
			}
		}
	});
}



function excluirDefinitivamente(el, table){
	var elemento = document.getElementById("linha_ativo_"+$(el).data("id"));

	bootbox.confirm({
		title: "Tem certeza que deseja excluir este cadastro?",
		message: "Ao aperta o botão \"Sim\" você irá excluir este cadastro definitivamente.",
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
					url:'app/controllers/funcoesController.php',
					type: 'POST',
					dataType: 'html',
					data: {
						'excluirDefinitivamente'	: true,
						'id'						: $(el).data("id"),
						'table' 					: table
					}
				}).done( function(data){
					console.log(data);
					if (parseInt(data) == 1) {
						$(elemento).remove();
					} else {
						toast.danger("Falha ao altera status!");
					}
				});
			}
		}
	});
}


/************************************************************************************************************************
* Funções de Mascaras nos Campos
/************************************************************************************************************************/
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






/************************************************************************************************************************
* Oustras Funções
/************************************************************************************************************************/
function subirPagina(){
	var html = document.documentElement;
	html.scrollLeft = 0;
	html.scrollTop = 0;
}



function setarValorEstrangeiroLista(id, tabelaEstrangeira, complemento){
	id = parseInt(id);
	tabelaEstrangeira = tabelaEstrangeira.split("+");
	var idTabelaEstrangeira = tabelaEstrangeira[0];
	tabelaEstrangeira = tabelaEstrangeira[1];
	var colunaParam = "pequisa_"+tabelaEstrangeira+"_id";

	var param = JSON.parse('{ "'+colunaParam+'":true, "id":'+idTabelaEstrangeira+' }');

	$.ajax({
		url:'app/controllers/funcoes_'+tabelaEstrangeira+'Controller.php',
		type: 'POST',
		dataType: 'text',
		data: param
	}).done( function(data){
		vetor = data.split("{,}");
		document.getElementById(tabelaEstrangeira+complemento+'_'+id).innerHTML = vetor[1];
	});
}



function removerCaracter(valor){
	// Letras do alfabento minusculas
	valor = valor.replace(/a/gi, "");
	valor = valor.replace(/b/gi, "");
	valor = valor.replace(/c/gi, "");
	valor = valor.replace(/d/gi, "");
	valor = valor.replace(/e/gi, "");
	valor = valor.replace(/f/gi, "");
	valor = valor.replace(/g/gi, "");
	valor = valor.replace(/h/gi, "");
	valor = valor.replace(/i/gi, "");
	valor = valor.replace(/j/gi, "");
	valor = valor.replace(/k/gi, "");
	valor = valor.replace(/l/gi, "");
	valor = valor.replace(/m/gi, "");
	valor = valor.replace(/n/gi, "");
	valor = valor.replace(/o/gi, "");
	valor = valor.replace(/p/gi, "");
	valor = valor.replace(/q/gi, "");
	valor = valor.replace(/r/gi, "");
	valor = valor.replace(/s/gi, "");
	valor = valor.replace(/t/gi, "");
	valor = valor.replace(/u/gi, "");
	valor = valor.replace(/v/gi, "");
	valor = valor.replace(/w/gi, "");
	valor = valor.replace(/x/gi, "");
	valor = valor.replace(/y/gi, "");
	valor = valor.replace(/z/gi, "");


	// Caracteres espacias
	valor = valor.replace(/\*/g, "");
	valor = valor.replace(/\//g, "");
	valor = valor.replace(/\./g, "");
	valor = valor.replace(/\;/g, "");
	valor = valor.replace(/\:/g, "");
	valor = valor.replace(/\</g, "");
	valor = valor.replace(/\>/g, "");
	valor = valor.replace(/\+/g, "");
	valor = valor.replace(/\%/g, "");
	valor = valor.replace(/\+/g, "");
	valor = valor.replace(/\!/g, "");
	valor = valor.replace(/\@/g, "");
	valor = valor.replace(/\§/g, "");
	valor = valor.replace(/\{/g, "");
	valor = valor.replace(/\}/g, "");
	valor = valor.replace(/\[/g, "");
	valor = valor.replace(/\]/g, "");
	valor = valor.replace(/\º/g, "");
	valor = valor.replace(/\ª/g, "");
	valor = valor.replace(/\?/g, "");
	valor = valor.replace(/\°/g, "");
	valor = valor.replace(/\(/g, "");
	valor = valor.replace(/\)/g, "");
	valor = valor.replace(/\&/g, "");
	valor = valor.replace(/\$/g, "");
	valor = valor.replace(/\|/g, "");
	valor = valor.replace(/\#/g, "");
	valor = valor.replace(/\¬/g, "");
	valor = valor.replace(/\¢/g, "");
	valor = valor.replace(/\£/g, "");
	valor = valor.replace(/\-/g, "");
	valor = valor.replace(/\_/g, "");
	valor = valor.replace(/\=/g, "");
	valor = valor.replace(/\¹/g, "");
	valor = valor.replace(/\²/g, "");
	valor = valor.replace(/\³/g, "");
	valor = valor.replace(/\₢/g, "");
	valor = valor.replace(/\'/g, "");
	valor = valor.replace(/\"/g, "");
	valor = valor.replace(/\\/g, "");
	valor = valor.replace(/ /g, "");


	// Caracteres de acentuação
	valor = valor.replace(/\¨/g, "");
	valor = valor.replace(/\´/g, "");
	valor = valor.replace(/\`/g, "");
	valor = valor.replace(/\^/g, "");
	valor = valor.replace(/\~/g, "");


	// Caracteres acentuados minusculo
	valor = valor.replace(/ü/gi, "");
	valor = valor.replace(/ï/gi, "");
	valor = valor.replace(/ö/gi, "");
	valor = valor.replace(/ä/gi, "");
	valor = valor.replace(/ë/gi, "");
	valor = valor.replace(/ÿ/gi, "");

	valor = valor.replace(/á/gi, "");
	valor = valor.replace(/é/gi, "");
	valor = valor.replace(/ú/gi, "");
	valor = valor.replace(/í/gi, "");
	valor = valor.replace(/ó/gi, "");
	valor = valor.replace(/ý/gi, "");

	valor = valor.replace(/à/gi, "");
	valor = valor.replace(/è/gi, "");
	valor = valor.replace(/ì/gi, "");
	valor = valor.replace(/ù/gi, "");
	valor = valor.replace(/ò/gi, "");

	valor = valor.replace(/ã/gi, "");
	valor = valor.replace(/õ/gi, "");
	valor = valor.replace(/ñ/gi, "");

	valor = valor.replace(/â/gi, "");
	valor = valor.replace(/ê/gi, "");
	valor = valor.replace(/û/gi, "");
	valor = valor.replace(/ô/gi, "");
	valor = valor.replace(/î/gi, "");

	// Ç
	valor = valor.replace(/ç/gi, "");

	if (valor == "") valor = 0;
	else {
		var vetor = valor.split(",");
		if (vetor.length > 1) {
			var complemento = "";
			for (var i = 1; i < vetor.length; i++) {
				complemento += vetor[i];
			}
			valor = vetor[0]+","+complemento;
		}
	}

	return valor;
}
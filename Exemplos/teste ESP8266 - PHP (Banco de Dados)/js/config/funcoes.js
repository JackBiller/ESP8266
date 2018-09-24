function jk_toasth(icon, text, time){
	$.toast({
		text: text, 
		heading: 'Nota', 
		icon: icon, 
		showHideTransition: 'slide', 
		allowToastClose: true, 
		hideAfter: time, 
		stack: 5, 
		position: 'bottom-center',
		extAlign: 'center',
		loader: true,
		loaderBg: '#44f'
	});
}

function jk_confirma(titulo, mensagem, nome_funcao, parametro_funcao){
	bootbox.confirm({
		title: titulo,
		message: mensagem,
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
				jk_chamaOutraFuncao(nome_funcao, parametro_funcao);
			} 
		}
	});
}

function jk_comboDataList(titulo, controller, dataParam, id, param, idValue, idDescricao, accessKey, IdDiv, onchange, idAtivo){
	$.ajax({
		url:'controllers/'+controller+'.php',
		type: 'POST',
		dataType: 'text',
		data: dataParam
	}).done( function(data){
		var valorParam = [];
		var valorReal = "";
		var contValorReal = 0;
		var montarInputList = "";
		var arrayJson = "";
		var cont = 0;

		if (data == "") {
			montarInputList += "<input type='text' class='form-control' placeholder='Sem registros ("+titulo+")' disabled>";
		} else {
			montarInputList += "<input type='text' id='"+id+"' name='"+id+"' ";
			montarInputList += "class='flexdatalist form-control' placeholder='"+titulo+"'";
			montarInputList += "data-min-length='0' data-visible-properties='[\""+param[idDescricao[0]]+"\"]' ";
			montarInputList += "data-selection-required='true' data-value-property='"+param[idValue]+"' ";
			montarInputList += "onchange='"+onchange+"' onfocus='limparValorCombo(this.id)'";
			montarInputList += "required disabled>";

			var vetor = data.split("[]");
			var subvetor = [];
			
			arrayJson += "[";
			for (var i = 0; i < vetor.length; i++) {
				valorReal = "";
				subvetor = vetor[i].split(",");

				for (var j = param.length - 1; j >= 0; j--) {
					valorParam[j] = subvetor[j];
				}

				contValorReal = 0;
				for (var k = 0; k < idDescricao.length; k++) {
					if (contValorReal == 0) {
						valorReal += valorParam[idDescricao[k]];
					} else {
						valorReal += ", "+valorParam[idDescricao[k]];
					}
					contValorReal++;
				}

				if (idAtivo != 0) {
					if (valorParam[idAtivo] == 1) {
						if (cont  == 0) {
							arrayJson += "{\""+param[idValue]+"\": "+valorParam[idValue]+", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
						} else {
							arrayJson += ",{\""+param[idValue]+"\": "+valorParam[idValue]+", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
						}
						cont++;
					}
				} else {
					if (cont  == 0) {
						arrayJson += "{\""+param[idValue]+"\": "+valorParam[idValue]+", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
					} else {
						arrayJson += ",{\""+param[idValue]+"\": "+valorParam[idValue]+", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
					}
					cont++;
				}
			}
			arrayJson += "]";
		}
		$("#"+IdDiv+"").html(montarInputList);

		arrayJson = JSON.parse(String(arrayJson));
		setarValorCombo(arrayJson, id, param[idValue], param[idDescricao[0]], accessKey);
	});
}

function setarValorCombo(eljson, id, value, descricao, accessKey){
	$('#'+id+'').flexdatalist({
		selectionRequired: true,
		valueProperty: value,
		searchIn: descricao,
		minLength: 0,
		data: eljson
	});
	document.getElementById( id + "-flexdatalist" ).disabled = false;
	document.getElementById( id + "-flexdatalist" ).accessKey = accessKey;
}



function jk_comboVlrPreDataList(titulo, controller, dataParam, id, param, idValue, idDescricao, accessKey, IdDiv, onchange, idAtivo, idValor, DescricaoValor){
	$.ajax({
		url:'controllers/'+controller+'.php',
		type: 'POST',
		dataType: 'text',
		data: dataParam
	}).done( function(data){
		var valorParam = [];
		var valorReal = "";
		var contValorReal = 0;
		var montarInputList = "";
		var arrayJson = "";
		var cont = 0;

		if (data == "") {
			montarInputList += "<input type='text' class='form-control' placeholder='Sem registros ("+titulo+")' disabled>";
		} else {
			montarInputList += "<input type='text' id='"+id+"' name='"+id+"'";
			montarInputList += "class='flexdatalist form-control' placeholder='"+titulo+"'";
			montarInputList += "data-min-length='0' data-visible-properties='[\""+param[idDescricao[0]]+"\"]' ";
			montarInputList += "data-selection-required='true' data-value-property='"+param[idValue]+"' ";
			montarInputList += "onchange='"+onchange+"' onfocus='limparValorCombo(this.id)'";
			montarInputList += "required disabled>";

			var vetor = data.split("[]");
			var subvetor = [];
			
			arrayJson += "[";
			for (var i = 0; i < vetor.length; i++) {
				valorReal = "";
				subvetor = vetor[i].split(",");

				for (var j = param.length - 1; j >= 0; j--) {
					valorParam[j] = subvetor[j];
				}

				contValorReal = 0;
				for (var k = 0; k < idDescricao.length; k++) {
					if (contValorReal == 0) {
						valorReal += valorParam[idDescricao[k]];
					} else {
						valorReal += ", "+valorParam[idDescricao[k]];
					}
					contValorReal++;
				}

				if (idAtivo != 0) {
					if (valorParam[idAtivo] == 1) {
						if (cont  == 0) {
							arrayJson += "{\""+param[idValue]+"\": "+valorParam[idValue]+", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
						} else {
							arrayJson += ",{\""+param[idValue]+"\": "+valorParam[idValue]+", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
						}
						cont++;
					}
				} else {
					if (cont  == 0) {
						arrayJson += "{\""+param[idValue]+"\": "+valorParam[idValue]+", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
					} else {
						arrayJson += ",{\""+param[idValue]+"\": "+valorParam[idValue]+", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
					}
					cont++;
				}
			}
			arrayJson += "]";
		}
		$("#"+IdDiv+"").html(montarInputList);

		arrayJson = JSON.parse(String(arrayJson));
		setarValorComboPredefinido(arrayJson, id, param[idValue], param[idDescricao[0]], accessKey, idValor, DescricaoValor);
	});
}

function setarValorComboPredefinido(eljson, id, value, descricao, accessKey, idValor, DescricaoValor){
	$('#'+id+'').flexdatalist({
		selectionRequired: true,
		valueProperty: value,
		searchIn: descricao,
		minLength: 0,
		data: eljson
	});
	// document.getElementById( id + "-flexdatalist" ).disabled = false;
	document.getElementById( id + "-flexdatalist" ).accessKey = accessKey;

	document.getElementById( id ).value = idValor;
	document.getElementById( id + "-flexdatalist" ).value = DescricaoValor;
}




function jk_chamaOutraFuncao(nome_funcao, parametro){
	switch(parametro.length){
		case 1: jk_function_1(nome_funcao, parametro); break;
		case 2: jk_function_2(nome_funcao, parametro); break;
		case 3: jk_function_3(nome_funcao, parametro); break;
		case 4: jk_function_4(nome_funcao, parametro); break;
		case 5: jk_function_5(nome_funcao, parametro); break;
		case 6: jk_function_6(nome_funcao, parametro); break;
		case 7: jk_function_7(nome_funcao, parametro); break;
	}
}

function jk_function_1(nome_funcao, parametro){
	window[nome_funcao](parametro[0]);
}

function jk_function_2(nome_funcao, parametro){
	window[nome_funcao](parametro[0], parametro[1]);
}

function jk_function_3(nome_funcao, parametro){
	window[nome_funcao](parametro[0], parametro[1],  parametro[2]);
}

function jk_function_4(nome_funcao, parametro){
	window[nome_funcao](parametro[0], parametro[1],  parametro[2], parametro[3]);
}

function jk_function_5(nome_funcao, parametro){
	window[nome_funcao](parametro[0], parametro[1],  parametro[2], parametro[3], parametro[4]);
}

function jk_function_6(nome_funcao, parametro){
	window[nome_funcao](parametro[0], parametro[1],  parametro[2], parametro[3], parametro[4], parametro[5]);
}

function jk_function_7(nome_funcao, parametro){
	window[nome_funcao](parametro[0], parametro[1],  parametro[2], parametro[3], parametro[4], parametro[5], parametro[6]);
}
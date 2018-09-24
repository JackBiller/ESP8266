

function oculatarMenu(tipo){
	if (tipo == "1") 	document.getElementById("menuRodape").style.display = "none";
	else 				document.getElementById("menuRodape").style.display = "block";
}


function converter(){
	var binario = converterBinario(document.getElementById('numeroImpresso').value);
	document.getElementById('resultadoConver').value = binario;

	binario = converterBinario(document.getElementById('numeroImpressoF').value);
	document.getElementById('resultadoConverF').value = binario;
}



function converterBinario(num){
	var bits = $("#bits").val();
	var restos = "";
	var binario = "";
	var numde0 = "";

	var resto = 0;
	var convertendo = true;

	num = parseInt(num);
	bits = parseInt(bits);

	for (var i = bits - 1; i >= 0; i--) numde0 += "0";

	if (num > 0) {
		while(num >= 1){
			resto = num % 2;
			resto = parseInt(resto);
			restos += ""+resto;
			num /= 2;
		}
		for (var i = restos.length - 1; i >= 0; i--) {
			binario += restos[i];
		}
	}
	else {
		binario = 0;
	}
	binario = ""+numde0+binario;
	binario = binario.substring(binario.length - bits, binario.length);
	return binario;
}

function calcBit(op){
	var bits = $("#bits").val();
	var valorPBit = $("#valorPBit").val();
	
	bits = op == "+" ? parseInt(bits) + 1 : parseInt(bits) - 1;
	valorPBit = Math.pow(2,bits) - 1;

	if (bits > 0) {
		$("#bits").val(bits);
		$("#valorPBit").val(valorPBit);
	}
	else {
		jk_toasth("error", "O numero deve ser maior que 0!", 5000);
	}
}



function imprimirQualquerBit(){
	var valorPBit = $("#valorPBit").val();
	var numeroImpresso = $("#numeroImpresso").val();
	var numeroImpressoF = $("#numeroImpressoF").val();
	var imprimir = true;
	var cor = "#ddd";
	var numeroConvertido = "";

	var binario  = "<table class='table'>";
	binario += 		"<tr bgcolor='lightblue'>";
	binario += 			"<td align='center'>Decimal</td>";
	binario += 			"<td align='center'>Binario</td>";
	binario += 			"</tr>";

	numeroImpresso = parseInt(numeroImpresso);
	numeroImpressoF = parseInt(numeroImpressoF);
	
	if (numeroImpressoF < numeroImpresso) {
		jk_toasth("error", "O numero Inicial é maior que o Final", 5000);
		imprimir = false;
	}
	else if (numeroImpresso < 0) {
		jk_toasth("error", "O valor Inicial deve ser maior que 0!", 5000);
		imprimir = false;
	}
	else if (numeroImpressoF > valorPBit) {
		jk_toasth("error", "O valor Final é maior que o limit de bits (valor máximo)!", 5000);
		imprimir = false;
	}


	if (imprimir) {
		for (var i = numeroImpresso; i <= numeroImpressoF; i++) {
			numeroConvertido = converterBinario(i);

			cor = cor == "#ddd" ? "#aaa" : "#ddd";

			binario += "<tr bgcolor='"+cor+"'>";
			binario += 		"<td align='center'>"+i+"</td>";
			binario += 		"<td align='center'>"+numeroConvertido+"</td>";
			binario += "</tr>";

		}

		binario += "</table>";
		document.getElementById("binario").innerHTML = binario;
	}
	else console.log("n_imprimir");
	converter();
}
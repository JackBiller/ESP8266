// Define as partes do valor por extenso
var extenso = [];

extenso[1] = 'um (a)';
extenso[2] = 'dois (uas)';
extenso[3] = 'tres';
extenso[4] = 'quatro';
extenso[5] = 'cinco';
extenso[6] = 'seis';
extenso[7] = 'sete';
extenso[8] = 'oito';
extenso[9] = 'nove';
extenso[10] = 'dez';
extenso[11] = 'onze';
extenso[12] = 'doze';
extenso[13] = 'treze';
extenso[14] = 'quatorze';
extenso[15] = 'quinze';
extenso[16] = 'dezesseis';
extenso[17] = 'dezessete';
extenso[18] = 'dezoito';
extenso[19] = 'dezenove';
extenso[20] = 'vinte';
extenso[30] = 'trinta';
extenso[40] = 'quarenta';
extenso[50] = 'cinquenta';
extenso[60] = 'sessenta';
extenso[70] = 'setenta';
extenso[80] = 'oitenta';
extenso[90] = 'noventa';
extenso[100] = 'cem';
extenso[200] = 'duzentos (as)';
extenso[300] = 'trezentos (as)';
extenso[400] = 'quatrocentos (as)';
extenso[500] = 'quinhentos (as)';
extenso[600] = 'seiscentos (as)';
extenso[700] = 'setecentos (as)';
extenso[800] = 'oitocentos (as)';
extenso[900] = 'novecentos (as)';

function ValorPorExtenso(valor){
	var restante = valor;
	var retorno = '';

	var trilhao = 	1000000000000,
		bilhao 	= 	1000000000,
		milhao 	= 	1000000;

	if(restante >= trilhao){
		var trilhoes = Math.round(restante / trilhao) ;
		restante = restante - (trilhoes * trilhao);

		if(trilhoes > 1){
			retorno += getCentena(trilhoes) + ' trilhões';
		}else{
			retorno += extenso[trilhoes] + ' trilhão';
		}

		if(restante > 0){
			retorno += ', ';
		}
	}

	if(restante >= bilhao){
		var bilhoes = Math.round(restante / bilhao) ;
		restante = restante - (bilhoes * bilhao);
		if(bilhoes > 1){
			retorno += getCentena(bilhoes) + ' bilhões';
		}else{
			retorno += extenso[bilhoes] + ' bilhão';
		}
		if(restante > 0){
			retorno += ', ';
		}
	}

	if(restante >= milhao){
		var milhoes = Math.round(restante / milhao) ;
		restante = restante - (milhoes * milhao);

		if(milhoes > 1){
			retorno += getCentena(milhoes) + ' milhões';
		}else{
			retorno += extenso[milhoes] + ' milhão';
		}

		if(restante > 0){
			retorno += ', ';
		}
	}

	if(restante >= 1000){

		var milhas = Math.round(restante / 1000)
		restante = restante - (milhas * 1000);
		retorno += getCentena(milhas) + ' mil';

		if(restante > 0){
			retorno += ', ';
		}
	}
	retorno += getCentena(restante);
	return retorno;
}

function getCentena(restante){
	var retorno = '';

	if(restante >= 100){
		var milhas = Math.round(restante / 100)
		restante = restante - (milhas * 100);
		if(milhas === 1){
			retorno += 'cento';
		}else{
			retorno += ' '+ extenso[milhas * 100];
		}

		if(restante > 0){
			retorno += ' e';
		}
	}

	if(restante >= 10){
		var milhas;

		if(restante <= 10){
			milhas = Math.round(restante / 10)
		}else if(restante < 19){
			milhas = restante;
		}

		restante = restante - (milhas * 10);
		retorno += ' '+extenso[milhas];

		if(restante > 0){
			retorno += ' e';
		}
	}

	if(restante >= 1){
		var milhas = Math.round(restante / 1)
		restante = restante - milhas;
		retorno += ' '+extenso[milhas];

		if(restante > 0){
			retorno += ' e';
		}
	}
	return retorno;
}
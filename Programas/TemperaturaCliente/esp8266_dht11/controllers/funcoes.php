<?php



function toJson($variavel){
	$resultado = $variavel;
		 if(gettype($variavel) == 'object') $resultado = objectEmJson($variavel);
	else if(gettype($variavel) == 'array' ) $resultado = arrayEmJson($variavel);

	return $resultado;
}

function objectEmJson($objeto){
	$class_vars = get_class_vars(get_class($objeto));
	$arrayObjeto = [];

	foreach ($class_vars as $name => $value) {
		array_push($arrayObjeto, $name , $objeto->get($name));
	}

	$verifica = true;
	$primeiro = true;
	$stringArray = "";
	$preStringArray = "";
	$oldValue = "teste";
	foreach ($arrayObjeto as $key => $value) {
		if ($verifica) {
			$preStringArray = $primeiro ? "{\"".$value."\":" : ",\"".$value."\":";
			$verifica = false;
		} else {
			switch (gettype($value)) {
				case 'string':
					$stringArray .= $preStringArray."\"".$value."\"";
					break;
				case 'integer':
					$stringArray .= $preStringArray.$value;
					break;
				case 'double':
					$stringArray .= $preStringArray.$value;
					break; 
				case 'floute':
					$stringArray .= $preStringArray.$value;
					break;
				case 'boolean':
					$stringArray .= $value ? $preStringArray."1" : $preStringArray."0";
					break;
				case 'object':
					$stringArray .= $preStringArray.objectEmJson($value);
					break;
				case 'array':
					$stringArray .= $preStringArray.arrayEmJson($value);
					break;
				case 'NULL':
					/* $stringArray .= $preStringArray.arrayEmJson($value); */
					break;
				default:
					$stringArray .= $preStringArray."\"".$value."\"";
					break;
			}
			if (gettype($value) != 'NULL') $primeiro = false;
			$verifica = true;
		}
	}
	return $stringArray."}";
}


function arrayEmJson($array){
	$stringArray = "[";
	$primeiro = true;

	foreach ($array as $key => $value) {
		switch (gettype($value)) {
			case 'string':
				$stringArray .= $primeiro ? "{\"".$key."\": \"".$value."\"}" : ",{\"".$key."\": \"".$value."\"}";
				break;
			case 'interger':
				$stringArray .= $primeiro ? "{".$key.": ".$value."}" : ",{".$key.": ".$value."}";
				break;
			case 'double':
				$stringArray .= $primeiro ? "{".$key.": ".$value."}" : ",{".$key.": ".$value."}";
				break; 
			case 'floute':
				$stringArray .= $primeiro ? "{".$key.": ".$value."}" : ",{".$key.": ".$value."}";
				break;
			case 'boolean':
				$value = $value ? "1" : "0";
				$stringArray .= $primeiro ? "{".$key.": ".$value."}" : ",{".$key.": ".$value."}";
				break;
			case 'object':
				$stringArray .= $primeiro ? objectEmJson($value) : ",".objectEmJson($value);
				break;
			case 'array':
				$stringArray .= $primeiro ? arrayEmJson($value) : ",".arrayEmJson($value);
				break;
			default:
				$stringArray .= "\"".$value."\"";
				break;
		}
		$primeiro = false;
	}
	return $stringArray."]";
}


function formataDatUN($dataUN){
	return implode("/", array_reverse(explode("-", $dataUN)));
	// return $dataUN[2] . "/" . $dataUN[1] . "/" . $dataUN[0];
}



/* function formataParaQuery($texto, $tabelaSql, $campoSql){
	if($texto == "") 	$texto = "($tabelaSql.$campoSql LIKE '%%' OR COALESCE($tabelaSql.$campoSql, '0') = '0')";
	else 				$texto = " $tabelaSql.$campoSql LIKE '%" . mb_strtoupper($texto) . "%'";
	return $texto;
}*/



function formataParaQuery($texto, $tabelaSql, $campoSql){
	$texto = explode(" ", $texto);
	$descricaoCompleta = "";
	for ($i=0; $i < sizeof($texto); $i++) { 
		if ($texto[$i] != "") {
			$descricaoCompleta .= "
				AND $tabelaSql.$campoSql LIKE '%" . $texto[$i] ."%'";
		}
	}
	$texto = $descricaoCompleta;
	return $texto;
}
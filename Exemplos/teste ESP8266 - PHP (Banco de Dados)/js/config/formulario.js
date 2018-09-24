function jk_cabecarioListagem(titulo, idCombo, conteudo){
	var jk_config = "	<div class='col-md-12 text-center'>";
	jk_config += "			<h1>"+titulo+"</h1>";
	jk_config += "		</div>";

	jk_config += "		<div class='col-md-12 text-center'>";
	jk_config += "			<div class='row'>";

	jk_config += "				<div class='col-md-4'>";
	jk_config += "					<div class='input-group text-left'>";
	jk_config += "						<div class='input-group-addon'>";
	jk_config += "							<i class='fa fa-search' aria-hidden='true'></i>";
	jk_config += "						</div>";
	jk_config += "						<div id='"+idCombo+"'></div>";
	jk_config += "					</div>";
	jk_config += "				</div>";
	jk_config += "				<div class='col-md-6 col-md-offset-2 text-right'>";
	jk_config += 					conteudo;
	jk_config += "				</div>";

	jk_config += "			</div>"
	jk_config += "		</div>";

	return jk_config;
}


function jk_cabecarioFormulario(titulo, accessKey, click){
	var jk_config = "	<div class='col-md-11 text-left' style='margin-left:15px;margin-right:50px;'>";
	jk_config += "			<div class='text-left title'>";
	jk_config += "				<h2>";
	jk_config += 					titulo;
	jk_config += "				</h2>";
	jk_config += "				<div class='text-left'>";
	jk_config += "					<a href='#' accessKey='"+accessKey+"' onclick='"+click+"' class='btn' title='Voltar'>";
	jk_config += "						<i class='fa fa-arrow-left' aria-hidden='true'></i>";
	jk_config += "					</a>";
	jk_config += "				</div>";
	jk_config += "				";
	jk_config += "			</div>";
	jk_config += "		</div>";
	return jk_config;
}

function jk_campoInicialFormulario(tamanho, titulo, obrigatorio, valor, id){
	var jk_configComplemento = "";
	var jk_configComplemento2 = "";
	if (obrigatorio != 0) {
		jk_configComplemento += "<span style='color: red;'>*</span>";
		jk_configComplemento2 += "required";
	}

	var jk_config = "	<div class='col-md-"+tamanho+"'>";
	jk_config += "			<label class='label-float'>"+titulo+":</label>&nbsp;"+jk_configComplemento;
	jk_config += "			<input type='text' value='"+valor+"' id='"+id+"' class='form-control' "+jk_configComplemento2+" accessKey='i'>";
	jk_config += "		</div>";
	return jk_config;
}

function jk_campoMaskFormulario(tamanho, titulo, obrigatorio, valor, id, mascara){
	var jk_configComplemento = "";
	var jk_configComplemento2 = "";
	if (obrigatorio != 0) {
		jk_configComplemento += "<span style='color: red;'>*</span>";
		jk_configComplemento2 += "required";
	}

	var jk_config = "	<div class='col-md-"+tamanho+"'>";
	jk_config += "			<label class='label-float'>"+titulo+":</label>&nbsp;"+jk_configComplemento;
	jk_config += "			<input type='text' value='"+valor+"' rel="+mascara+" id='"+id+"' class='form-control' "+jk_configComplemento2+">";
	jk_config += "		</div>";
	return jk_config;
}

function jk_campoNumFormulario(tamanho, titulo, obrigatorio, valor, id){
	var jk_configComplemento = "", jk_configComplemento2 = "";
	if (obrigatorio != 0) {
		jk_configComplemento += "<span style='color: red;'>*</span>";
		jk_configComplemento2 += "required";
	}

	var jk_config = "	<div class='col-md-"+tamanho+"'>";
	jk_config += "			<label class='label-float'>"+titulo+":</label>&nbsp;"+jk_configComplemento;
	jk_config += "			<input type='number' value='"+valor+"' id='"+id+"' class='form-control' "+jk_configComplemento2+">";
	jk_config += "		</div>";
	return jk_config;
}

function jk_campoDataFormulario(tamanho, titulo, obrigatorio, valor, id){
	var jk_configComplemento = "", jk_configComplemento2 = "";
	if (obrigatorio != 0) {
		jk_configComplemento += "<span style='color: red;'>*</span>";
		jk_configComplemento2 += "required";
	}

	var jk_config = "	<div class='col-md-"+tamanho+"'>";
	jk_config += "			<label class='label-float'>"+titulo+":</label>&nbsp;"+jk_configComplemento;
	jk_config += "			<input type='date' value='"+valor+"' id='"+id+"' class='form-control' "+jk_configComplemento2+">";
	jk_config += "		</div>";
	return jk_config;
}

function jk_campoFormulario(tamanho, titulo, obrigatorio, valor, id){
	var jk_configComplemento = "", jk_configComplemento2 = "";
	if (obrigatorio != 0) {
		jk_configComplemento += "<span style='color: red;'>*</span>";
		jk_configComplemento2 += "required";
	}

	var jk_config = "	<div class='col-md-"+tamanho+"'>";
	jk_config += "			<label class='label-float'>"+titulo+":</label>&nbsp;"+jk_configComplemento;
	jk_config += "			<input type='text' value='"+valor+"' id='"+id+"' class='form-control' "+jk_configComplemento2+">";
	jk_config += "		</div>";
	return jk_config;
}
function jk_b(conteudo){
	var jk_config = "<b>"+conteudo+"</b>";
	return jk_config;
}

function jk_p(conteudo){
	var jk_config = "<p>"+conteudo+"</p>";
	return jk_config;
}

function jk_img(src, width, height){
	var jk_config = "<img src="+src+" width="+width+" height="+height+">";
	return jk_config;
}

function jk_icon(icon){
	var jk_config = "<i class='fa fa-"+icon+"' aria-hidden='true'></i>";
	return jk_config;
}

function jk_buttonDropdown(id, classe, conteudo){
	var jk_config = "	<button id='"+id+"' class='btn btn-"+classe+" dropdown-toggle' data-toggle='dropdown' aria-haspopup='false' aria-expanded='false'>";
	jk_config += 			conteudo;
	jk_config += "			<span class='caret'></span>";
	jk_config += "		</button>";
	return jk_config;
}

function jk_buttonModal(id, classe, classeEspecifica, accessKey, onclick, conteudo, idModal){
	var jk_config = "	<button id='"+id+"' class='btn btn-"+classe+" "+classeEspecifica+"' accessKey='"+accessKey+"' onclick='"+onclick+"' data-toggle='modal' data-target='#"+idModal+"'>"
	jk_config += 			conteudo;
	jk_config += "		</button>"
	return jk_config;
}

function jk_buttonComplemento(id, classe, classeEspecifica, accessKey, onclick, conteudo, complemento){
	var jk_config = "	<button id='"+id+"' class='btn btn-"+classe+" "+classeEspecifica+"' accessKey='"+accessKey+"' onclick='"+onclick+"' "+complemento+">";
	jk_config += 			conteudo
	jk_config += "		</button>";
	return jk_config;
}

function jk_button(id, classe, classeEspecifica, accessKey, onclick, conteudo){
	var jk_config = "	<button id='"+id+"' class='btn btn-"+classe+" "+classeEspecifica+"' accessKey='"+accessKey+"' onclick='"+onclick+"'>";
	jk_config += 			conteudo
	jk_config += "		</button>";
	return jk_config;
}

function jk_romTituladaDiv(titulo, conteudo){
	var jk_config = "	<div class='row'>";
	jk_config += "			<h2 style='margin-left: 15px'>"+titulo+"</h2>";
	jk_config += 			conteudo;
	jk_config += "		</div>";
	return jk_config;
}

function jk_romDiv(conteudo){
	var jk_config = "	<div class='row'>";
	jk_config += 			conteudo;
	jk_config += "		</div>";
	return jk_config;
}

function jk_div(id, classe, complemento, conteudo){
	var jk_config = "	<div id='"+id+"' class='"+classe+"' "+complemento+">";
	jk_config += 			conteudo;
	jk_config += "		</div>";
	return jk_config
}

function jk_form(acao, metodo, classe, conteudo){
	var jk_config = "	<form  method='"+metodo+"' action="+acao+" class='"+classe+"'>";
	jk_config += 			conteudo;
	jk_config += "		</form>";
	return jk_config
}

function jk_table(classe, borda, conteudo){
	var jk_config = "	<table class='"+classe+"' border='"+borda+"'>";
	jk_config += 			conteudo;
	jk_config += "		</table>";
	return jk_config;
}

function jk_tr(id, click, conteudo){
	var jk_config = "	<tr id='"+id+"' onclick='"+click+"'>";
	jk_config += 			conteudo;
	jk_config += "		</tr>";
	return jk_config;
}


function jk_td(alinhamento, conteudo){
	var jk_config = "	<td  align='"+alinhamento+"'>";
	jk_config += 			conteudo;
	jk_config += "		</td>";
	return jk_config;
}

function jk_label(descricao, obrigatorio){
	var jk_complemento = "";
	if (obrigatorio == 1) { jk_complemento = "&nbsp;<span style='color: red;'>*</span>"; }
	var jk_config = "<label class='label-float'>"+descricao+":</label>"+jk_complemento;
	return jk_config;
}

function jk_inputSimples(id, valor, disabilitar){
	var jk_complemento = "";
	if (disabilitar == 1) jk_complemento = "disabled";
	var jk_config = "<input id='"+id+"' type='text' class='form-control' value='"+valor+"' "+jk_complemento+">";
	return jk_config;
}

function jk_input(id, tipo, classe, valor, disabilitar, obrigatorio){
	var jk_complemento = "";
	if (disabilitar == 1) jk_complemento = "disabled";
	if (obrigatorio == 1) jk_complemento += "required";
	var jk_config = "<input id='"+id+"' type='"+tipo+"' class='"+classe+"' value='"+valor+"' "+jk_complemento+">";
	return jk_config;
}

function jk_inputCompleto(id, nome, tipo, classe, valor, placeholder, disabilitar, obrigatorio, max){
	var jk_complemento = "";
	if (disabilitar == 1) jk_complemento = "disabled";
	if (obrigatorio == 1) jk_complemento += "required";
	var jk_config = "<input id='"+id+"' name='"+nome+"' placeholder='"+placeholder+"' type='"+tipo+"' class='"+classe+"' value='"+valor+"' maxlength='"+max+"' "+jk_complemento+">";
	return jk_config;
}
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize: function() {
		// alert("inicializar");
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		// alert("bindEvents");
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		// alert("onDeviceReady");
		document.querySelector("#scanProd").addEventListener("touchend", prodScan, false);
		// app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	}
};


function prodScan() {
	// alert("prodScan");
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			// alert(result.text);
			buscarSetarProduto({cod: result.text, boolLeitor: true });
		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
}




var produto_Global = "", descricaoSetadaProduto = "";
function buscarSetarProduto(opcoes){
	var objetoPadrao = {
		cod: "",
		boolModal: false,
		boolLeitor: false,
		modalEquivalente: false
	}
	opcoes = $.extend( {}, objetoPadrao, opcoes );

	console.log("buscarSetarProduto");
	$("#modalCodFunc").modal("hide");
	opcoes.cod = opcoes.cod.match(/[0-9]/g).join('');

	if(opcoes.cod.length >= 13){
		$.ajax({
			url: ip_Global + "controllers/controllerProduto.php",
			type: 'POST',
			dataType: 'text',
			data: {
				'buscaProduto': true,
				'cod': opcoes.cod,

				'usuarioID': usuario_Global.login
			},
			error: function(){
				alert("Falha ao tentar pesquisar Código do Produto!");
			}
		}).done( function(data){
			console.log(data);
			try{
				data = JSON.parse(data);
				console.log(data);

				produto_Global = data;

				if (data.debug != 1 && data.debug != '1' && data.debug != 'OK') { // data.debug != 0 && data.debug != '0'
					if (data.debug == 0 || data.debug == "0") {
						// Abrir modal de cadastro de produto
						$("#buttonAddProduto")[0].className = "input-group-addon";
						$("#buttonEquivalenteProduto")[0].className = "hidden";
						if (opcoes.boolLeitor) {
							modalAdicionarItem(opcoes.cod);
						}
					} else {
						// alert(data.debug);
						$("#buttonAddProduto")[0].className = "hidden";
						$("#buttonEquivalenteProduto")[0].className = "hidden";
					}
				} else {
					descricaoSetadaProduto = data.quantidade_item + data.sigla_unidade_medida + " - "
										   + data.descricao_item + " " + data.descricao_marca + 
										   (data.especificacao_equivalentes != "" ? " (" : "") + data.especificacao_equivalentes + 
										   (data.especificacao_equivalentes != "" ?  ")" : "");
					$("#id_produto").val(data.id_item);
					$("#cod_produto_pedido").val(data.codigo_item);
					$("#descricao_produto").val(descricaoSetadaProduto);
					$("#modalCadastroProduto").modal("hide");
					$("#buttonAddProduto")[0].className = "hidden";
					// $("#especificacoes_produto").html();
					$("#buttonEquivalenteProduto")[0].className = "input-group-addon";
				}
			} catch(error){
				alert("Falha na converssão do objeto: " + error);
			}
		});
	} else if (opcoes.boolModal) {
		$("#buttonAddProduto")[0].className = "hidden";
		$("#buttonEquivalenteProduto")[0].className = "hidden";
		alert("Codigo inválido!");
	} else {
		$("#buttonAddProduto")[0].className = "hidden";
		$("#buttonEquivalenteProduto")[0].className = "hidden";
	}
}


function modalAdicionarItem(cod){
	$("#codProdutoModla").val(cod);
	$("#modalCadastroProduto").modal("show");
}



function modalRquivalenteItem(cod){
	/* Abrir modalde produto equivalente */
	var descricao = produto_Global.quantidade_item + produto_Global.sigla_unidade_medida + " - "
					+ produto_Global.descricao_item + " " + produto_Global.descricao_marca
	$("#descricaoCompletaEspecificacaoModal").val(descricao);
	$("#modalEspecificacaoItem").modal("show");
}



function compararDescricaoProduto(descricao){
	if (descricaoSetadaProduto != descricao) {
		$("#cod_produto_pedido").val("");
		$("#id_produto").val("");
		$("#buttonEquivalenteProduto")[0].className = "hidden";
	} else if(produto_Global != ""){
		$("#cod_produto_pedido").val(produto_Global.codigo_item);
		$("#id_produto").val(produto_Global.id_item);
		$("#buttonEquivalenteProduto")[0].className = "input-group-addon";
	}
}





function salvarProduto(opcoes){
	opcoes = $.extend( {}, {
		lista: false,
		compra: false
	} , opcoes);


	var valido = true;

	var ipProduto = $("#id_produto").val();
	var descricao = $("#descricao_produto").val();
	var quantidade = $("#qdtProdutoAdicionar").val();
	var valorUnitario = $("#vlrUnitariProduto").val().replace(/e/gi, "");

	if (  (ipProduto == "" || ipProduto == "0" || ipProduto == 0 ) && descricao == "" ) {
		/* Valida Produto */
		valido = false;
		alert("Produto nã especificado!");
	} else if (quantidade == "" || isNaN(quantidade) ) {
		/* Valida Qunatidade */
		valido = false;
		alert("Valor da quantidade inválido!");
	} else if( opcoes.compra && ( valorUnitario == "" || isNaN(valorUnitario) ) ){
		/* Valida Valor Unitario */
		valido = false;
		alert("Valor Unitário inválido!");
	}

	if (valido) {
		$.ajax({
			url: ip_Global + "controllers/controllerPedido.php",
			type: "POST",
			dataType: "text",
			data: {
				"salvarPedido": true,
				// "adicionarPedido": 	(id_pedido_Global == 0 ? true : ""), 
				// "editarPedido": 	(id_pedido_Global != 0 ? true : ""), 
				"compra": 			(opcoes.compra ? true : ""),

				"id_pedido": 		id_pedido_Global,
				"id_supermecado": 	$("#selectSupermecado").val(),

				"id_produto": ipProduto,
				"descricao_produto": descricao,
				"quantidade": quantidade,
				"valorUnitario": valorUnitario,
				"totalProduto": ( parseFloat(quantidade) * parseFloat(valorUnitario) ),

				"usuarioID": usuario_Global.login
			}
		}).done( function(data){
			if (data != "0") {
				alert("Produto adicionado á" + (opcoes.compra ? " compra " : " lista de compra ") + "com sucesso!");
				id_pedido_Global = data;
			} else {
				alert("Falha ao tentar gravar");
			}
		});
	}
}





function novoPedido(){
	id_pedido_Global = 0;
	localStorage.removeItem("id_pedido_Global");
	$("#id_produto").val("");
	$("#descricao_produto").val("");
	$("#vlrUnitariProduto").val("");
	$("#qdtProdutoAdicionar").val("1");
}

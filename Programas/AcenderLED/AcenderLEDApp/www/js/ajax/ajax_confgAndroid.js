/* configuração do botão voltar do celular */
document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown(e) {
	e.preventDefault();
	var statusGeral = $("#statusGeral").val();

	/* stuação um */
	if (statusGeral == "inicial") {
		bootbox.confirm({
			title: "Sair?",
			message: "Deseja sair da aplicação?",
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
					exitFromApp();
				}
			}
		});
	}

	else if (statusGeral == "pagina2") {
		n_editar();
		montarMenuPrincipal();
	}

	else if (statusGeral == "pagina3") {
		var lancPedidoId = $("#editar").val();
		montarListaItem(lancPedidoId);
	}

	else if (statusGeral == "ficha1") {
		document.getElementById("fecharModalFichaPedido").click();
		$("#statusGeral").val("inicial");
	}

	else if (statusGeral == "ficha2") {
		document.getElementById("fecharModalFichaPedido").click();
		$("#statusGeral").val("pagina2");
	}

	else if (statusGeral == "pedido") {
		document.getElementById("fecharModalViewPedido").click();
		$("#statusGeral").val("inicial");
	}

	else if (statusGeral == "item") {
		document.getElementById("fecharModalBottun").click();
		$("#statusGeral").val("pagina3");
	}

	
}

function exitFromApp(){
	console.log("Fechando Aplicação");
	navigator.app.exitApp();
}

function setStatus(status){
	$("#statusGeral").val(status);
}
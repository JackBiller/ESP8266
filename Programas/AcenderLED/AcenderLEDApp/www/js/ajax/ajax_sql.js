var bancoDeDados;


 criarBancoDeDados(); 
function criarBancoDeDados(){
	bancoDeDados =  openDatabase("VendasCDI", "1.0", "Testar SQL para logar sozinho", 200000);
	if(!bancoDeDados){
		alert('deu pau!');
	}


	bancoDeDados.transaction (function (tx) {
		tx.executeSql ("CREATE TABLE IF NOT EXISTS USUARIO (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, identificacao TEXT, senha TEXT, data TEXT)",null,null);
		tx.executeSql ("CREATE TABLE IF NOT EXISTS IP (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ip TEXT)",null,null);
		tx.executeSql ("CREATE TABLE IF NOT EXISTS PORTA (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, porta TEXT)",null,null);
	});

	bancoDeDados.transaction (function (tx) {
		tx.executeSql ('SELECT * FROM IP', [], function (tx, results) {
			var len = results.rows.length, i;
			var ip = "";
			var dataAtualLogar = pegarData();
			msg = "<p> Registros encontrados:" + len + "</ p>";
			for (i = 0; i <len; i ++) {
				ip = results.rows.item(i).ip;
			}
			if (ip != "") {
				hostWebService = ip;
				hostServeImage = ip;
				$("#modalIpConfig").val(ip);
				urlWebService = "http://"+hostWebService+portaWebService+caminhoWebService;
				
				/* montarListaMesasCombo(); */
			} else {
				removerIp();
			}
		}, null);

		tx.executeSql ('SELECT * FROM PORTA', [], function (tx, results) {
			var len = results.rows.length, i;
			var porta = "";
			var dataAtualLogar = pegarData();
			msg = "<p> Registros encontrados:" + len + "</ p>";
			for (i = 0; i <len; i ++) {
				porta = results.rows.item(i).porta;
			}
			if (porta != "") {
				portaImgService = porta;
				$("#modalPortaConfig").val(porta);
				
				/* montarListaMesasCombo(); */
			} else {
				removerIp();
			}
		}, null);

		tx.executeSql ('SELECT * FROM USUARIO', [], function (tx, results) {
			var len = results.rows.length, i;
			var identificador = "";
			var senha = "";
			var dataLogada = "";
			var dataAtualLogar = pegarData();
			msg = "<p> Registros encontrados:" + len + "</ p>";
			for (i = 0; i <len; i ++) {
				identificador = results.rows.item(i).identificacao;
				senha = results.rows.item(i).senha;
				dataLogada = results.rows.item(i).data;
			}
			if (dataLogada == dataAtualLogar) {
				logarSistema(identificador, senha);	
			} else {
				removerLogin(false);
			}
		}, null);

	});
}

function adicionarLogin(identificador, senha){
	var dataAtualSalvar = pegarData();
	bancoDeDados.transaction (function (tx) {
		tx.executeSql ("DELETE FROM USUARIO");
		tx.executeSql ("INSERT INTO USUARIO (identificacao, senha, data) VALUES (?,?,?)",[identificador,senha,dataAtualSalvar],null,null);
	});
}


function adicionarIp(){
	var modalChaveConfig = $("#modalChaveConfig").val();
	var modalUsuarioConfig = $("#modalUsuarioConfig").val();

	if ((modalUsuarioConfig == "ADM" || modalUsuarioConfig == "Adm" || modalUsuarioConfig == "adm") && modalChaveConfig == "2017") {
		var ip = $("#modalIpConfig").val();
		var porta = $("#modalPortaConfig").val();

		if (ip == "") {
			toastGeral("error", "Erro preencha o campo IP!");
		} else {
			bancoDeDados.transaction (function (tx) {
				tx.executeSql ("DELETE FROM IP");
				tx.executeSql ("INSERT INTO IP (ip) VALUES (?)",[ip],null,null);
			});
			hostWebService = ip;
			hostServeImage = ip;
			urlWebService = "http://"+hostWebService+portaWebService+caminhoWebService;
			/* setarIpCampoConfig(); */

			/* montarListaMesasCombo(); */
			document.getElementById("fecharModalIpBottun").click();
			adicionarPorta(porta);
		}
	} else {
		toastGeral("error", "Erro Usuário ou/e Senha inválidos!");
	}
}


function adicionarIpDireto(ip, porta){
	bancoDeDados.transaction (function (tx) {
		tx.executeSql ("DELETE FROM IP");
		tx.executeSql ("INSERT INTO IP (ip) VALUES (?)",[ip],null,null);
	});
	hostWebService = ip;
	hostServeImage = ip;
	urlWebService = "http://"+hostWebService+portaWebService+caminhoWebService;

	bancoDeDados.transaction (function (tx) {
		tx.executeSql ("DELETE FROM PORTA");
		tx.executeSql ("INSERT INTO PORTA (porta) VALUES (?)",[porta],null,null);
	});
	portaImgService = porta;
	setarIpCampoConfig();
}



function adicionarPorta(porta){
	if (porta == "") {
		toastGeral("error", "Erro preencha o campo IP!");
	} else {
		bancoDeDados.transaction (function (tx) {
			tx.executeSql ("DELETE FROM PORTA");
			tx.executeSql ("INSERT INTO PORTA (porta) VALUES (?)",[porta],null,null);
		});
		portaImgService = porta;
		setarIpCampoConfig();
	}
}

function removerLogin(reload){
	bancoDeDados.transaction (function (tx) {
		tx.executeSql ("DELETE FROM USUARIO",[], 
		function(tx,results){
			if (reload) {
				location.reload();
			}
			/* console.error("Table Dropped"); */
		},
		function(tx,error){
			console.error("Error: " + error.message);
		});
	});
	
}

function removerIp(){
	bancoDeDados.transaction (function (tx) {
		tx.executeSql ("DELETE FROM IP");
	});
}
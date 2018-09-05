INTROPDUÇÃO AO WEBPACK
======================


Configuração básica 
-------------------
Primeiro, vamos criar um diretório, inicializar o npm, instalar o webpack localmente e instalar o webpack-cli (a ferramenta usada para executar o webpack na linha de comando):

Cria a pasta com o projeto e entra nela

	mkdir webpack-demo && cd webpack-demo


Inicia o package.json com cofiguração basica

	npm init -y


Instala o webpack e o webpack-cli
**Nota: o webpack-cli é para executar comandos via terminal.**

	npm install webpack webpack-cli --save-dev


ESTRUTURA
---------

Projeto Geral
	
	project
	|- /dist
		|- index.html
		|- main.js
	|- /node_modules
	|- /src
		|- index.js
	|- package.json
	|- package-lock.json
	|- webpack.config.js



###package.json

	{
	  "name": "webpack-demo",
	  "version": "1.0.0",
	  "description": "",
	  "main": "index.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1",
	    "build": "webpack"
	  },
	  "keywords": [],
	  "author": "",
	  "license": "ISC",
	  "devDependencies": {
	    "webpack": "^4.17.1",
	    "webpack-cli": "^3.1.0"
	  },
	  "dependencies": {
	    "lodash": "^4.17.10"
	  }
	}



###webpack.confing,js
	
	const path = require('path');
	module.exports = {
		entry: './src/index.js',
		output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'dist')
		}
	};



###index.hmtl

	<!doctype html>
	<html>
	<head>
		<title>Getting Started</title>
		<!-- <script src="https://unpkg.com/lodash@4.16.6"></script> -->
	</head>
	<body>
		<!-- <script src="./src/index.js"></script> -->
		<script src="main.js"></script>
	</body>
	</html>


###index.js

	import _ from 'lodash';
	function component(){
		let element = document.createElement('div');
		element.innerHTML = _.join(['Hello', 'webpack'], '');
		return element;
	}
	document.body.appendChild(component());


**O main.js é gerado automaticamente .**


COMANDOS
--------
	
Isntala o modulo lodash no projeto para criar o pacote

	npm install --save lodash



Copila os fontes no arquivo main.js

	npx webpack



Copila usando configuração

	npx webpack --config webpack.config.js



Executa a compilação pela configuração do package.json

	npm run build





REFERÊNCIA
----------
https://webpack.js.org/guides/getting-started/








OUTRAS INSTALAÇÕES
==================

jQuery
------

Instalando jQuery

	npm install jquery

OU

	npm install jquery


impontar jQuery ao codigo

	const $ = require("jquery");

Ou

	import {$, jQuery} from "jquery";


REFERÊNCIA
----------
https://www.npmjs.com/package/jquery
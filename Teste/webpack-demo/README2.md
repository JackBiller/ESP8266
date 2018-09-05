GESTÃO DE ATIVOS
===

LOADERs
---
Impotando arquivos do diretorio `/src` para `/dist`, para fazer isso precisa usar `loader`

Os camandos para loaders segue um padrão 
	
	npm install --save-dev style-loader css-loader

**Nota: a instalação de loader é o tipo de loader que você seguido de `-loader` no nome**.


Tipos: 
	
-	style-loader
-	css-loader
-	file-loader
-	xml-loader
-	csv-loader


Você pode desenvolveer os codigos em outras verssão do javascript acima do `5` e usando o `babel-loader` codigos de verssões acima do javascript para verssão `5`

-	babel-loader


CONFIGURAÇÃO
------------

## webpack.confing,js
	
	const path = require('path');
	module.exports = {
		entry: './src/index.js',
		output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'dist')
		},
		module: {
			rules: [
				{
					test: /\.css$/,							// EXPRESSÃO REGULAR PARA REFERENCIAR ARQUIVOS COM EXTEÇÃO .css
					use: [ 'style-loader', 'css-loader' ] 	// LOADERS QUE PRECESSÃO ESSE ARQUIVO
				},
				{
					test: /\.(png|jpg|svg|gif)$/,
					use: {
						loader: 'file-loader',
						options: {
							// name: '[name].[ext]',		// DEFINE O NOME DO ARQUIVO (NESTA LINHA ELE SETA O NOME DO ARQUIVO COM O ORIGINAL)
							outputPath: 'images/'			// ALTERA O DESTINO DA IMAGEM
						}
					}
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: {
						loader: 'file-loader',
						options: {
							outputPath: 'fonts/'
						}
					}
				},
				{
					test: /\.(csv|tsv)$/,
					use: [ 'csv-loader' ]
				},
				{
					test: /\.xml$/,
					use: [ 'xml-loader' ]
				}
			]
		}
	};


## Tabela Teste
| Coluna 1             | Coluna 2 |
| -------------------- | -------- |
| teste                | teste2   |
| referencia para nada | pula     |

REFERÊNCIA
----------
https://webpack.js.org/guides/asset-management/  
https://blog.dmatoso.com/webpack-sem-medo-parte-2-loaders-1d1239df3945
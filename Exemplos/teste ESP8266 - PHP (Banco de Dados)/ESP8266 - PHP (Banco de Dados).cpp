/* ESP8266 e Banco de Dados - Requisições HTTP
 * 2018 por Jack Biller
 * jackbiller19@gmail.com
 */ 
 
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <SimpleDHT.h>
 
// WiFi - Coloque aqui suas configurações de WI-FI
const char ssid[] = "SSID"; // Nome da rede WI-FI
const char psw[] = "SENHA"; // E a senha para autentica
 
// Site remoto - Coloque aqui os dados do site que vai receber a requisição GET
const char http_site[] = "http://192.168.0.102";
const int http_port = 8080;
 
// Variáveis globais
WiFiClient client;
IPAddress server(192,168,0,23); //Endereço IP do servidor - http_site
int pinDHT11 = D2;
SimpleDHT11 dht11;

void setup() {
	delay(30000); // Aguardar 30 segundos 
	Serial.begin(9600);
	Serial.println("NodeMCU - Gravando dadios no BD via GET");
	Serial.println("Aguardando conexão");

	// Tenta conexão com Wi-fi
	WiFi.begin(ssid, psw);
	while ( WiFi.status() != WL_CONNECTED ) {
		delay(100);
		Serial.print(".");
	}
	Serial.print("\nWI-FI conectado com sucesso: ");
	Serial.println(ssid);
}
 
void loop() {
	//Leitura do sensor DHT11
	delay(3000); //delay entre as leituras
	byte temp = 0;
	byte humid = 0;

	// Verifica o sensor se esta funcionado
	if (dht11.read(pinDHT11, &temp, &humid, NULL)) {
		Serial.print("Falha na leitura do sensor.");
		return;
	}

	// Aqui o sensor esta funcionado
	Serial.println("Gravando dados no BD: ");
	Serial.print((int)temp); Serial.print(" *C, "); // Seta a leitura do temp
	Serial.print((int)humid); Serial.println(" %"); // Seta a leitura da humidade

	// Envio dos dados do sensor para o servidor via GET
	if ( !getPage((int)temp,(int)humid) ) {
		Serial.println("GET request failed");
	}
}


// Executa o HTTP GET request no site remoto
bool getPage(int temp, int humid) {
	// Verifica a coneção
	if ( !client.connect(server, http_port) ) {
		Serial.println("Falha na conexao com o site ");
		return false;
	}

	//Parâmetros com as leituras para requisição a pagina PHP (Aqui a placa já conseguiu conectar no servidor)
	String param = "?temp=" + String(temp) + "&humid=" + String(humid);
	
	// Imprimi os parametros na tela Serial da IDE
	Serial.println(param);
	
	// Neste Pedaço deve ta a requisição 
	client.println("GET /weather/insert_weather.php" + param + " HTTP/1.1");
	client.println("Host: ");
	client.println(http_site);
	client.println("Connection: close");
	client.println();
	client.println();
	// Fim (Neste Pedaço deve ta a requisição)

	// Informações de retorno do servidor para debug
	while(client.available()){
		String line = client.readStringUntil('\r');
		Serial.print(line); // Imprimir retorno do servidor
	}
	return true;
}
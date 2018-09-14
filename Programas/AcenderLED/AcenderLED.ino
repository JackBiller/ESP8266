#include <SoftwareSerial.h>

//RX pino 2, TX pino 3
SoftwareSerial esp8266(2, 3);

#define DEBUG true
#define DEBUGOF false
#define LED 8
int saidaLed = 0;
String ds_led = "";

void setup(){
	Serial.begin(9600);
	esp8266.begin(19200);
	pinMode(LED, OUTPUT);

	sendData("AT+RST\r\n", 2000, DEBUG); // rst
	// Conecta a rede wireless
	sendData("AT+CWJAP=\"TP-LINK_D745C2\",\"2012c@s@X\"\r\n", 2000, DEBUG);
	delay(3000);
	sendData("AT+CWMODE=1\r\n", 1000, DEBUG);
	// Mostra o endereco IP
	sendData("AT+CIFSR\r\n", 1000, DEBUG);
	// Configura para multiplas conexoes
	sendData("AT+CIPMUX=1\r\n", 1000, DEBUG);
	// Inicia o web server na porta 80
	sendData("AT+CIPSERVER=1,80\r\n", 1000, DEBUG);
}


void loop(){
	// Verifica se o ESP8266 esta enviando dados
	if (esp8266.available()){
		if (esp8266.find("+IPD,")){
			// delay(300);
			String msg;
			esp8266.find("?");
			msg = esp8266.readStringUntil(' ');   //lê mensagem
			String command = msg.substring(0, 3); //"led" = comando para o servo #1 e "sr2" = comando para o servo #2
			String valueStr = msg.substring(4);   //os 3 caracteres seguintes informam o ângulo desejado
			// int value = valueStr.toInt();
			int connectionId = esp8266.read() - 72; // 48;

			// Serial.print("\nconnectionId: ");
			// Serial.print(connectionId);
			// Serial.print("\n\n");
			if(valueStr == "1"){ 
				ds_led = "LIGADO";
				digitalWrite(LED, HIGH);
			} else{
				ds_led = "DESLIGADO";
				digitalWrite(LED, LOW);
			}

			String webpage = "{\"led\":\"" + ds_led + "\"}";
			// webpage += "</head><h1><u>ESP8266 - Web Server</u></h1><h2>";
			// webpage += "Porta 13: esta com o LED ";
			// int a = digitalRead(8);
			// webpage += ds_led;
			// webpage += "<h2>Porta Digital 9: ";
			// int b = digitalRead(9);
			// webpage += b;
			// webpage += "</h2>";

			String cipSend = "AT+CIPSEND=";
			cipSend += connectionId;
			cipSend += ",";
			cipSend += webpage.length();
			cipSend += "\r\n";

			sendData(cipSend, 1000, DEBUG);
			sendData(webpage, 1000, DEBUG);

			String closeCommand = "AT+CIPCLOSE=";
			closeCommand += connectionId; // append connection id
			closeCommand += "\r\n";

			sendData(closeCommand, 3000, DEBUG);
		}
	}
}



String sendData(String command, const int timeout, boolean debug){
	// Envio dos comandos AT para o modulo
	String response = "";
	esp8266.print(command);
	long int time = millis();
	while ( (time + timeout) > millis()){
	  	while (esp8266.available()){
			// The esp has data so display its output to the serial window
			char c = esp8266.read(); // read the next character.
			response += c;
		}
	}
	if(debug) Serial.print(response);
	return response;
}

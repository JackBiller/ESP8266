// Programa : Alarme Residencial
// Autor : Jack Biller

#include <SPI.h>
#include <MFRC522.h>
#include <Wire.h>  
#include <LiquidCrystal_I2C.h>
#include <SoftwareSerial.h>
SoftwareSerial mySerial(2,3); 																			// RX, TX

#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN);   																// Create MFRC522 instance.

LiquidCrystal_I2C lcd(0x3F, 2, 1, 0, 4, 5, 6, 7, 3, POSITIVE);

char st[20];

int rele_1 = 7;   																									// rele da sirene e eletrica da casa  -- sensor pir
int rele_2 = 8;   																									// rele da porta RFID
int PIR = 5;
int acionamento;  																									// Variavel para guardar valor do sensor
int buzzer = 4;

bool status_alarme = 1;
int bt_aciona = 6;
int alarme;

void setup(){
	Serial.begin(9600);   																						// Inicia a serial
	SPI.begin();          																						// Inicia  SPI bus
	mfrc522.PCD_Init();   																						// Inicia MFRC522
	Serial.println("Aproxime o seu cartao do leitor...");
	Serial.println();
	lcd.begin(16, 2);  																								// Define o número de colunas e linhas do LCD:  
	pinMode(rele_1,OUTPUT);
	pinMode(rele_2,OUTPUT);
	pinMode(bt_aciona, INPUT_PULLUP);
	pinMode(PIR, INPUT); 
	pinMode(buzzer,OUTPUT);           																// Define o pino do Buzzer como Saida
	digitalWrite(rele_1,HIGH);        																// Logica invertida do rele condição normal aberto. 
	digitalWrite(rele_2,LOW);

	Serial.begin(9600);               																// Bluetooth 
	mySerial.begin(9600);             																// Bluetooth 

	mensageminicial();
}

void loop() {
	botao_alarme();
	Serial.println(status_alarme);

	if(mySerial.available()>0 && (status_alarme == 0 || status_alarme == 1) ){
		char buf = mySerial.read();
		Serial.println(buf);
		switch (buf){
			//----------RELE 1----------
			case 'B':
			destravaPorta("Fagner");
			break;
		}
	}
	//verificar se esta ativado == high (status_alarme) ver se o senso de presença captou movimento

	acionamento = digitalRead(PIR);                                  	// Le o valor do sensor PIR
	if (acionamento == HIGH && status_alarme == HIGH){               	// Sem movimento, mantem rele 1 sirene desligado
		digitalWrite(rele_1, LOW);
		tone(buzzer,8000); 
		Serial.println(acionamento);  
	}
	
	// Look for new cards or Select one of the cards
	if(!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) return;
	Serial.print("UID da tag: ");																			// Mostra UID na serial
	String conteudo = "";
	
	byte letra;
	for (byte i = 0; i < mfrc522.uid.size; i++){
		Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
		Serial.print(mfrc522.uid.uidByte[i], HEX);
		conteudo.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
		conteudo.concat(String(mfrc522.uid.uidByte[i], HEX));
	}
	Serial.println();
	Serial.print("Mensagem: ");
	conteudo.toUpperCase();

	if (conteudo.substring(1) == "A5 0F 13 A3"){          							// UID 1 - Chaveiro
		destravaPorta("Fagner");
	} else if (conteudo.substring(1) == "00 F2 8E A7"){   							// UID 2 - Cartao
		destravaPorta("Roberto");
	} else {																														// codigo rejeição não liberado
		Serial.println("Cartao nao reconhecido !");
		Serial.println("Acesso Negado !");
		Serial.println();
		lcd.clear();
		lcd.setCursor(0,0);
		lcd.print("Cartao nao reconhecido!");
		for (int posicao = 0; posicao < 7; posicao++){										// Rolagem para a esquerda
			lcd.scrollDisplayLeft();
			delay(400);
		}
		lcd.setCursor(8,1);
		lcd.println("Acesso Negado !");
		lcd.println();
		delay(2000);
		lcd.clear();
		status_alarme = HIGH;
	}
	ativa_alarme();
	///////////////////////////////////////////////////////////
}

void botao_alarme(){
	if (digitalRead(bt_aciona) == LOW && status_alarme == LOW;){
		delay(2000); 																												// Tempo de ativação do alarnme
		status_alarme = HIGH;
		armandoAlarme(5);																										// Manda o numero de vez que ele vai contar após da o primeiro pulso no botão
	}
	ativa_alarme();
}

void armandoAlarme(int segundos){
	for(int i=1; i <= segundos; i++){
		tone(buzzer,8000);
		delay(200);
		noTone(buzzer);

		Serial.print("ARMANDO O ALARME -- ");
		Serial.print(String(i));
		Serial.println(" --")
		lcd.clear();
		lcd.setCursor(4,0);
		lcd.print("ARMANDO !");
		lcd.setCursor(7,1);
		lcd.print(String(i));
		delay(1000);
		lcd.clear();
	}
}

void mensageminicial(){
	lcd.clear();
	lcd.print(" Aproxime o seu");
	lcd.setCursor(0,1);
	lcd.print("cartao do leitor");
}

void ativa_alarme(){
	String status = status_alarme == LOW ? "DESLIGADO" : "LIGADO";
	Serial.print("ALARME ");
	Serial.println(status)
	lcd.clear();
	lcd.setCursor(1,1);
	lcd.print("ALARME ");
	lcd.print(status);
	lcd.print(" !");
	delay(2000);
	mensageminicial();
}

void destravaPorta(String nome){
	digitalWrite(rele_1, HIGH);
	String saudacao = "Ola ";
	saudacao += nome;
	saudacao += " !";
	Serial.println(saudacao);
	Serial.println("Acesso Liberado !");
	Serial.println();
	lcd.clear();
	lcd.setCursor(0,0);
	lcd.print(saudacao);
	lcd.setCursor(0,1);
	lcd.print("Acesso Liberado !");
	releAcionar();
	status_alarme = LOW;
	noTone(buzzer);
	delay(3000);
}

void releAcionar(){
	digitalWrite(rele_2,HIGH);
	delay(1000);
	digitalWrite(rele_2,LOW);
}
Exercício 1: Liga LED com 2 Botão
================================
Enunciado
------
Fazer um código que ao apertar o push button flash correspondente ao pino D3 da placa apague o LED e quando aperta o push button externo ligado em no pino D1 acenda o LED ligado pino D4

Código
-----
	/**
	  Exercício 1 - Liga Desliga LED com 2 botoes
	  Autor: Jack Biller 
	*/
		
	#define LED   D4              // Pino do LED
	#define BUT_F D3              // Pino do Botão do Flash
	#define BUT_P D1              // Pino do Push Button
	bool controle = true;

	void setup() {
	  pinMode(LED, OUTPUT);           // Define o pino do LED como pino de saida
	  pinMode(BUT_F, INPUT_PULLUP);          // Define o pino Botao do flash como entrada
	  pinMode(BUT_P, INPUT_PULLUP);          // Define o pino Push Button como entrada
	}
		
	void loop() {
	  // Lê a entrada do button, caso estiver alta faz LED apagar
	  if(!digitalRead(BUT_F) == HIGH){
	    controle = true;
	  }
	  // Se não, se o push button tiver com entrada alta LED acende
	  if(!digitalRead(BUT_P) == HIGH){
	    controle = false;
	  }
	  digitalWrite(LED, controle);
	  delay(300);
	}
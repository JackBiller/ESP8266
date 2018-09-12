/*
 * Teste Deviot
 * Autor: Jack Biller
 */

typedef struct {
	int pino;
	bool pullUp = true;
	bool ler(){
		return digitalRead(this.pino);
	}
} Botao;

Botao botoes[4];
int led = 3;

void setup(){
	pinMode(led, OUTPUT);
	for(int i = 5; i <= 8; i++){
		botoes[i - 5].pino = i;
		pinMode(i, (botoes[i - 5].pullUp ? INPUT_PULLUP : INPUT));
	}
}

void loop(){
	for(int i = 0; i < 4 /*sizeof(botoes)*/; i++){
	    if(botoes[i].ler()) i = sizeof(botoes);
	    else if(i == 3) digitalWrite(led, HIGH);
	}
	digitalWrite(led, LOW);
}
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
	for(int i = 0; i <= sizeof(botoes); i++){
		botoes[i].pino = i + 5;
		pinMode(botoes[i].pino, (botoes[i].pullUp ? INPUT_PULLUP : INPUT));
	}
}

void loop(){
	for(int i = 0; i < 4 /*sizeof(botoes)*/; i++){
		if(botoes[i].ler()) i = sizeof(botoes);
		else if(i == 3) digitalWrite(led, HIGH);
	}
	digitalWrite(led, LOW);
}
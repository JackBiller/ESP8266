/**
 * Blink
 * Autor: Jack Biller
 */

#define LED D4
int tempo = 1000, logic = 1;

void setup() {
	pinMode(LED, OUTPUT);
}

void loop() {
	digitalWrite(LED, logic = logic == 1 ? 0 : 1);
	delay(tempo);
}
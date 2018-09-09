/**
 * Botao
 * Autor: Jack Biller
 */

#define LED D4
#define BUT D1

void setup() {
	pinMode(LED, OUTPUT);
	pinMode(BUT, INPUT); // OR INPUT_PULLUP
}

void loop() {
	digitalWrite(LED, !digitalRead(BUT));
}

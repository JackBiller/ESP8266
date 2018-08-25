/* 
 *  Pratica 01
 *  Primeiro programa em ESP8266 ('blink')
 */

#define LED D4

void setup() {
  pinMode(LED, OUTPUT);     // INICIALIZA O LED DA PLACA COM SAÍDA
}

void loop() {
  digitalWrite(LED, LOW);   // O Led da placa está invertido na placa então LOW seria entrada alta nele
  delay(1000);              // Espera 1 segundo
  digitalWrite(LED, HIGH);  // do mesmo modo se der o comando HIGH ele entra com comando baixo no LED
  delay(1000);              // Espera 1 segundo
}

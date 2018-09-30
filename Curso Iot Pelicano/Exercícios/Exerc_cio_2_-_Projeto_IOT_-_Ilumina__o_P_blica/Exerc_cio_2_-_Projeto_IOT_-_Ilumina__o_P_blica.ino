/**
 * Exercício 2 - Projeto IOT - Iluminação Pública
 * By: Jack Biller
 */

int LDR = A0; // Definição do pino do LDR
int LED = D4; // Definição do pino do LED

void setup() {
  Serial.begin(115200);
  pinMode(LED, OUTPUT);
}

void loop() {
  int valor = analogRead(LDR);
  Serial.println(valor/1023.0*100.0);
  if( (analogRead(LDR)/1023.0*100.0) > 10)  digitalWrite(LED, HIGH);
  else                                    digitalWrite(LED, LOW);
  delay(500);
}

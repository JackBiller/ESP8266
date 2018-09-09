/*
 * Segundo Programa
 * Push Bottom
 */

#define BUT D1
#define LED D4

void setup() {
  // put your setup code here, to run once:
  pinMode(BUT, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(digitalRead(BUT) == 1){
    digitalWrite(LED, LOW);
  } else {
    digitalWrite(LOW, HIGH);
  }
}

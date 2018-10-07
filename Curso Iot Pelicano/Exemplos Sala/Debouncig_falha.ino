/*
  Retenção Simples
  Instrução Switch
  IOT na prática com o ESP8266
  https://projetosiot.com.br/

*/


// Definições dos pinos de Entrada e Saída
const int buttonPin = D1;     // D1 = GPIO5 (General Purpose Input/Output) 
const int ledPin =  D4;      // D4 = GPIO2 LEDBuiltin (Cuidado GPIO 16 nao tem esta funcao)

// Definição das variáveis
int buttonState = 0;         // Inicializa a variável buttonState 0
int ledState = 0;            // Inicializa a variável ledState 0

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT); // Incializa o ledPin  como saída
  pinMode(buttonPin, INPUT_PULLUP); // Incializa o buttonPin com PULLUP
  digitalWrite(ledPin, HIGH);
}

void loop() {
  // Leitura do estado do valor do pushbutton
  buttonState = digitalRead(buttonPin);
  // Verifica se o pushbutton está pressionado, se for HIGH:
  if (buttonState == LOW) {
    delay(500);
    switch(ledState){
     case 0:
         digitalWrite(ledPin, HIGH); // Liga o Led (Depende da ligação):
         ledState = 1;
         break;
     case 1:
         digitalWrite(ledPin, LOW);
         ledState = 0;
         break;}
  }
}

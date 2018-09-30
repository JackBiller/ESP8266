/*
  Fading (PWM)
  IOT na prática com o ESP8266
  https://projetosiot.com.br/
*/


// Definições dos pinos de Entrada e Saída
const int ledPin =  D4;      // D4 = GPIO2 LEDBuiltin (Cuidado GPIO 16 nao tem esta funcao)

// Definição das variáveis
String brilho;
int brilho_ue = 1;

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT); // Incializa o ledPin  como saída

}

void loop() {
  //Aguarda digitar valor pela Serial

  if (Serial.available()) {
    brilho = Serial.readString();
    brilho_ue = brilho.toInt(); 
    Serial.print("Valor do Brilho(ue):");
    Serial.println(brilho_ue);
    delay(100);
  }

  for (int i=0; i<=1023; i=i+brilho_ue){
    analogWrite(ledPin, i);
    delay(10);
    Serial.println(i); 
  }

  for (int i=1023; i>=0; i=i-brilho_ue){
    analogWrite(ledPin, i);
    delay(10);
    Serial.println(i); 
  }


}

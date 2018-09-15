/**
 * IOT na prética com ESP8266
 * Leitura analógica com LDR
 */

int sensorPin = A0;                                               // Definições dos pinoe de entradas e saidas
int analogValue = 0;                                              // Definições das variáveis

void setup() {
  Serial.begin(115200);                                           // Inicia Serial na velocidade de 115200
  // pinMode(sensorPin, INPUT);                                      // Define o pino com entrada
}

void loop() {
  analogValue = analogRead(sensorPin);                            // Letura do valor do sensor
  // Serial.print("Entrada Analogica = ");  
  Serial.println(analogValue/1023.0*100.0);                       // Exibir valor lido
  delay(500);                                                     // Espera meio segundo
}

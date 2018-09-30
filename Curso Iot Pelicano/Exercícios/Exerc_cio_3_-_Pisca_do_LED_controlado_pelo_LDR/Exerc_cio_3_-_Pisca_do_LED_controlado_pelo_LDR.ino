/**
 * Exercício 3 - Pisca do LED controlado pelo LDR
 * By: Jack Biller
 */

#define LDR A0                                                  // Definição do pino do LDR
#define LED D4                                                  // Definição do pino do LED
int   esperaPLeitura = 10,                                      // Espera que há em cada leitura
      statusLED      = 0,                                       // Controle de acender ou apagar o LED
      esperaAtual    = 0;                                       // Acumular o tempo decorrido de cada leitura
float valorAnalog    = 0;                                       // Armazena o valor de leitura do LDR

void setup() {
  Serial.begin(115200);                                         // Iniciar a Serial
  pinMode(LED, OUTPUT);                                         // Iniciar o pino do LED como saída
}

void loop() {
  if((leitura() * 100 / 2000) <= 10){                           // Se o valor de luminosidade for menor que 10% manterá o LED acesso
    digitalWrite(LED, LOW);                                     // Muda o status do LED para Ligado
    esperaAtual = 0;                                            // Zera o tempo de espra para piscar o LED novamente
  } else if(esperaAtual >= valorAnalog){                        // Caso o valor seja maior que 10% e maior ou igual que o tempo de espera muda status
    digitalWrite(LED, (statusLED = statusLED == 1 ? 0 : 1));    // Muda o status do LED para Ligado ou Desligado
    esperaAtual = 0;                                            // Zera o tempo de espra para piscar o LED novamente
  }
  delay(esperaPLeitura);                                        // Espera fazer a próxima leitura
  esperaAtual += esperaPLeitura;                                // Acumula o tempo de espera por leitura
}

float leitura(){                                                // Realiza, imprime e retorna a leitura do LDR
  Serial.println(valorAnalog = analogRead(LDR)/1023.0*100.0);
  return (valorAnalog = valorAnalog * 2000 / 100);
}
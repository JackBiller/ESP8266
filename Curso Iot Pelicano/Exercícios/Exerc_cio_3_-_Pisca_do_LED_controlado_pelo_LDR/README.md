# Exercício 3 - Pisca do LED controlado pelo LDR


## Exemplo do Github:

	/**
	 * Exercicio 03
	 * Software para controle do Tempo de Pisca do LED 
	 */

	int tempo = 0;                                  // Valor Tempo do led 
	int sensorPin = A0;                             // Definindo A0 Entrada Analógica       
	const int ledPin = D4;                          // D4 = GPIO2 LEDBuiltin
	int analogValue = 0 ;                           // Inicializa Variável Valor Entrada Analógica

	void setup() {   
	  Serial.begin(115200);                         // Inicializa a serial
	  pinMode(ledPin, OUTPUT);                      // Incializa o ledPin  como saída
	}

	void loop() {
	  Serial.print("Valor LDR em % =");             // Print Valor LDR em Porcentagem na Serial
	  Serial.println(analogValue*100.0/1023.0);     // Print Valor em % da Entrada Analógica LDR na Serial
	  analogValue = analogRead(sensorPin);          // Lendo Entrada Analógica
	  tempo = map(analogValue, 0, 1023, 0, 2000);   // Converte e atribui para a variavel "tempo" o valor lido no LDR 
	  Serial.print("Valor tempo em mseg =");        // Print Valor LDR em Porcentagem na Serial
	  Serial.println(tempo);                        // Print Valor em % da Entrada Analógica LDR na Serial  
	  if (tempo>10) { 
	    digitalWrite(ledPin, LOW);                  // Liga LED
	    delay(tempo);                               // Tempo Ligado  
	    digitalWrite(ledPin,HIGH);                  // Desliga LED
	    delay(tempo);                               // Tempo Desligado
	  } else {
	      digitalWrite(ledPin,HIGH);                // Desliga LED
	  }
	}



## Adaptações:

Defini as variáveis do LED e do LDR como constantes

	#define LDR A0 // Definição do pino do LDR
	#define LED D4 // Definição do pino do LED

	
Utilizei outras variáveis

	int   esperaPLeitura = 10,
	      statusLED      = 0,
	      esperaAtual    = 0;
	float valorAnalog    = 0;


Adaptei uma função a parte para realizar a leitura analógica

	float leitura(){
	  Serial.println(valorAnalog = analogRead(LDR)/1023.0*100.0);
	  return (valorAnalog = valorAnalog * 2000 / 100);
	}


### No loop:

Simplifiquei um pouco a parte de piscar o LED e adaptei para ter uma mudança mais dinâmica como se estivesse rodando a leitura do LDR em 2º plano

	if((leitura() * 100 / 2000) <= 10){
	  digitalWrite(LED, LOW);
	  esperaAtual = 0;
	} else if(esperaAtual >= valorAnalog){
	  digitalWrite(LED, (statusLED = statusLED == 1 ? 0 : 1));
	  esperaAtual = 0;
	}
	delay(esperaPLeitura);
	esperaAtual += esperaPLeitura;
# Exercicio 4 - DHT11 em graus Celsius, Fahrenheit, Kelvin junto com o LDR

## Código

	/**
	 * Exercicio 4 - DHT11 em graus Celsius, Fahrenheit, Kelvin junto com o LDR
	 * by: Jack Biller
	 */

	#include <SimpleDHT.h>                                                              // Inclui a biblioteca do DHT11
	int pinDHT11 = D1;                                                                  // Pino onte está conectado o DHT11
	SimpleDHT11 dht11(pinDHT11);                                                        // Objeto da biblioteca
	float analogValue = 0;                                                              // Valor lido do LDR
	String valorImprimir;                                                               // Valor que irá imprimir as informações

	void setup() {
	  Serial.begin(115200);                                                             // Incica a Serial
	}

	void loop() {
	  analogValue = analogRead(A0);                                                     // Letura do valor do LDR
	  analogValue /= 1023.0; analogValue *= 100.0;
	  delay(500);                                                                       // Espra 500 milisegundos
	  byte temperatura = 0, umidade = 0;                                                // Variaveis que armazena os valores de leitura
	  int err = SimpleDHTErrSuccess;                                                    // Variavel de erro do DHT11
	  if ((err = dht11.read(&temperatura, &umidade, NULL)) != SimpleDHTErrSuccess) {    // Verfica se há erro na leitura e armazena os valores
	    Serial.print("Leitua DHT11 com falha, err=");                                   // Imprime o erro
	    Serial.println(err);
	    delay(1000); return;                                                            // Espera 1 segundo e tenta fazer nova leitura
	  }
	  // imprimirSeriral(temperatura, umidade);                                            // Mostrar valores na Serial Monitor
	  imprimirPlotter(temperatura, umidade);                                            // Moostrar valores no Plotter
	  delay(4000);                                                                      // Espera 4 segundos
	}

	void imprimirSeriral(byte temperatura, byte umidade){
	  Serial.println("\n=================================");
	  Serial.print("LDR = ");             Serial.print((int) analogValue);              // Imprime o valor lido no LDR
	  Serial.print("%\nTemperatura = ");  Serial.print((int) temperatura);              // Imprime o valor da temperatura em ºC
	  Serial.print("*C\nTemperatura = "); Serial.print((((int)temperatura*9)/5)+32);    // Imprime o valor da temperatura em ºF
	  Serial.print("*F\nTemperatura = "); Serial.print((int)temperatura + (int)273);    // Imprime o valor da temperatura em K
	  Serial.print("K\nUmidade = ");      Serial.print((int)umidade);                   // Imprime o valor da umidade
	  Serial.print("%");
	}

	void imprimirPlotter(byte temperatura, byte umidade){
	  Serial.print((int) analogValue);                                                  // Imprime o valor lido no LDR
	  Serial.print(" ");                                                                // Próximo valor  
	  Serial.print((int) temperatura);                                                  // Imprime o valor da temperatura em ºC
	  Serial.print(" ");                                                                // Próximo valor
	  Serial.print((((int)temperatura*9)/5)+32);                                        // Imprime o valor da temperatura em ºF
	  Serial.print(" ");                                                                // Próximo valor
	  Serial.print((int)temperatura + (int)273);                                        // Imprime o valor da temperatura em K
	  Serial.print(" ");                                                                // Próximo valor
	  Serial.println((int)umidade);                                                     // Imprime o valor da umidade
	}


## Imagens

### Valor impresso na Serial

<img src="Print Serial.png" width="70%">
<br><br>

### Gráfico Plotter

<img src="grafico Plotter.png" width="50%">
<br><br>

### Montagem Física

<img src="montagem.jpeg" width="50%">
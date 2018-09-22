/*
  Conexão AP - WebServer
 IOT na prática com o ESP8266
  https://github.com/esp8266/Arduino/tree/master/doc/esp8266wifi
  http://tomeko.net/online_tools/cpp_text_escape.php?lang=en
*/

#include <SimpleDHT.h>
#include <ESP8266WiFi.h>

const char *ssid = "SSID"; //Nome do AP a ser conectado
const char *password = "SENHA"; //Senha do AP

int pinDHT11 = D1; // Pino onte está conectado o DHT11
SimpleDHT11 dht11(pinDHT11);

//Configura o WifiServer
WiFiServer servidor(80);

void setup() {
  Serial.begin(115200);
  Serial.println();

  //Conectando no AP
  WiFi.begin(ssid, password);
  Serial.print("Conectando");

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  
  IPAddress MeuIP = WiFi.localIP();
  Serial.print("Endereço AP : ");
  Serial.println(MeuIP);

  /*Start WebServer*/
  servidor.begin();

}

void loop() {

  WiFiClient client = servidor.available();
  
  if (client){
    
      Serial.println("Novo Cliente");

      digitalWrite(D4, HIGH); //Pisca
      delay(500);
      byte temperatura = 0;
      byte umidade = 0;
      int err = SimpleDHTErrSuccess;

      String pagina = "";


      if ((err = dht11.read(&temperatura, &umidade, NULL)) != SimpleDHTErrSuccess) {
        Serial.print("Leitua DHT11 com falha, err="); 
        Serial.println(err);
        pagina += "{\"debug\":\"Error: ";
        pagina += err;
        pagina += "\"}";
        client.print(pagina);
        delay(1000);
        return;
      }
  
      pagina = "{\"temp\": ";
      pagina += temperatura;
      pagina += ",\"umid\": ";
      pagina += umidade;
      pagina += ",\"debug\":\"OK\"}";
    
      /* Página HTML */
 
      /*pagina += "<!doctype html>\n<html lang=\"pt-BR\">";
      pagina += "<html>";
      pagina +=   "<head>";
      pagina +=     "<meta charset=\"utf-8\">";
      pagina +=     "<title>Curso ESP8266 na Prática</title>";
      pagina +=   "</head>";
      pagina +=   "<body>";
      pagina +=     "<h1>Parabéns</h1>";
      pagina +=     "<h2>Você está conectado no webserver do ESP8266 </h2>";
      pagina +=     "<h2>ESP8266 no modo AP<h2>";
      pagina +=     "<h2>";
      pagina +=         "DHT11 : <br>";
      pagina +=         "Temperatura: ";
      pagina +=         temperatura;
      pagina +=         "ºC<br>Umidade: ";
      pagina +=         umidade;
      pagina +=     "%<h2>";
      pagina +=   "</body>";
      pagina += "</html>";*/


      // Envia a página para o browser
      client.print(pagina);

      delay(1000);
  }
  
}
/*
  Conexão wifimanager - WebServer
  IOT na prática com o ESP8266
  https://github.com/esp8266/Arduino/tree/master/doc/esp8266wifi
  http://tomeko.net/online_tools/cpp_text_escape.php?lang=en
*/

#include <ESP8266WiFi.h>          //ESP8266 Core WiFi Library (you most likely already have this in your sketch)
#include <DNSServer.h>            //Local DNS Server used for redirecting all requests to the configuration portal
#include <ESP8266WebServer.h>     //Local WebServer used to serve the configuration portal
#include <WiFiManager.h>          //https://github.com/tzapu/WiFiManager WiFi Configuration Magic

const char *ssid = "TP-LINK_D745C2"; //Node do SSID a ser transmitido
const char *password = "2012c@s@X"; //Senha

WiFiServer servidor(80);


void setup() {
  
  Serial.begin(115200);
  Serial.println();

  WiFiManager wifiManager;
  wifiManager.autoConnect(ssid, password);

 
  /*Start WebServer*/
  servidor.begin();

}

void loop() {

  WiFiClient client = servidor.available();
  
  if (client){
    
      Serial.println("Novo Cliente");
     
      String pagina = "";
    
      /* Página HTML */
 
      pagina += "<!doctype html>\n<html lang=\"pt-BR\">\n    <head>\n        <meta charset=\"utf-8\">\n        <title>Curso ESP8266 na Prática</title>\n    </head>\n\n    <body>\n        <h1>Parabéns</h1>\n\t<h2>Você está conectado no webserver do ESP8266 </h2>\n\t<h2>ESP8266 no modo AP<h2>\n<p> Pelicano 2018 </p>\n\n    </body>\n</html>\n";

      // Envia a página para o browser
      client.print(pagina);
  }
  
}

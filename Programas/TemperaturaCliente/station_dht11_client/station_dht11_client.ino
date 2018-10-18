/**
   BasicHTTPClient.ino
   Created on: 24.05.2015
*/

#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <SimpleDHT.h>

ESP8266WiFiMulti WiFiMulti;

// String servidorExt = "http://192.168.1.102";
String servidorExt = "http://www.cdiinfo.com.br/admin";

const char *ssid = "ssid"; //Nome do AP a ser conectado
const char *password = "password"; //Senha do AP

int pinDHT11 = D1; // Pino onte está conectado o DHT11
SimpleDHT11 dht11(pinDHT11);

void setup() {
  //WiFiManager wifiManager;
  //wifiManager.autoConnect(ssid, password);
  
  Serial.begin(115200);
  Serial.print("Teste");
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
  /*WiFi.mode(WIFI_STA);
  WiFiMulti.addAP("SSID", "PASSWORD");*/
}

void loop() {
  // wait for WiFi connection
  if ((WiFiMulti.run() == WL_CONNECTED)) {
    HTTPClient http;

    delay(500);
    byte temperatura = 0;
    byte umidade = 0;
    int err = SimpleDHTErrSuccess;

    if ((err = dht11.read(&temperatura, &umidade, NULL)) != SimpleDHTErrSuccess) {
      Serial.print("Leitua DHT11 com falha, err="); 
      Serial.println(err);
      /* pagina += "{\"debug\":\"Error: ";
      pagina += err;
      pagina += "\"}";
      client.print(pagina); */
      delay(1000);
      return;
    }

    String url = ""; // "http://";
    url += servidorExt;
    url += "/esp8266_dht11/controllers/controllerDht11.php?gravar=true&id=";
    url += 1;
    url += "&umid=";
    url += umidade;
    url += "&temp=";
    url += temperatura;
    url += "&usu=3";
    Serial.println(url);

    Serial.print("[HTTP] begin...\n");
    // configure traged server and url
    // http.begin("https://192.168.1.12/test.html", "7a 9c f4 db 40 d3 62 5a 6e 21 bc 5c cc 66 c8 3e a1 45 59 38"); //HTTPS
    // http.begin("http://192.168.1.102/esp8266_dht11/ping.php"); //HTTP
    http.begin(url);

    Serial.print("[HTTP] GET...\n");
    // start connection and send HTTP header
    int httpCode = http.GET();

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] GET... code: %d\n", httpCode);

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        String payload = http.getString();
        Serial.println(payload);
      }
    } else {
      Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();
  }
  delay(10000);
}

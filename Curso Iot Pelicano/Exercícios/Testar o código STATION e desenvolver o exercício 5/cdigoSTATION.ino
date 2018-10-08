/*
  Conexão AP - Liga/Desliga Led D4
  IOT na prática com o ESP8266
  https://github.com/esp8266/Arduino/tree/master/doc/esp8266wifi
*/
#include <ESP8266WiFi.h>
const char *ssid = "TP-LINK_D745C2"; //Node do SSID a ser transmitido
const char *password = "2012c@s@X"; //Senha
WiFiServer servidor(80);

void setup() {
  pinMode(D0, OUTPUT); // Incializa o ledPin  como saída
  pinMode(D1, OUTPUT); // Incializa o ledPin  como saída
  Serial.begin(115200);
  Serial.println();
  Serial.println("Configurando o AP ...");
  WiFi.begin(ssid, password);
  
  /* Start do AP*/
  while (WiFi.status() != WL_CONNECTED){
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
      String pagina = "";
      /* Página HTML */
      pagina +=   "<!doctype html>";
      pagina +=   "<html lang=\"pt-BR\">";
      pagina +=     "<head>";
      pagina +=       "<meta charset=\"utf-8\">";
      pagina +=       "<title>Curso ESP8266 na Prática</title>";
      pagina +=     "</head>";
      pagina +=     "<body>";
      pagina +=       "<h1>Comando Liga/Desliga LED</h1>";
      pagina +=       "<p>LED D0";
      pagina +=         "<a href=?function=d0_on><button>LIGA</button></a>";
      pagina +=         "<a href=?function=d0_off><button>DESLIGA</button></a>";
      pagina +=       "</p>";
      pagina +=       "<p>LED D1";
      pagina +=         "<a href=?function=d1_on><button>LIGA</button></a>";
      pagina +=         "<a href=?function=d1_off><button>DESLIGA</button></a>";
      pagina +=       "</p>";
      pagina +=     "</body>";
      pagina +=   "</html>";

      String req = client.readStringUntil('\r');
      if (req.indexOf("d0_on") != -1) digitalWrite(D0, HIGH);
      if (req.indexOf("d0_off") != -1) digitalWrite(D0, LOW);
      if (req.indexOf("d1_on") != -1) digitalWrite(D1, HIGH);
      if (req.indexOf("d1_off") != -1) digitalWrite(D1, LOW);
      client.print(pagina);
  }
  // client.stop();
}

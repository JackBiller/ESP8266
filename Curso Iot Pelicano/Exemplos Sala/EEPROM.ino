#include <EEPROM.h>

byte memoria;
int comando;

void setup() {
  Serial.begin(115200);
  EEPROM.begin(1);
}

void loop() {

  if (Serial.available()>0)
  {
    comando = Serial.parseInt();

    if (comando==1)
    {
      memoria = Serial.parseInt();
      EEPROM.write(0, memoria);
      EEPROM.commit();
    }
    if (comando==2){
      memoria = EEPROM.read(0);
      Serial.println(memoria);
    }
    
  }

}

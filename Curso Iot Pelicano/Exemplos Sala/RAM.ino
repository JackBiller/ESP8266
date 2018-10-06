byte memoria;
int comando;

void setup() {
  Serial.begin(115200);
}

void loop() {
  if (Serial.available()>0){
    comando = Serial.parseInt();
    if (comando==1) memoria = Serial.parseInt();
    if (comando==2) Serial.println(memoria);
  }
} 

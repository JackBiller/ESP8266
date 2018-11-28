int leds[] = {10, 11, 12, 13};
bool impar = false;

void setup(){
	for(int i = 0; i < sizeof(leds); i++) pinMode(leds[i], OUTPUT);
}

void loop(){
	for(int i = 0; i < sizeof(leds); i++) 
		digitalWrite(leds[i], ((!(impar = !impar) && leds[i] % 2 == 0) || (impar && leds[i] % 2 != 0) ? HIGH : LOW));
	delay(1000);
}
// Programa : Scrool horizontal com matriz de leds 8x8  
// Baseado no livro Arduino Basico, de Michael McRoberts  
// Alterações e comentários : Arduino e Cia  

#include <pgmspace.h>
#include <TimerOne.h>

int DataPin  = 4;  //Ligar o pino 4 do Arduino ao DIN do modulo
int ClockPin = 5;  //Ligar o pino 5 do Arduino ao CLK do módulo
int LoadPin  = 6;  //Ligar o pino 6 do Arduinio ao pino CS/Load do módulo

byte buffer[8];



void clearDisplay(){
	for (byte x=0; x<8; x++){
		buffer[x] = B00000000;
	}
	screenUpdate();
}

void initMAX7219(){
	pinMode(DataPin, OUTPUT);
	pinMode(LoadPin, OUTPUT);
	pinMode(ClockPin, OUTPUT);
	clearDisplay();
	writeData(B00001011, B00000111);
	writeData(B00001001, B00000000);
	writeData(B00001100, B00000001);
	intensity(1);
}

void intensity(int intensity){
	writeData(B00001010, intensity);
}

void writeData(byte MSB, byte LSB){
	byte mask;
	digitalWrite(LoadPin, LOW);

	for (mask = B10000000; mask>0; mask >>= 1){
		digitalWrite(ClockPin, LOW);
		if (MSB & mask){
			digitalWrite(DataPin,HIGH);
		} else {
			digitalWrite(DataPin,LOW);
		}
		digitalWrite(ClockPin, HIGH);
	}

	for (mask = B10000000; mask>0; mask >>= 1){
		digitalWrite(ClockPin, LOW);
		if (LSB & mask){
			digitalWrite(DataPin,HIGH);
		} else {
			digitalWrite(DataPin,LOW);
		}
		digitalWrite(ClockPin, HIGH);
	}
	digitalWrite(LoadPin, HIGH);
	digitalWrite(ClockPin, LOW);
}

void scroll(char myString[], int speed){
	byte firstChrRow, secondChrRow;
	byte ledOutput;
	byte chrPointer = 0;
	byte Char1, Char2;
	byte scrollBit = 0;
	byte strLength = 0;
	unsigned long time;
	unsigned long counter;

	while (myString[strLength]) {strLength++;}
	counter = millis();
	while (chrPointer < (strLength-1)){
		time = millis();
		if (time > (counter + speed)){
			Char1 = myString[chrPointer];
			Char2 = myString[chrPointer+1];
			for (byte y= 0; y<8; y++){
				firstChrRow = pgm_read_byte(&font[Char1 - 32][y]);
				secondChrRow = (pgm_read_byte(&font[Char2 - 32][y])) << 1;
				ledOutput = (firstChrRow << scrollBit) | (secondChrRow >> (8 - scrollBit) );
				buffer[y] = ledOutput;  
			}
			scrollBit++;
			if (scrollBit > 6){
				scrollBit = 0;
				chrPointer++;
			}
			counter = millis();
		}
	}
}

void screenUpdate(){
   for (byte row = 0; row < 8; row++){
	  writeData(row+1, buffer[row]);
   }
}

void setup(){
   initMAX7219();
   Timer1.initialize(10000);
   Timer1.attachInterrupt(screenUpdate);
}  
  
void loop(){
   clearDisplay();
   //Exibe a mensagem, com intervalo de scroll de 100
   scroll(" Arduino e Cia ", 100);
   //Adicione mais linhas para mostrar outros caracteres
   scroll(" - 2013 ", 100);
}
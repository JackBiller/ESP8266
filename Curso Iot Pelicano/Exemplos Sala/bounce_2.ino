/* 
 DESCRIPTION
 ====================
 Simple example of the Bounce library that switches the debug LED when a button is pressed.
 */
// Include the Bounce2 library found here :
// https://github.com/thomasfredericks/Bounce2
#include <Bounce2.h>
#define BUTTON_PIN D3
#define LED_PIN D4
int ledStatus = LOW;
// Instantiate a Bounce object
Bounce debouncer = Bounce(); 

void setup() {
  // Setup the button with an internal pull-up :
  pinMode(BUTTON_PIN,INPUT_PULLUP);
  // After setting up the button, setup the Bounce instance :
  debouncer.attach(BUTTON_PIN);
  debouncer.interval(5); // interval in ms
  //Setup the LED :
  pinMode(LED_PIN,OUTPUT);
  Serial.begin(115200);
}

void loop() {
  // Update the Bounce instance :
  debouncer.update();
  // Get the updated value :
  int value = debouncer.read();
  Serial.println(value);
  if(debouncer.fell()){
    ledStatus = !ledStatus;
    digitalWrite(LED_PIN, ledStatus);
  }
}

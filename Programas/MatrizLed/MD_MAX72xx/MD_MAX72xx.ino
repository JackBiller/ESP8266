// Programa : Painel de leds com modulo Max7219
// Adaptacoes e comentarios : Arduino e Cia

// Carrega a biblioteca MD_MAX72xx
#include <MD_MAX72xx.h>

// Numero de modulos utilizados
#define     MAX_DEVICES       1

// Ligacoes ao Arduino
#define     DATA_PIN          4
#define     CS_PIN            5
#define     CLK_PIN           6

MD_MAX72XX mx = MD_MAX72XX(DATA_PIN, CLK_PIN, CS_PIN, MAX_DEVICES);

// Velocidade do scroll
#define     SCROLL_DELAY      2000
// Colunas entre cada caracter
#define     CHAR_SPACING      1
#define     BUF_SIZE          75
char curMessage[BUF_SIZE];
char newMessage[BUF_SIZE];

// int scrollDelay;

uint8_t scrollDataSource(uint8_t dev, MD_MAX72XX::transformType_t t){
  static char        *p = curMessage;
  static uint8_t     state = 0;
  static uint8_t     curLen, showLen;
  static uint8_t     cBuf[8];
  uint8_t colData;

  switch(state){
  case 0:
    showLen = mx.getChar(*p++, sizeof(cBuf)/sizeof(cBuf[0]), cBuf);
    curLen = 0;
    state++;
    if (*p == '\0'){
      p = curMessage;
    }
  case 1:
    colData = cBuf[curLen++];
    if (curLen == showLen){
      showLen = CHAR_SPACING;
      curLen = 0;
      state = 2;
    }
    break;
  case 2:
    colData = 0;
    curLen++;
    if (curLen == showLen)
      state = 0;
    break;
    default:
    state = 0;
  }
  return(colData);
}

void scrollText(void){
  static uint32_t     prevTime = 0;
  if (millis()-prevTime >= SCROLL_DELAY){
    mx.transform(MD_MAX72XX::TSR);
    prevTime = millis();
  }
}

void setup(){
  mx.begin();
  mx.setShiftDataInCallback(scrollDataSource);
  // Define o nivel de luminosidade
  mx.control(MD_MAX72XX::INTENSITY, 4);
  // Mensagem a ser exibida
  strcpy(curMessage, " Pelicano ");
  newMessage[0] = '\0';
}

void loop(){
  scrollText();
}
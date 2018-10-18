// Programa : Controle motor de passo 
// Autor : Cleyton Santos
   
#include <CustomStepper.h> //Biblioteca Motor de Passo
// #include <LiquidCrystal.h> //Biblioteca Display de Cristal Líquido
#include <Servo.h>

#define SERVO_PIN 46 // Porta Digital 46 PWM

Servo servo; // Variável Servo
int pos; // Posição Servo (não está usando)

//Define os parametros de ligacao do Display de Cristal Líquido
// LiquidCrystal lcd(8, 9, 4, 5, 6, 7);

//Define os parametros de ligacao do motor de passo lado esquerdo 
CustomStepper stepperE(22, 24, 26, 28, (byte[]){4, B1000, B0100, B0010,  
B0001}, 200, 60, CW);

//Define os parametros de ligacao do motor de passo lado direito  
CustomStepper stepperD(31, 33, 35, 37, (byte[]){4, B1000, B0100, B0010, 
B0001}, 200, 60, CW); 

boolean avancando = false;
boolean recuando = false;

//Define caminho pela rampa (default)
int caminho = 0;  //0-Rampa / 1-Caminho Livre / 2-Costela 

int botao; 


int time_delay = 500;                           // Define o tempo entre fases [ms]
int ang_dir = 855;                              // Define o angulo de rotação diretira [graus]
int ang_esq = 855;                              // Define o angulo de rotação esquerda [graus]

const int IN1_PH = 40;                          // Pino IN1 ponte H controle da gaveta
const int IN2_PH = 42;                          // Pino IN2 ponte H controle da gaveta
const int IN3_PH = 44;                          // Pino IN3 ponte H controle da gaveta
const int IN4_PH = 46;                          // Pino IN4 ponte H controle da gaveta

const int GAV_AVANC = 48;                       // Chave fim de curso gaveta. 0-Avancada. 1-Nao avancada
const int GAV_REC = 50;                         // Chave fim de curso gaveta. 0-Nao recuada. 1-Recuada

int GAV_AVANC_ST = 0;                           //Status da chave de gaveta avançada
int GAV_REC_ST = 0;                             //Status da chave de gaveta recuada


/* Variaveis Jack */
int faseAtual = 0;
int referencia90 = 200;
boolean fimPercurso = false;

int anguloRetoServo = 90;
int anguloLateralServo = 0;
int time_servo = 250;                           // tempo para o servo mudar a posição

void setup(){  
  servo.attach(SERVO_PIN);
  servo.write(90);                              // Inicia motor posição zero
  
  stepperE.setRPM(50);                          // Define a velocidade do motor
  stepperE.setSPR(200);                         // Define o numero de passos por rotacao  

  stepperD.setRPM(50);                          // Define a velocidade do motor
  stepperD.setSPR(200);                         // Define o numero de passos por rotacao

  // lcd.begin(16, 2);                          // Inicia display LCD

  pinMode(IN1_PH, OUTPUT);                      // inicializa pino 0 como saida ponte H da gaveta
  pinMode(IN2_PH, OUTPUT);                      // inicializa pino 1 como saida ponte H da gaveta
  pinMode(IN3_PH, OUTPUT);                      // inicializa pino 0 como saida ponte H da gaveta
  pinMode(IN4_PH, OUTPUT);                      // inicializa pino 1 como saida ponte H da gaveta

  pinMode(GAV_AVANC, INPUT);                    // inicializa pino gaveta avancada como entrada
  digitalWrite(GAV_AVANC, HIGH);                // ativa resistor de pull-up
  pinMode(GAV_REC, INPUT);                      // inicializa pino gaveta recuada como entrada
  digitalWrite(GAV_REC, HIGH);                  // ativa resistor de pull-up

  Serial.begin(9600);                           // open the serial port at 9600 bps:
  // lcd.setCursor(0,1);  
  // lcd.print("Tecla :");  
}  
   
void loop(){
  if(fimPercurso) return false;
  //Transição Fase 0 para Fase 1
  botao = analogRead(0);                        // Leitura do valor da porta analógica A0

<<<<<<< HEAD
  //ETAPA FASE 00 
=======
  // ETAPA FASE 00 
>>>>>>> 367a0f39274f00f0a394d6841c3317c92ab5c15b
  printFase("Ajuste do Servo");
  ajusteServo('R');                             // SERVO EM 90º (POSIÇÃO DELE RETO PARA IR PARA FRENTE)

  // ETAPA FASE 01
  printFase("Andar para frente");
  frente(810);

  // ETAPA FASE 02
  printFase("Virar 90 graus");
  virar('D', 1);

  // ETAPA FASE 03
  printFase("Andar para frente");
  frente(810);

  // ETAPA FASE 04
  printFase("Virar 90 graus");
  virar('D', 1);

  // ETAPA FASE 05
  printFase("Andar para frente");
  frente(810);

  // ETAPA FASE 06
  printFase("Virar 90 graus");
  virar('E', 1);

  // ETAPA FASE 07
  printFase("Andar para frente");
  frente(810);

  fimPercurso = true;                           // FIM PROGRAMA
}


void frente(float graus){
  /*
    -- Mandar a medida em cm e converter em graus --
  */
  andar(graus, "CW", "CW");
}

void virar(char sentido, float multiplicador){
  ajusteServo('L');
  float graus = referencia90 * multiplicador;
       if(sentido == 'D' || sentido == 'd') andar(graus, "CCW", "CW");
  else if(sentido == 'E' || sentido == 'e') andar(graus, "CW", "CCW");
  ajusteServo('R');
}

void andar(int graus, String motorE, String motorD){
  stepperE.setDirection(motorE == "CW" ? CW : CCW);     // Define o sentido de rotacao
  stepperE.rotateDegrees(graus);                        // Define o numero de rotacoes
  stepperD.setDirection(motorD == "CW" ? CW : CCW);     // Define o sentido de rotacao
  stepperD.rotateDegrees(graus);                        // Define o numero de rotacoes
  delay(time_delay);
  carregando();
}

void ajusteServo(char posicao){
  servo.write((posicao == 'R' || posicao == 'r' ? anguloRetoServo : anguloLateralServo));
  delay(time_servo);
}

void carregando(){
  Serial.print("\nCarregando: ");
  while(!stepperE.isDone() || !stepperD.isDone()){
    Serial.print("."); 
    delay(50); 
  }
  Serial.println("\nPronto!");
}

void printFase(String complemento){
  Serial.print("\nFASE ");
  Serial.println(faseAtual);
  if(complemento != "") Serial.println(complemento);
  faseAtual++;
}
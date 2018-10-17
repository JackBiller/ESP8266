 /*
//Transição Fase 2 para Fase 3
  if (stepperE.isDone() && stepperD.isDone() && FASE2 == true && FASED_0 == true)
  {
FASE2 = false;
FASED_0 = false;
FASE3 = true;
s.write(90);
  }  

 //ETAPA FASE 03
if (stepperE.isDone() && stepperD.isDone() && FASE3 == true && FASE3_2 == false)
{
//Exibe mensagem FASE 3 no display 
Serial.println("FASE 3");
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);
//Define o numero de rotacoes
stepperE.rotateDegrees(570); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotateDegrees(570); 
FASED_0 = true;
FASE3_2 = true;
}

//Transição Fase 3 para Fase 4
  if (stepperE.isDone() && stepperD.isDone() && FASE3 == true && FASE3_2 == true)  
  {  
FASE3 = false;
FASE3_2 = false;
FASE4 = true;
  } 

 //ETAPA FASE 04
if (stepperE.isDone() && stepperD.isDone() && FASE4 == true)
{
//Exibe mensagem FASE 4 no display 
Serial.println("FASE 4");
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CCW);  
//Define o numero de rotacoes  
stepperE.rotateDegrees(735); 
//Define o sentido de rotacao 
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotateDegrees(735);
}

//Transição Fase 4 para Fase 5
  if (stepperE.isDone() && stepperD.isDone() && FASE4 == true && FASED_0 == true)  
  {  
FASE4 = false;
FASED_0 = false;
FASE5 = true;
  }  

 //ETAPA FASE 05
if (stepperE.isDone() && stepperD.isDone() && FASE5 == true && FASE5_2 == false)
{
//Exibe mensagem FASE 5 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 5");
s.write(90); // Inicia motor posição zero
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotate(5); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotate(5);
FASE5_2 = true;
}

//Transição Fase 5 para Fase 6
  if (stepperE.isDone() && stepperD.isDone() && FASE5 == true && FASE5_2 == true)  
  {  
FASE5 = false;
FASE5_2 = false;
FASE6 = true;
  } 

 //ETAPA FASE 06
if (stepperE.isDone() && stepperD.isDone() && FASE6 == true)
{
//Exibe mensagem FASE 6 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 6");
curvaE();
}

//Transição Fase 6 para Fase 7
  if (stepperE.isDone() && stepperD.isDone() && FASE6 == true && FASEE_0 == true)  
  {  
FASE6 = false;
FASEE_0 = false;
FASE7 = true;
  } 

 //ETAPA FASE 07
if (stepperE.isDone() && stepperD.isDone() && FASE7 == true && FASE7_2 == false)
{
//Exibe mensagem FASE 7 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 7");
s.write(90); // Inicia motor posição zero
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotateDegrees(1620); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotateDegrees(1620);
FASE7_2 = true;
}

//Transição Fase 7 para Fase 8
  if (stepperE.isDone() && stepperD.isDone() && FASE7 == true && FASE7_2 == true)  
  {  
FASE7 = false;
FASE7_2 = false;
FASE8 = true;
  } 

 //ETAPA FASE 8
if (stepperE.isDone() && stepperD.isDone() && FASE8 == true)
{
//Exibe mensagem FASE 8 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 8");
curvaE();
}

//Transição Fase 8 para Fase 9
  if (stepperE.isDone() && stepperD.isDone() && FASE8 == true && FASEE_0 == true)  
  {  
FASE8 = false;
FASEE_0 = false;
FASE9 = true;
  } 

 //ETAPA FASE 09
if (stepperE.isDone() && stepperD.isDone() && FASE9 == true && FASE9_2 == false)
{
//Exibe mensagem FASE 9 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 9");
s.write(90); // Inicia motor posição zero
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotateDegrees(1800); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotateDegrees(1800);
FASE9_2 = true;
}

//Transição Fase 9 para Fase 10
  if (stepperE.isDone() && stepperD.isDone() && FASE9 == true && FASE9_2 == true)  
  {  
FASE9 = false;
FASE9_2 = false;
FASE10 = true;
  }

 //ETAPA FASE 10
if (stepperE.isDone() && stepperD.isDone() && FASE10 == true)
{
//Exibe mensagem FASE 10 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 10");
ang_dir = 828;
curvaD();
}

//Transição Fase 10 para Fase 11
  if (stepperE.isDone() && stepperD.isDone() && FASE10 == true && FASED_0 == true)  
  {  
FASE10 = false;
FASED_0 = false;
FASE11 = true;
  }  

 //ETAPA FASE 11
if (stepperE.isDone() && stepperD.isDone() && FASE11 == true && FASE11_2 == false)
{
//Exibe mensagem FASE 11 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 11");
s.write(90); // Inicia motor posição zero
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotateDegrees(1620); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotateDegrees(1620);
FASE11_2 = true;
}

//Transição Fase 11 para Fase 12
  if (stepperE.isDone() && stepperD.isDone() && FASE11 == true && FASE11_2 == true)  
  {  
FASE11 = false;
FASE11_2 = false;
FASE12 = true;
  }

 //ETAPA FASE 12
if (stepperE.isDone() && stepperD.isDone() && FASE12 == true)
{
//Exibe mensagem FASE 12 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 12");
//ang_dir = 855;
curvaD();
}

//Transição Fase 12 para Fase 13
  if (stepperE.isDone() && stepperD.isDone() && FASE12 == true && FASED_0 == true)  
  {  
FASE12 = false;
FASED_0 = false;
FASE13 = true;
  } 

 //ETAPA FASE 13
if (stepperE.isDone() && stepperD.isDone() && FASE13 == true && FASE13_2 == false)
{
//Exibe mensagem FASE 13 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 13");
s.write(90); // Inicia motor posição zero
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotateDegrees(1170); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotateDegrees(1170);
FASE13_2 = true;
}

//Transição Fase 13 para Fase 14
  if (stepperE.isDone() && stepperD.isDone() && FASE13 == true && FASE13_2 == true)  
  {  
FASE13 = false;
FASE13_2 = false;
FASE14 = true;
  } 

//ETAPA FASE 14
if (stepperE.isDone() && stepperD.isDone() && FASE14 == true)
{
//Exibe mensagem FASE 14 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 14");
ang_esq = 774;
curvaE();
}

//Transição Fase 14 para Fase 15
  if (stepperE.isDone() && stepperD.isDone() && FASE14 == true && FASEE_0 == true && caminho == 0)  
  {  
FASE14 = false;
FASEE_0 = false;
FASE15 = true;
  } 

//ETAPA FASE 15
if (stepperE.isDone() && stepperD.isDone() && FASE15 == true && FASE15_2 == false)
{
//Exibe mensagem FASE 15 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 15");
s.write(90); // Inicia motor posição zero
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotate(22); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotate(22);
FASE15_2 = true;
}

//Transição Fase 15 para Fase 16
  if (stepperE.isDone() && stepperD.isDone() && FASE15 == true && FASE15_2 == true)  
  {  
FASE15 = false;
FASE15_2 = false;
FASE16 = true;
  } 

//ETAPA FASE 16
if (stepperE.isDone() && stepperD.isDone() && FASE16 == true)
{
//Exibe mensagem FASE 16 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 16");
ang_dir = 855;
curvaD();
}

//Transição Fase 16 para Fase 17
  if (stepperE.isDone() && stepperD.isDone() && FASE16 == true && FASED_0 == true)  
  {  
FASE16 = false;
FASED_0 = false;
FASE17 = true;
  } 

 //ETAPA FASE 17
if (stepperE.isDone() && stepperD.isDone() && FASE17 == true && FASE17_2 == false)
{
//Exibe mensagem FASE 17 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 17");
s.write(90); // Inicia motor posição zero
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotate(3); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotate(3);
FASE17_2 = true;
}

//Transição Fase 17 para Fase 18
  if (stepperE.isDone() && stepperD.isDone() && FASE17 == true && FASE17_2 == true)  
  {  
FASE17 = false;
FASE17_2 = false;
FASE18 = true;
  } 

//ETAPA FASE 18
if (stepperE.isDone() && stepperD.isDone() && FASE18 == true)
{
//Exibe mensagem FASE 18 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 18");
ang_esq = 864;
curvaE();
}

//Transição Fase 18 para Fase 19
  if (stepperE.isDone() && stepperD.isDone() && FASE18 == true && FASEE_0 == true)  
  {  
FASE18 = false;
FASEE_0 = false;
FASE19 = true;
  } 

 //ETAPA FASE 19
if (stepperE.isDone() && stepperD.isDone() && FASE19 == true && FASE19_2 == false)
{
//Exibe mensagem FASE 19 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 19");
s.write(90); // Inicia motor posição zero
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotate(5); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotate(5);
FASE19_2 = true;
}

//Transição Fase 19 para Fase 20
  if (stepperE.isDone() && stepperD.isDone() && FASE19 == true && FASE19_2 == true)  
  {  
FASE19 = false;
FASE19_2 = false;
FASE20 = true;
  } 

//ETAPA FASE 20
if (stepperE.isDone() && stepperD.isDone() && FASE20 == true)
{
//Exibe mensagem FASE 20 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 20");
curvaE();
}

//Transição Fase 20 para Fase 21
  if (stepperE.isDone() && stepperD.isDone() && FASE20 == true && FASEE_0 == true)  
  {  
FASE20 = false;
FASEE_0 = false;
FASE21 = true;
  } 

//ETAPA FASE 21 (Avança a gaveta)
if (FASE21 == true)
{
//Exibe mensagem FASE 21 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 21");
}

//Transição Fase 21 para Fase 22
 GAV_AVANC_ST = digitalRead(GAV_AVANC);
//Transição Fase 21 para Fase 22
  if (FASE21 == true && GAV_AVANC_ST == 1)  
  {  
FASE21 = false;
FASE22 = true;
  }

//ETAPA FASE 22
if (stepperE.isDone() && stepperD.isDone() && FASE22 == true && FASE22_2 == false)
{
//Exibe mensagem FASE 22 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 22");
//delay(time_delay); 
s.write(90); // Inicia motor posição zero
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotateDegrees(1890); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotateDegrees(1890);
FASE22_2 = true;
}

//Transição Fase 22 para Fase 23
  if (stepperE.isDone() && stepperD.isDone() && FASE22 == true && FASE22_2 == true)  
  {  
FASE22 = false;
FASE22_2 = false;
FASE23 = true;
  }

//ETAPA FASE 23 (Entrega da bola)
if (FASE23 == true)
{
//Exibe mensagem FASE 23 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 23");
s.write(180);
}

//*****************CAMINHO COSTELA**************************

//Transição Fase 14 para Fase 24
  if (stepperE.isDone() && stepperD.isDone() && FASE14 == true && FASEE_0 == true && caminho == 2)  
  {  
FASE14 = false;
FASEE_0 = false;
FASE24 = true;
  } 

//ETAPA FASE 24
if (stepperE.isDone() && stepperD.isDone() && FASE24 == true && FASE24_2 == false)
{
//Exibe mensagem FASE 24 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 24");
s.write(90); // Inicia motor posição zero
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotate(4); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotate(4);
FASE24_2 = true;
}

//Transição Fase 24 para Fase 25
  if (stepperE.isDone() && stepperD.isDone() && FASE24 == true && FASE24_2 == true)  
  {  
FASE24 = false;
FASE24_2 = false;
FASE25 = true;
  } 

//ETAPA FASE 25
if (stepperE.isDone() && stepperD.isDone() && FASE25 == true)
{
//Exibe mensagem FASE 25 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 25");
ang_esq = 774;
curvaE();
}

//Transição Fase 25 para Fase 26
  if (stepperE.isDone() && stepperD.isDone() && FASE25 == true && FASEE_0 == true)  
  {  
FASE25 = false;
FASEE_0 = false;
FASE26 = true;
  } 

//ETAPA FASE 26
if (stepperE.isDone() && stepperD.isDone() && FASE26 == true && FASE26_2 == false)
{
//Exibe mensagem FASE 26 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 26");
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotate(4); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotate(4);
FASE26_2 = true;
}

//Transição Fase 26 para Fase 27
  if (stepperE.isDone() && stepperD.isDone() && FASE26 == true && FASE26_2 == true)  
  {  
FASE26 = false;
FASE26_2 = false;
FASE27 = true;
  }

//ETAPA FASE 27
if (stepperE.isDone() && stepperD.isDone() && FASE27 == true)
{
//Exibe mensagem FASE 27 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 27");
ang_dir = 828;
curvaD();
}

//Transição Fase 27 para Fase 28
  if (stepperE.isDone() && stepperD.isDone() && FASE27 == true && FASED_0 == true)  
  {  
FASE27 = false;
FASED_0 = false;
FASE28 = true;
  } 

//ETAPA FASE 28
if (stepperE.isDone() && stepperD.isDone() && FASE28 == true && FASE28_2 == false)
{
//Exibe mensagem FASE 28 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 28");
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotate(19); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotate(19);
FASE28_2 = true;
}

//Transição Fase 28 para Fase 29
  if (stepperE.isDone() && stepperD.isDone() && FASE28 == true && FASE28_2 == true)  
  {  
FASE28 = false;
FASE28_2 = false;
FASE29 = true;
  }

//ETAPA FASE 29
if (stepperE.isDone() && stepperD.isDone() && FASE29 == true)
{
//Exibe mensagem FASE 29 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 29");
ang_dir = 828;
curvaD();
}

//Transição Fase 29 para Fase 30
  if (stepperE.isDone() && stepperD.isDone() && FASE29 == true && FASED_0 == true)  
  {  
FASE29 = false;
FASED_0 = false;
FASE30 = true;
  }

//ETAPA FASE 30
if (stepperE.isDone() && stepperD.isDone() && FASE30 == true && FASE30_2 == false)
{
//Exibe mensagem FASE 30 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 30");
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotate(9); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotate(9);
FASE30_2 = true;
}

//Transição Fase 30 para Fase 31
  if (stepperE.isDone() && stepperD.isDone() && FASE30 == true && FASE30_2 == true)  
  {  
FASE30 = false;
FASE30_2 = false;
FASE31 = true;
  } 

//ETAPA FASE 31
if (stepperE.isDone() && stepperD.isDone() && FASE31 == true)
{
//Exibe mensagem FASE 31 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 31");
ang_esq = 774;
curvaE();
}

//Transição Fase 31 para Fase 32
  if (stepperE.isDone() && stepperD.isDone() && FASE31 == true && FASEE_0 == true)  
  {  
FASE31 = false;
FASEE_0 = false;
FASE32 = true;
  }

//ETAPA FASE 32
if (stepperE.isDone() && stepperD.isDone() && FASE32 == true && FASE32_2 == false)
{
//Exibe mensagem FASE 32 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 32");
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotate(5); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotate(5);
FASE32_2 = true;
}

//Transição Fase 32 para Fase 20
  if (stepperE.isDone() && stepperD.isDone() && FASE32 == true && FASE32_2 == true)  
  {  
FASE32 = false;
FASE32_2 = false;
FASE20 = true;
  } 

//*****************CAMINHO LIVRE**************************

//Transição Fase 14 para Fase 33
  if (stepperE.isDone() && stepperD.isDone() && FASE14 == true && FASEE_0 == true && caminho == 1)  
  {  
FASE14 = false;
FASEE_0 = false;
FASE33 = true;
  }
  
//ETAPA FASE 33
if (stepperE.isDone() && stepperD.isDone() && FASE33 == true && FASE33_2 == false)
{
//Exibe mensagem FASE 33 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 33");
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotate(4); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotate(4);
FASE33_2 = true;
}

//Transição Fase 33 para Fase 34
  if (stepperE.isDone() && stepperD.isDone() && FASE33 == true && FASE33_2 == true)  
  {  
FASE33 = false;
FASE33_2 = false;
FASE34 = true;
  }

 //ETAPA FASE 34
if (stepperE.isDone() && stepperD.isDone() && FASE34 == true)
{
//Exibe mensagem FASE 34 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 34");
curvaD();
}

//Transição Fase 34 para Fase 35
  if (stepperE.isDone() && stepperD.isDone() && FASE34 == true && FASED_0 == true)  
  {  
FASE34 = false;
FASED_0 = false;
FASE35 = true;
  }

 //ETAPA FASE 35
if (stepperE.isDone() && stepperD.isDone() && FASE35 == true && FASE35_2 == false)
{
//Exibe mensagem FASE 35 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 35");
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotate(4); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotate(4);
FASE35_2 = true;
}

//Transição Fase 35 para Fase 36
  if (stepperE.isDone() && stepperD.isDone() && FASE35 == true && FASE35_2 == true)  
  {  
FASE35 = false;
FASE35_2 = false;
FASE36 = true;
  } 

//ETAPA FASE 36
if (stepperE.isDone() && stepperD.isDone() && FASE36 == true)
{
//Exibe mensagem FASE 36 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 36");
ang_esq = 774;
curvaE();
}

//Transição Fase 36 para Fase 37
  if (stepperE.isDone() && stepperD.isDone() && FASE36 == true && FASEE_0 == true)  
  {  
FASE36 = false;
FASEE_0 = false;
FASE37 = true;
  } 

 //ETAPA FASE 37
if (stepperE.isDone() && stepperD.isDone() && FASE37 == true && FASE37_2 == false)
{
//Exibe mensagem FASE 37 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 37");
delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotate(22); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotate(22);
FASE37_2 = true;
}

//Transição Fase 37 para Fase 38
  if (stepperE.isDone() && stepperD.isDone() && FASE37 == true && FASE37_2 == true)  
  {  
FASE37 = false;
FASE37_2 = false;
FASE38 = true;
  } 

//ETAPA FASE 38
if (stepperE.isDone() && stepperD.isDone() && FASE38 == true)
{
//Exibe mensagem FASE 38 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 38");
ang_esq = 774;
curvaE();
}

//Transição Fase 38 para Fase 39
  if (stepperE.isDone() && stepperD.isDone() && FASE38 == true && FASEE_0 == true)  
  {  
FASE38 = false;
FASEE_0 = false;
FASE39 = true;
  } 

//ETAPA FASE 39 (Avança a gaveta)
if (FASE39 == true)
{
//Exibe mensagem FASE 39 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 39");
}

//Transição Fase 39 para Fase 40
 GAV_AVANC_ST = digitalRead(GAV_AVANC);
//Transição Fase 39 para Fase 40
  if (FASE39 == true && GAV_AVANC_ST == 1)  
  {  
FASE39 = false;
FASE40 = true;
  }

//ETAPA FASE 40
if (stepperE.isDone() && stepperD.isDone() && FASE40 == true && FASE40_2 == false)
{
//Exibe mensagem FASE 40 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 40");
//delay(time_delay); 
//Define o sentido de rotacao
stepperE.setDirection(CW);  
//Define o numero de rotacoes  
stepperE.rotateDegrees(1890); 
//Define o sentido de rotacao
stepperD.setDirection(CW);  
//Define o numero de rotacoes  
stepperD.rotateDegrees(1890);
FASE40_2 = true;
}

//Transição Fase 40 para Fase 41
  if (stepperE.isDone() && stepperD.isDone() && FASE40 == true && FASE40_2 == true)  
  {  
FASE40 = false;
FASE40_2 = false;
FASE41 = true;
  }

//ETAPA FASE 41 (Entrega da bola)
if (FASE41 == true)
{
//Exibe mensagem FASE 41 no display 
// lcd.setCursor(0,0);  
// lcd.print("FASE 41");
s.write(180);
}
  //**********************ABERTURA DA MESA**********************
 GAV_AVANC_ST = digitalRead(GAV_AVANC);
 GAV_REC_ST = digitalRead(GAV_REC);
 botao = analogRead (0);  //Leitura do valor da porta analógica A0
  if (((FASE21 == 1) || (FASE39 ==1)) && recuando == false && avancando == false)  
  {  
    digitalWrite(IN1_PH, HIGH);
    digitalWrite(IN2_PH, LOW);
    avancando = true;
  }
  if (GAV_AVANC_ST == 1 && avancando == true)  
  {  
    //delay (200);
    digitalWrite(IN1_PH, LOW);
    digitalWrite(IN2_PH, LOW);
    avancando = false;
  }
  if (FASE0 == 1 && avancando == false)  
  {  
    digitalWrite(IN1_PH, LOW);
    digitalWrite(IN2_PH, HIGH);
    recuando = 1;
  }
  if (GAV_REC_ST == 0 && recuando == true)  
  {  
    digitalWrite(IN1_PH, LOW);
    digitalWrite(IN2_PH, LOW);
    recuando = 0;
  }
//  Serial.println(GAV_AVANC_ST);
//  Serial.println(GAV_REC_ST);

  //Comando obrigatorio para funcionamento da biblioteca  
  stepperE.run();
  stepperD.run(); 

  */

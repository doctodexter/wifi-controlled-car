#include <MotorDriver.h>
#include <car_bluetooth.h>
bool state;
void setup() {
    Serial.begin(9600);
    motordriver.init();
    motordriver.setSpeed(170,MOTORB);
    motordriver.setSpeed(170 ,MOTORA);
    pinMode(3,INPUT);
    pinMode(5,INPUT);
    pinMode(6,INPUT);
    pinMode(7,INPUT);
}

void loop() {
 // motordriver.goForward();
// motordriver.stop();


  if(digitalRead(3) == 1){
    motordriver.goForward();
      Serial.println(digitalRead(3));
  }else{
    motordriver.stop();
  }
    if(digitalRead(7) == 1){
    motordriver.goRight();
      Serial.println(digitalRead(7));
  }else{
    motordriver.stop();
  }
    if(digitalRead(5) == 1){
    motordriver.goBackward();
      Serial.println(digitalRead(5));
  }else{
    motordriver.stop();
  }
    if(digitalRead(6) == 1){
    motordriver.goLeft();
      Serial.println(digitalRead(6));
  }else{
    motordriver.stop();
  }
}

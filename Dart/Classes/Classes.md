## Классы

```
void main () {
  
  Car myCar = Car("BMW", color: "Blue");
  myCar.start();
  
  Car myCarNamed = Car.named();
  myCarNamed.start();
  
  Car myColorCar = Car.fromColor(color: "YELLOW");
  myColorCar.start();
  
  CarSun myCar2 = CarSun.fromColor(color: "PINK");
  myCar2.start();
  myCar2.stop();
  print(myCar2.runtimeType);
  
  Car myCarNew = CarSun("SKODA");
  myCarNew.start();
  myCarNew.stop();
  
}

int calcWords (String inString) {
  List <String> words = ['a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'];
  return 1;
}

class Car {
  
  String carName;
  var color;
  
  Car.named() : this("TOYOTA", color: "GREEN");
  
  Car.fromColor({var color}): this("RENO", color: color + "_ME");
  
  Car(this.carName, { this.color = "Red" });
  
  
  void start() {
    print("The $color $carName has started.");
  }
  
  void stop() {
    print("The $carName has stopped now.");
  }
}

class CarSun extends Car {
  CarSun(String carName, {color = "grey"}) : super(
    carName, 
    color:color
  );
  
  CarSun.fromColor({ color }) : super(
    color
  );
  
  void stop() {
    super.stop();
    print("The Sun $color $carName was started.");
  }
}
```
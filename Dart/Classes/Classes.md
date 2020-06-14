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

###Еще подобное:

```
void main () {
  
  Car myCar = Car(name: "Tesla", way: 30.544);
  myCar.infoCar();

}

class Car {
 
  String carName;
  double persentWay;
  
  Car({String name, double way}): carName = name, persentWay = way.roundToDouble() {
    print("Work");
    persentWay = 100;
  }
  
  void infoCar() {
    print("This car $carName: $persentWay");
  }

}
```
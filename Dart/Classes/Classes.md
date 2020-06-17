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

### Переопределение методов родительского класса

```
void main () {
  Car myCar = Car("red", 38, "Toyota");
  myCar.carName = 'Ford';
  myCar.color = "green";
  myCar.start();
  myCar.openDoor();

  
}


class Vehicle {
  String color;
  
  Vehicle(var color) {
    this.color = color;
    print("Color $color in Vehicle constructor");
  }
  
  void start() {
    print("Has start");
  }
}

class Car extends Vehicle {
  String carName = 'Lisa';
  int speed;
  
  
  Car(String color,int speed, String name): this.carName = name.toUpperCase(), this.speed = speed, super(color) {
    // this.carName = $name;
    print("Color $color in Car $carName constructor");
  }
  
  String get color => super.color;
  
  void set color(String value) {
    if (value == "black") {
      throw ArgumentError("Please, never!");
    }
    
    super.color = value;
  }
    
  void openDoor() {
    print("Open dors");
  }
  
  @override
  void start() {
    print('Color car $carName: $color move with speed: $speed ml');
    print('$carName');
    super.start();
  }

}

class Moto extends Vehicle {
  String type;
  
  Moto(String $color): super($color);
  
  void roll() {
    print("Rolled over in the air");
  }
}
```
## Inheritance


```
void main () {

  
  Car myCar = Car();
  myCar.carName = 'Ford';
  myCar.color = 'green';
  myCar.start();
  myCar.openDoor();
  
  print("");
  
  Moto myMoto = Moto();
  myMoto.color = "gray";
  myMoto.type = 'MyTypeMoto';
  myMoto.start();
  myMoto.roll();
  
}


class Vehicle {
  String color;
  
  void start() {
    print("Has start");
  }
}

class Car extends Vehicle {
  String carName = 'Lisa';
  
  void openDoor() {
    print("Open dors");
  }

}

class Moto extends Vehicle {
  String type;
  
  void roll() {
    print("Rolled over in the air");
  }
}
```

### Constructor class. Call super

```
void main () {
  
  Car myCar = Car("black", "Toyota");
  myCar.carName = 'Ford';
  myCar.color = 'green';
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
  
  Car(String color, String name): this.carName = name.toUpperCase(), super(color) {
    // this.carName = $name;
    print("Color $color in Car $carName constructor");
  }
  
  void openDoor() {
    print("Open dors");
  }

}
```
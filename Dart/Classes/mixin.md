## How to mixin

```
void main () {
  Vehicle myVehicle = Vehicle("PonyRise", 100);
  myVehicle.move();
  myVehicle.speedMove();
}


class Car {
  String name;
  Car.named(this.name);
  
  void move() {
    print("The $name has started");
  }

}
  
// without constructor
mixin Train {
  int speed = 78;
  
  void speedMove() {
    print("How speed: $speed");
  }
}
 
class Vehicle extends Car with Train {
  int speed;
  
  Vehicle(String name, int speedParam): super.named(name) {
    speed = speedParam;
    print("From constructor car - $name, speed: $speed");
  }
  
  void move() {
    print("Daughter move car - $name");
    super.move();
  }
  
}
```
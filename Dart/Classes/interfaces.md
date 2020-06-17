## Interfaces

```
void main () {
  Vehicle myVehicle = Vehicle("Pony", 44);
  myVehicle.move();
  myVehicle.speedMove();  
}


class Car {
  String name;
  Car(this.name);
  
  void move() {
    print("The $name has started");
  }

}
  
class Train {
  int speed = 78;
  
  void speedMove() {
    print("How $speed");
  }
}
 
class Vehicle implements Car, Train {
  String name;
  int speed;
  
  Vehicle(this.name, this.speed);
  
  void move() {
    print("Daughter move car - $name");
  }
  
  void speedMove() {
    print("Speed move dauther $speed km");
  }
}
```

```
void main () {
  Car myCar = Car("Ford", "green");
  
  // Car.wheels = 4;  // for set static field need set field Not on instance class
  
  // Car.power = 120;  // Error it's final
  
  Car.setWheels(4);
  
  myCar.checkMove();
  
}


class Car {
  String carName = 'Lisa';
  String color;
  static int wheels = 3;
  static final int power = 220;
  
  Car(this.carName, this.color) {
    var t = time(500, 80);
    print("Time $t");
  }
  
  // in static methods we use only static methods and properties
  static double time(int dist, double speed) => dist / speed;
  
  static void setWheels(int val) {
    if (val == 4) {
      wheels = val;
    } else {
      print("Please correct value for wheels (4)");
    }
  }
  
  void checkMove() {
    if (wheels >= 4) {
      print("The $carName has started");
    } else {
      print("$color car $carName is broken");
    }
  }

}
```
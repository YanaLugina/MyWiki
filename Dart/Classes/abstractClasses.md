## Abstract class and methods


Abstract methods exist only abstract class
Abstract methods don't have body
Class, which extends abstract class mast have all abstract methods defined in abstract class

```
void main () {
  Car car = Car();
  car.move();  
  
  Train myTrain = Train();
  myTrain.move();
}

abstract class Vehicle {
  void move();
}

class Car extends Vehicle {
  void move() {
    print("The Car moves on the road");
  }
}

class Train extends Vehicle {
  void move() {
    print("The Train move on the rails");
  }
}
```
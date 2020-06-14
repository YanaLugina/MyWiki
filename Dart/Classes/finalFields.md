
```
void main () {
  Car myCar = Car(3, "Ford", 25);
  
  print(myCar.wheels);
  
}


class Car {
  String carName = 'Lisa';
  double persentWay;
  final int wheels;
  
  Car(int wheel, carName, persentWay): wheels = wheel + 1 {
    this.carName = carName;
    this.persentWay = persentWay;
  }

}
```
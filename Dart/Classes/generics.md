## Generics

```
void main () {
  Car car = Car(carName: "Ford", id: "89");
  print(car.id.runtimeType);
  car.move("90");  
  
  print("");
  
  Car carIntId = Car(id: 2, carName: "BMW");
  print(carIntId.id.runtimeType);
  carIntId.move(300);
}

class Car<T> {
  T id;
  String carName;
  
  Car({this.id, this.carName});
  
  void move<T>(T speed) {
    print("The Car: $carName ID: $id - moves on the road with $speed");
  }
}
```
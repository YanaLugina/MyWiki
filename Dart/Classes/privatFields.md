
```
void main () {

  Car myCar = Car();
  myCar.name = 'Dart';  // setter
  print(myCar.name);    // getter
  
  myCar.persentage = 84.6;
  print(myCar.persentage);
  
}


class Car {
  String _carName;
  double _persentWay;
  
  void set persentage(double per) {
    _persentWay = (per > 100 || per < 0) ? _persentWay = 0 : _persentWay = per;
  }
  
  double get persentage {
    return _persentWay;
  }
  
  void set name(String stringName) {
    _carName = stringName.toUpperCase();
  }
  
  String get name {
    return _carName;
  }
}
```
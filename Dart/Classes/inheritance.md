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
  myCar.name = 'Ford';
  myCar.color = 'green';
  myCar.start();
  myCar.openDoor();

  
}


class Vehicle {
  String _color;
  
  Vehicle(String color) : this._color = color {
    print("Color $color in Vehicle constructor");
  }
  
  void set color(String newColor) {
    _color = newColor;
  }
  
  String get color => this._color;
  
  void start() {
    print("Has start");
  }
}

class Car extends Vehicle {
  String _name = 'Lisa';
  
  Car(String color, String nameNew): this._name = nameNew.toUpperCase(), super(color) {
    // this.carName = $name;
    print("Color $color in Car $name constructor");
  }
  
  void set name(String data) {
    this._name = data;
  }
  
  String get name => this._name;
  
  
  void openDoor() {
    print("Open dors, $color $name");
  }

}
```

###$ Example with getters

```
void main () {
  
  Cuboid myCuboid = Cuboid(1, 2, 3);
  print(myCuboid.surfaceArea);
  print(myCuboid.volume);
  
  Cube myCube = Cube(2);
  print(myCube.surfaceArea);
  print(myCube.volume);
  
}


class Cuboid {
  int length;
  int width;
  int height;
  
  Cuboid(this.length, this.width, this.height);
  
  int get surfaceArea {
    return 2 * length * width + 2 * width * height + 2 * height * length;
  }
  
  int get volume {
    return width * length * height;
  }
}

class Cube extends Cuboid {
  int length;
  
  Cube(this.length): super(length, length, length); 
}
```
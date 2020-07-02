## Factory

```
void main () {
  IGreetable myGreetable = new IGreetable();
  var massage = myGreetable.sayHello("DartIst");
  print(massage);

}


abstract class IGreetable {
  String sayHello(String name);

  factory IGreetable() {
    return new Greeter();
  }
}

class Greeter implements IGreetable {
  String sayHello(String name) {
    return 'Hello $name';
  }
}
```

### Example 2

```
void main () {
  IGreetable myGreetable = new IGreetable('Greeter');
  var massage = myGreetable.sayHello("Dart Hole");
  print(massage);

  IGreetable myGreetableNext = new IGreetable('Greeter');

  var massageNext = myGreetableNext.sayHello("Dart Next class");
  print(massageNext);

}


abstract class IGreetable {
  String sayHello(String name);

  factory IGreetable(String typeName) {
    if (typeName == 'Greeter') return new Greeter();
    if (typeName == 'NextGreeter') return new NextGreeter();
  }
}

class Greeter implements IGreetable {
  String sayHello(String name) {
    return 'Hello $name';
  }
}

class NextGreeter implements IGreetable {
  String sayHello(String name) {
    return 'Hello next $name';
  }
}
```
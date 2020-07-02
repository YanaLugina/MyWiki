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
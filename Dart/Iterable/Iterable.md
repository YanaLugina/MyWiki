
```javascript
void main () {
  var carData = {
      'name': "Tesla",
      'way': 30.544
  };
    
  Iterable<Object> stMy = getArgsFromObject(carData);
}

Iterable<Object> getArgsFromObject(Map myObj) sync* {
  for (var item in myObj.entries) {
    yield "${item.key}:${item.value}";
  }
}
```
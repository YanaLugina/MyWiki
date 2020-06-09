## Generators

```
main() {
  int aNumber = 13;
  Stream<int> res = printInteger(aNumber);
  res.listen((int val) {
    print('Post $val');
  });
  
  
}

Stream<int> printInteger(int aNum) async* {
  await new Future.delayed(new Duration(seconds: 5));
  for(int i=0; i < aNum; i++) {
    await new Future.delayed(new Duration(seconds: 1));
    yield i;
  }
  print('the end');
}
```

was returned:
```javascript
Post 0
Post 1
Post 2
Post 3
Post 4
Post 5
Post 6
Post 7
Post 8
Post 9
Post 10
Post 11
Post 12
the end
```
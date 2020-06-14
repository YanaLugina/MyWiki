##List 

```void main () {
 List <int> list1 = [1,2,3];
 var list2 = List<String>();
  
 
  Set - unic object
 
  
  var set = {1,2,3};
  Set<int> set1 = {1,2,3};
  var set2 = <int>{1,2,3};
  Set set3 = Set.from([1, "hello", "other"]);
  
  Set numberSet = Set();
  numberSet.add(22);
  numberSet.add(true);
  numberSet.add("hell");
  numberSet.add(23.5);
  
  print(set);
  print(set1);
  print(set3);
  print(numberSet);
  
  
  for(var elem in numberSet) {
    print(elem);
  }
  
 
  numberSet.forEach((el) => print(el));
  
  if exist in Set
  print("\n");
  numberSet.remove(22);
  print(numberSet.contains(22));
  print(numberSet.length);
  
  print(numberSet.isEmpty);
  }
  ```
  
# Задачка про Object.keys(obj);
Напишите функцию count(obj), которая возвращает количество свойств объекта:

```javascript
let user = {
  name: 'John',
  age: 30
};

alert( count(user) ); // 2
```

Постарайтесь сделать код как можно короче.

P.S. Игнорируйте символьные свойства, подсчитывайте только «обычные».

```javascript


let id = Symbol("pid");
const user = {
  name: 'Jonn',
  age: 12,
  opp: 78,
  [id]: 208,
  [id]: 7,
};

// считаем количество свойств в объекте
const count = function(obj) {
  let all = 0;
  for(let item of Object.keys(obj)){
    all++;
  }
  return all;
};

const count2 = function(obj, isSbl) {
  if(isSbl === 'sbl') {
    // считаем ко-во всех символов в объекте
    let allSymbol = Object.getOwnPropertySymbols(obj);
    return allSymbol.length;
  } else if (isSbl === 'props') { //считаем кол-во всех свойств объекта, но не символов
    return Object
    .keys(user)
    .reduce((sum, item) => { 
      return sum = sum + 1; 
      }, 0); 
  } else { //считаем все и символы и объекты
    let ref = Reflect.ownKeys(obj);
    return ref.reduce((sum, item) => {
      return sum = sum + 1;
    }, 0);
  }

  return 'err';
  
};

console.log(count(user)); //3

console.log(count2(user, 'sbl')); //1
console.log(count2(user, 'props')); //3
console.log(count2(user, 'all')); //4
```
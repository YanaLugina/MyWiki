Есть объект salaries с произвольным количеством свойств, содержащих заработные платы.

Напишите функцию sumSalaries(salaries), которая возвращает сумму всех зарплат с помощью метода Object.values и цикла for..of.

Если объект salaries пуст, то результат должен быть 0.

Например:

```javascript
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```

Решение:
```javascript
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

const sumSalaries = function(obj) {
  const objToAtt = Object.values(obj);
  return objToAtt.reduce((sum, item) => {return sum = sum + item});
};

console.log(sumSalaries(salaries)); // 650
```

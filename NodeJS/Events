# Модуль Events. EventEmitter и EventListener

Особенностью Node.js является асинхронная событийно-управляемая архитектура, в которой определенного вида  объекты (так называемые "излучатели" или экзэмпляры EventEmitter) генерируют именованные события, при возникновении которых вызываются объекты-функции (обработчики событий) или listeners, EventListeners если быть точнее.

+ Все объекты которые генерируют события являются экзэмплярами EventEmitter класса.
+ Listeners по-умолчанию, вызываются синхронно в том порядке, в котором происходила их регистрация  ```.on``` .
+ Порядок вызовов listeners можно менять, если это необходимо и не нарушает дальнейшую логику работы приложения.
+ Необходимо регистрировать listener на error, если не хотите чтоб Node-процесс упал или завершился.
+ Количество обработчиков событий listeners по-умолчанию ограничено ```var defaultMaxListeners = 10```, его можно менять, или даже отключать, но отключение может привести к утечке памяти, поэтому, как правило, после вызова обработчика его отписывают от события.

+ Класс ```EventEmitter``` экспортируется из модуля ```events```

```js
const EventEmitter = require('events');
```


Рассматривая подробно архитектуру NodeJS модуля ```events``` можно заметить небольшую оптимизацию: если на событие зарегистрирован всего один listener, то он так и регистрируется - функцией, а если их больше одного, то только тогда создается массив из Listeners.

Подробнее модуль ```events``` можно посмотреть в данном репозитории: https://github.com/nodejs/node/blob/master/lib/events.js


## Использование this в listeners

При вызове метода eventEmitter.emit() в listener можно передавать произвольный набр аргументов.

Если мы в виде функции-listener используем обычную функцию, заданную как Function Expression, то в ее this содержится ссылка на экзэмпляр EventEmitter (событие):

```js
const myEmitter = new MyEmitter();
myEmitter.on('event', function(a, b) {
  console.log(a, b, this, this === myEmitter);
  // Prints:
  //   a b MyEmitter {
  //     domain: null,
  //     _events: { event: [Function] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined } true
});
myEmitter.emit('event', 'a', 'b');
```

Но, если listener задан как стрелочная функция (Arrow Function), то мы не имеем такой ссылки

```js
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
  // Prints: a b {}
});
myEmitter.emit('event', 'a', 'b');
 ```

## Синхронность и асинхронность

EventEmitter вызывает все навешанные listeners синхронно в порядке их регистрации. Это сделано для обеспечения правильной последовательности событий и воизбежании логических ошибок. Но если есть необходимость, то последоватьельность вызовов можно сделать асинхронным с помощью методов ```setImmediate()``` или ``` process.nextTick()```

```js
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('this happens asynchronously');
  });
});
myEmitter.emit('event', 'a', 'b');
```
## Once() или on()

Если мы регистрируем listener на событие с помощью метода on(), то он будет вызываться каждый раз, при возникновении данного события

Но если нам необходимо вызвать listener единожды и после этого отписаться от прослушки данного события, то можно использовать метод once()
```js
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.once('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// Prints: 1
myEmitter.emit('event');
// Ignored
```

При добавлении нового listener все EventListener генерируют событие ```'newListener' ```, а при удалении - ``` 'removeListener'```

## Error

Ошибки обрабатываются особым образом. Если возникает ошибка в экземпляре EventEmitter, то обычно, как следствие,  возникает событие error. Если на событие error не зарегистрированно ни одного listener, то при его возникновении выводится трассировка стека и процесс Node.js завершается.

```js
const myEmitter = new MyEmitter();
myEmitter.emit('error', new Error('whoops!'));
// Throws and crashes Node.js
```

Хорошей практикой является всегда регистрировать listener на событие error

```js
const myEmitter = new MyEmitter();
myEmitter.on('error', (err) => {
  console.error('whoops! there was an error');
});
myEmitter.emit('error', new Error('whoops!'));
// Prints: whoops! there was an error
```
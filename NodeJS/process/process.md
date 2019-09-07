```process``` глобальный объект, который предоставляет информацию и контроль над текущим процессом Node.js
Являясь глобальным он всегда доступен и без ```require()```. И конечно он может быть явно доступным с помощью ```require()```

## ProcessEvents

process экземпляр объекта EventEmitter

## Event: 'beforeExit'
Added in: v0.11.12

Событие ```beforeExit``` испускается, когда Node.js процесса уже нет в event loop и не предполагается его появления в планировщике.
Обычно процесс Node.js завершается, когда его нет в планировщике, но listener зарегистрированный на событие ```beforeExit``` может выполнять асинхронные вызовы, и таким образом запускать процесс Node.js.

The listener callback функция вызывается со значением process.exitCode переданным в качестве единственного аргумента.

Событие ```beforeExit``` не испускается при условии явного завершения процесса, например, при вызове process.exit() или в результате непойманных ошибок.

Событие ```beforeExit``` не должно использоваться в качестве альтернативы exit если дальнейшая работа процесса Node.js не планируется.

```javascript
process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

console.log('This message is displayed first.');

// Prints:
// This message is displayed first.
// Process beforeExit event with code: 0
// Process exit event with code: 0
```

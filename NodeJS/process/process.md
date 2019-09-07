```process``` глобальный объект, который предоставляет информацию и контроль над текущим процессом Node.js
Являясь глобальным он всегда доступен и без ```require()```. И конечно он может быть явно доступным с помощью ```require()```

## ProcessEvents

process экземпляр объекта EventEmitter

### Event: 'beforeExit'
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

В исходниках публичный метод ```beforeExit``` находится в /scr/env.h и написан на с++

```javascript
namespace node {
  class Environment : public MemoryRetainer {
    public:  
      ...
      void BeforeExit(void (*cb)(void* arg), void* arg);
      ...
  }
}

```

### Event: 'disconnect'
Added in: v0.7.7

Если Node.js был поражден с помощью IPC канала (см. в документации к Child Process и Cluster), то событие ```disconnect``` испускается, когда IPC канал будет закрыт.

### Event: 'exit'
Added in: v0.1.7

 - code < integer >

Событие exit испускается, когда Node.js процесс собырается завершиться в результате:

 - явного вызова метода ```process.exit()``` 
 - event loop Node.js не имеет ни одной задачи для выполнения
 
 Нет никакого способа отменить выход из цикла обработки событий на этом этапе, и как только все ```exit``` listeners закончили выполнение процесс Node.js завершится.
 
The listener callback функция вызывается с кодом выхода, указанным либо ```process.exitCode``` свойством, либо ```exitCode``` аргументом, переданным ```process.exit()``` методу.

```javascript
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
```

Listener functions должны выполнять только синхронную операцию! Процесс Node.js должен немедленно завершаться после вызова всех ```exit``` event listeners, в результате чего любая дополнительная работа в цикле событий будет отменена.

В этом примере таймаут никогда не сработает:

```javascript
process.on('exit', (code) => {
  setTimeout(() => {
    console.log('This will not run');
  }, 0);
});
```

#### Event: 'message'
Added in: v0.5.10

 - message < Object > | < boolean > | < number > | < string > | < null > распарсенный JSON объект или сериализуемое примитивное значение.
 - sendHandle < net.Server > | < net.Socket > a net.Server или net.Socket объект, либо undefined.
 
 Если процесс Node.js порожден с использованием IPC канала (см. в документации к Child Process и Cluster), то ```message``` событие испускается, когда сообщение, отправленное с помощью родительского процесса с использованием ```childprocess.send()``` принимаются дочерним процессом.
 
 Сообщение проходит сериализацию и анализ. Полученное сообщение может не совпадать с исходным.
 
#### Event: 'multipleResolves'
Added in: v10.12.0

 - type < string > Тип разрешения. Один из 'resolve' или 'reject'.
 - promise < Promise > Промис, который разрешается resolved или rejected более одного раза.
 - value < any > Значение, с которым промис был разрешен в первый раз (либо resolved, либо rejected).
 
 Событие 'multipleResolves' испускается всякий раз, когда Promise было либо:

 - Resolved more than once.
 - Rejected more than once.
 - Rejected after resolve.
 - Resolved after reject.
 
 Это событие полезно для отслеживания потенциальных ошибок приложений использующих промисы, так как множественные разрешения безмолвно проглатываются. 
 Однако, возникновение таких событий не всегда говорят об ошибке. Например, ```Promise.race()``` может вызывать события ```multipleResolves``` 

```javascript
process.on('multipleResolves', (type, promise, reason) => {
  console.error(type, promise, reason);
  setImmediate(() => process.exit(1));
});

async function main() {
  try {
    return await new Promise((resolve, reject) => {
      resolve('First call');
      resolve('Swallowed resolve');
      reject(new Error('Swallowed reject'));
    });
  } catch {
    throw new Error('Failed');
  }
}

main().then(console.log);
// resolve: Promise { 'First call' } 'Swallowed resolve'
// reject: Promise { 'First call' } Error: Swallowed reject
//     at Promise (*)
//     at new Promise (<anonymous>)
//     at main (*)
// First call
```
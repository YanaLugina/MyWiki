# Cluster

Node.js однопоточный и поскольку один экземпляр Node.js запускает только один поток event loop, необходимо использовать cluster, чтобы максимально использовать возможности многоядерного сервера и запустить кластер процессов Node.js для распределения нагрузки. 

Такая возможность относится только к master процессу, у которого нет уникального ID, то есть process.env.NODE_UNIQUE_ID is undefined. Модуль cluster содержит следующую проверку на наличие данной переменной:

```javascript
const childOrMaster = 'NODE_UNIQUE_ID' in process.env ? 'child' : 'master';
module.exports = require(`internal/cluster/${childOrMaster}`);
```

Cluster используется для создания дочерних процессов worker process по одному на каждое ядро. Созданные процессы-потомки используют один и тот же порт сервера, используя циклическую балансировку нагрузки, встроенную в Node.js.

Пример создания кластера worker-процессов:

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}

```

Запуск Node.js теперь разделит порт 8000 между worker'ами.

 ```javascript
$ node server.js
Master 3596 is running
Worker 4324 started
Worker 4520 started
Worker 6056 started
Worker 5644 started
```

На Windows пока невозможно именовать каналы worker'а.

Разница между cluster.fork() и child_process.fork() заключается в том, что кластер позволяет разделить TCP-серверы между worker'ами. cluster.fork реализуется поверх child_process.fork. API передачи сообщений, который доступен с child_process.fork также доступен с cluster. 

## Как это работает

Worker'ы порождаются с использованием метода child_process.fork(), так что они могут связываться с родителем по IPC и передавать серверные обработчики событий вперед и назад.

Модуль кластера содержит два метода распределения входящих соединений.

Первый метод (и используемый по умолчанию на всех платформах, кроме windows) - это циклический подход, при котором главный процесс прослушивает порт, принимая новые подключения и распределяет их между worker'ами в режиме циклического перебора, с некоторым встроенным умным распределением нагрузки, чтобы избежать перегрузку рабочего процесса.

Второй подход - где мастер-процесс создает сокет прослушивания и отправляет его заинтересованным рабочим процессам. Затем worker'ы принимают входящие подключения напрямую.

Второй подход, в теории, должен работать эффективнее. Тем не менее, на практике, такое распределение нагрузки ведет себя очень не сбалансировано, из-за капризов планировщика операционной системы. Наблюдалось распределение нагрузки, где более 70% всех соединений приходились всего на два worker-процесса из восьми.

Так как server.listen() большую часть работы передает мастер-процессу, существуют три случая, когда поведение между обычным процессом Node.js и worker-процессом кластера отличается:

 1. ```server.listen({fd: 7})``` Так как сообщения передается в мастер-процесс, дескриптор файла 7 будет прослушиваться в родительском процессе, а обработчик передаваться в worker, вместо прослушивания идея worker'а только иметь ссылки на дескриптор файла.

 2. ```server.listen(handle)``` Прослушивание обработчика в явном виде заставит рабочий процесс использовать предоставленный обработчик, а не общаться с главным процессом.

 3. ```server.listen(0)``` Обычно, таким образом вызывают прослушку случайного порта сервером. Однако, в кластере каждый работник будет получать тот же "случайный" порт каждый раз, когда получит listen(0). По сути, случайным порт будет только в первый раз, но предсказуемым впоследствии. Чтобы прослушивать уникальный порт и впоследствии, создайте номер порта на основе идентификатора worker'а кластера.

Node.js не предоставляет логику маршрутизации. Поэтому важно спроектировать приложение таким образом, чтобы оно не слишком сильно зависело от объектов данных в памяти для таких вещей, как сеансы и вход в систему.

Так как workers разбивают между собой отдельные процессы, они могут быть убиты или пересозданы в зависимости от потребностей программы, не затрагивая остальные workers. Пока хотя бы один из worker'ов жив, сервер будет продолжать принимать подключения. Если не осталось ни одного живого worker'а, существующие соединения сбросятся и запросы на новые соединения будут отклонены. Однако, Node.js автоматически не управляет количеством рабочих процессов. Приложение само несет ответственность за управление пулом workers, на основе собственных потребностей.

## Class: Worker
Добавлено в версии: v0.7.0

Объект ```Worker``` содержит всю общедоступную информацию и методы о worker. В мастер-процессе его можно вызвать используя метод ```cluster.workers```. В worker-процессе его можно вызвать используя ```cluster.worker```.

### Event: 'disconnect'
Добавлено в версии: v0.7.7

Похоже на событие cluster.on('disconnect'), но специально для worker-процесса.

```js
cluster.fork().on('disconnect', () => {
  // Worker отключился
});
```

### Event: 'error'
Добавлено в версии: v0.7.3

Это событие такое же, как и предоставленное  [```child_process.fork()```](https://nodejs.org/dist/latest-v12.x/docs/api/child_process.html#child_process_child_process_fork_modulepath_args_options).

Внутри worker-процесса, также может использоваться и ```process.on('error')```.

### Event: 'exit'
Добавлено в версии: v0.11.2

 - ```code``` < number > Код нормального выхода.
 - ```signal``` < string > Название сигнала (например: 'SIGHUP'), вызвавшего остановкку процесса.
 
Похоже на событие ```cluster.on('exit')```, но специально для worker-процесса.

```js
const worker = cluster.fork();
worker.on('exit', (code, signal) => {
  if (signal) {
    console.log(`worker was killed by signal: ${signal}`);
  } else if (code !== 0) {
    console.log(`worker exited with error code: ${code}`);
  } else {
    console.log('worker success!');
  }
});
```

### Event: 'listening'
Добавлено в версии: v0.7.0

 + address < Object >
 

Похоже на событие cluster.on('listening'), но специально для worker-процесса.

```js
cluster.fork().on('listening', (address) => {
  // Worker is listening
});
```

It is not emitted in the worker.
Это не испускается в worker.


### Event: 'message'
Добавлено в версии: v0.7.0

 - message < Object >
 - handle < undefined > | < Object >

Похоже на событие 'message' в cluster, но специально для worker-процесса.

В пределах worker-процесса, также может использоваться ```process.on('message')```.

Посмотреть [process event: 'message'](https://nodejs.org/dist/latest-v12.x/docs/api/process.html#process_event_message).

Пример использования the message system. В master-процессе он ведет подсчет количества HTTP-запросов полученных worker'ами: 

```js
const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) {

  // Keep track of http requests
  let numReqs = 0;
  setInterval(() => {
    console.log(`numReqs = ${numReqs}`);
  }, 1000);

  // Count requests
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
    }
  }

  // Start workers and listen for messages containing notifyRequest
  const numCPUs = require('os').cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler);
  }

} else {

  // Worker processes have a http server.
  http.Server((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');

    // Notify master about the request
    process.send({ cmd: 'notifyRequest' });
  }).listen(8000);
}
```

### Event: 'online'
Добавлено в версии: v0.7.0

Похоже на событие ```cluster.on('online')```, но специально для worker-процесса.

```js
cluster.fork().on('online', () => {
  // Worker is online
});
```

Это не испускается в worker.

### worker.disconnect()
Version	Changes
v7.3.0	
This method now returns a reference to worker.

v0.7.7	
Added in: v0.7.7

Returns: <cluster.Worker> A reference to worker.
In a worker, this function will close all servers, wait for the 'close' event on those servers, and then disconnect the IPC channel.

In the master, an internal message is sent to the worker causing it to call .disconnect() on itself.

Causes .exitedAfterDisconnect to be set.

After a server is closed, it will no longer accept new connections, but connections may be accepted by any other listening worker. Existing connections will be allowed to close as usual. When no more connections exist, see server.close(), the IPC channel to the worker will close allowing it to die gracefully.

The above applies only to server connections, client connections are not automatically closed by workers, and disconnect does not wait for them to close before exiting.

In a worker, process.disconnect exists, but it is not this function; it is disconnect().

Because long living server connections may block workers from disconnecting, it may be useful to send a message, so application specific actions may be taken to close them. It also may be useful to implement a timeout, killing a worker if the 'disconnect' event has not been emitted after some time.

```js
if (cluster.isMaster) {
  const worker = cluster.fork();
  let timeout;

  worker.on('listening', (address) => {
    worker.send('shutdown');
    worker.disconnect();
    timeout = setTimeout(() => {
      worker.kill();
    }, 2000);
  });

  worker.on('disconnect', () => {
    clearTimeout(timeout);
  });

} else if (cluster.isWorker) {
  const net = require('net');
  const server = net.createServer((socket) => {
    // Connections never end
  });

  server.listen(8000);

  process.on('message', (msg) => {
    if (msg === 'shutdown') {
      // Initiate graceful close of any connections to server
    }
  });
}
```

### worker.exitedAfterDisconnect
Добавлено в версии: v6.0.0

< boolean >

Set by calling .kill() or .disconnect(). Until then, it is undefined.

The boolean worker.exitedAfterDisconnect allows distinguishing between voluntary and accidental exit, the master may choose not to respawn a worker based on this value.

```js
cluster.on('exit', (worker, code, signal) => {
  if (worker.exitedAfterDisconnect === true) {
    console.log('Oh, it was just voluntary – no need to worry');
  }
});
// kill worker
worker.kill();
```


### worker.id
Добавлено в версии: v0.8.0

< number >

Каждый новый worker получает уникальный id, этот id сранится в ```id```

Прока worker-процесс жив, это ключ, который идентифицирует его в ```cluster.workers```.

### worker.isConnected()
Добавлено в версии: v0.11.14
Эта функция возвращает true если worker-процесс подключен к своему мастер-процессу через IPC канал, в противном случае false. ```worker``` подключается к своему master-процессу сразу после создания. Он может быть отключен после вызова события `````'disconnect'`````.

### worker.isDead()
Добавлено в версии: v0.11.14

Функция возвращает true, если worker-процесс завершен (либо из-за выхода, либо из-за сигнала). В противном случае он возвращает false. В противном случае возвращает false.

```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('fork', (worker) => {
    console.log('worker is dead:', worker.isDead());
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log('worker is dead:', worker.isDead());
  });
} else {
  // Workers can share any TCP connection. In this case, it is an HTTP server.
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Current process\n ${process.pid}`);
    process.kill(process.pid);
  }).listen(8000);
}
```

### worker.kill([signal='SIGTERM'])
Добавлено в версии: v0.9.12
signal <string> Name of the kill signal to send to the worker process.
This function will kill the worker. In the master, it does this by disconnecting the worker.process, and once disconnected, killing with signal. In the worker, it does it by disconnecting the channel, and then exiting with code 0.

Because kill() attempts to gracefully disconnect the worker process, it is susceptible to waiting indefinitely for the disconnect to complete. For example, if the worker enters an infinite loop, a graceful disconnect will never occur. If the graceful disconnect behavior is not needed, use worker.process.kill().

Causes .exitedAfterDisconnect to be set.

This method is aliased as worker.destroy() for backwards compatibility.

In a worker, process.kill() exists, but it is not this function; it is kill().

### worker.process#
Добавлено в версии: v0.7.0
<ChildProcess>
All workers are created using child_process.fork(), the returned object from this function is stored as .process. In a worker, the global process is stored.

See: Child Process module.

Workers will call process.exit(0) if the 'disconnect' event occurs on process and .exitedAfterDisconnect is not true. This protects against accidental disconnection.

### worker.send(message[, sendHandle][, callback])
History
message <Object>
sendHandle <Handle>
callback <Function>
Returns: <boolean>
Send a message to a worker or master, optionally with a handle.

In the master this sends a message to a specific worker. It is identical to ChildProcess.send().

In a worker this sends a message to the master. It is identical to process.send().

This example will echo back all messages from the master:

```js
if (cluster.isMaster) {
  const worker = cluster.fork();
  worker.send('hi there');

} else if (cluster.isWorker) {
  process.on('message', (msg) => {
    process.send(msg);
  });
}
```


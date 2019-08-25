# Cluster

Один экземпляр Node.js запускает только один поток

Поскольку один экземпляр Node.js запускает только один поток event loop, необходимо использовать cluster, чтобы
максимально использовать возможности многоядерного сервера и запустить на каждом ядре кластер процессов Node.js для обработки нагрузки. 

Такая возможность относится только к master процессу, у которого нет уникального ID, то есть process.env.NODE_UNIQUE_ID is
undefined. Модуль cluster содержит слудующую проверку на наличие данной переменной:

```javascript
const childOrMaster = 'NODE_UNIQUE_ID' in process.env ? 'child' : 'master';
module.exports = require(`internal/cluster/${childOrMaster}`);
```

Cluster используется для создания дочерних процессов worker process по одному на каждое ядро. Созданные процессы-потомки используют один и тот же порт сервера, используя циклическую балансировку нагрузки, встроенную в Node.js.

Пример создания кластера процессов:

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

Запуск Node.js теперь разделит порт 8000 между the workers.

 ```javascript
$ node server.js
Master 3596 is running
Worker 4324 started
Worker 4520 started
Worker 6056 started
Worker 5644 started
```

На Windows пока невозможно именовать каналы worker'а.

## Как это работает

Worker'ы пораждаются с ипользованием метода child_process.fork(), так что они могут связываться с родителем по IPC и передавать серверные дескрипторы вперед и назад.

Модуль кластера содержит два метода распределения входящих соединений.

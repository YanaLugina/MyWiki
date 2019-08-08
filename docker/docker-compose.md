# Docker-compose

В проекте необходимо создать файл Docker файл, пример: 
```bash
FROM python:2.7                         // за основу взять образ Python 2.7
ADD . /code                             // добавить текущую . директориюю в каталог /code
WORKDIR /code                           // назначить рабочую директорию /code
RUN pip install -r requirements.txt     // установить Python зависимости
CMD python app.py                       // задать команду по умолчанию для контейнера
```
Собрать образ
```bash
docker build -t web .       // создать образ в текущей директории и назвать его web 
```
В проекте необходимо создать файл Docker-compose.yml, пример:
```bash
version: '2'
services:               //определены два сервиса web т redis
  web:
    build: .            // создать в текущем каталоге
    ports:
     - "5000:5000"      //сзязать порт контейнера с портом на хосте
    volumes:
     - .:/code          // смонтировать каталог проекта на хосте в каталог /code внутри контейнера позволяет менять код без пересоздания контейнера web
    depends_on:
     - redis            // линкует web-сервис с redis-сервисом
  redis:
    image: redis
```
Собрать и запустить группу кнтейнеров:
```bash
docker-compose up
```
Собрать и запустить группу контейнеров в фоновом режиме:
```bash
docker-compose up -d
```
Просмотр запущенных в фоновом режиме контейнеров:
```bash
docker-compose ps
```

Остановить группу контейнеров:
```bash
docker-compose stop
```

Как запустить единоразово команду в группе контейнеров показано в следующем примере:
```bash
docker-compose run web env
```
## --help
Посмотреть все доступные команды по docker-compose:
```bash
docker-compose --help
```
### Usage docker-compose
```bash
Usage:
  docker-compose [-f <arg>...] [options] [COMMAND] [ARGS...]
  docker-compose -h|--help
```
### Опции docker-compose
```bash
Options:
  -f, --file FILE             Specify an alternate compose file
                              (default: docker-compose.yml)
  -p, --project-name NAME     Specify an alternate project name
                              (default: directory name)
  --verbose                   Show more output
  --log-level LEVEL           Set log level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
  --no-ansi                   Do not print ANSI control characters
  -v, --version               Print version and exit
  -H, --host HOST             Daemon socket to connect to

  --tls                       Use TLS; implied by --tlsverify
  --tlscacert CA_PATH         Trust certs signed only by this CA
  --tlscert CLIENT_CERT_PATH  Path to TLS certificate file
  --tlskey TLS_KEY_PATH       Path to TLS key file
  --tlsverify                 Use TLS and verify the remote
  --skip-hostname-check       Don't check the daemon's hostname against the
                              name specified in the client certificate
  --project-directory PATH    Specify an alternate working directory
                              (default: the path of the Compose file)
  --compatibility             If set, Compose will attempt to convert keys
                              in v3 files to their non-Swarm equivalent
```
### Команды docker-compose 
```bash
Commands:
  build              Build or rebuild services
  bundle             Generate a Docker bundle from the Compose file
  config             Validate and view the Compose file
  create             Create services
  down               Stop and remove containers, networks, images, and volumes
  events             Receive real time events from containers
  exec               Execute a command in a running container
  help               Get help on a command
  images             List images
  kill               Kill containers
  logs               View output from containers
  pause              Pause services
  port               Print the public port for a port binding
  ps                 List containers
  pull               Pull service images
  push               Push service images
  restart            Restart services
  rm                 Remove stopped containers
  run                Run a one-off command
  scale              Set number of containers for a service
  start              Start services
  stop               Stop services
  top                Display the running processes
  unpause            Unpause services
  up                 Create and start containers
  version            Show the Docker-Compose version information
```
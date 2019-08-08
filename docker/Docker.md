#Docker

docker version                          // версия
docker ps                               // проверка запущенных контейнеров
docker ps -a                            // все контейнеры в системе
docker run hello-world                  // проверка существует ли локально -> скачивает с хаба -> загружает и запускает контейнер

docker image                            // отображает список образов в локальной системе
docker tag ID user/dockerName:latest
docker push user/dockerName
docker rmi user/dockerName (dickerName or ID)
docker run

##Создание Docker-контейнера
1) создать директорию -> войти в нее (это контекст сборки)
2) создать Docerfile:
touch Dockerfile
3) Добавить в него (nano Dockername):

FROM user/dockerName:latest             //выбираем бызовый образ, latest - последняя версия
RUN apt-get -y update && apt-get install -y dockerName          //добавляем приложение в имеющийся конейнер
CMD /usr/folder/folder -a | dockerName2                         //Иструкция запуска при старте, перенапрасляет поток в другое проложение

4) cat Dockername
5) docker build -t docker-whale .                       //открывает docker-файл и записывает в . директории и создает образ
6) docker run docker-whale                              //запускаем nameDocker
 

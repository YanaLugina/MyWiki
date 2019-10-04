// Создание сервера на чистом NodeJS для статических html страниц
const http = require('http');
const fs = require('fs');
const port = 3000;

//Создали статические файлы, настроили роутинг по этим файлам
function serveStaticFile(res, path, contextType, responseCode){
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data){
        if(err) {
            res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, {'Content-Type': contextType});
            res.end(data);
        }
    })
}

http.createServer(function(req, res) {
    //Приводим URl к единому виду путем удаления
    //строки запроса, необязательной косой черты
    //в конце строки и приведение к нижнему регистру
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path) {
        case '':
            serveStaticFile(res, '/public/homepage.html', 'text/html; charset=utf-8');
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html; charset=utf-8');
            break;
        case '/img/logo.jpeg':
            serveStaticFile(res, '/public/img/logo.jpeg', 'img/html');
            break;
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404);
            break;
    }
}).listen(port);

console.log('Сервер запущен на hocalhost:3000');
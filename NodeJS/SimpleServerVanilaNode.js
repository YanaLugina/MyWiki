const http = require('http');
const port = 3000;

http.createServer(function(req, res) {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path) {
        case '':
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end('Homepage');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('O');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end('Не найдено');
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, world');
}).listen(port);

console.log('Сервер запущен на hocalhost:3000');
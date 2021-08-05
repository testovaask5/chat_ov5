// Подключение зависимостей
const express = require('express')
const WsServer = require('ws').Server
const http = require("http");
const chokidar = require('chokidar');

// Инициализируем сервер
const app = express()
const server = http.createServer(app);

// Инициализируем WebSocket сервер
const webSocketServer = new WsServer({
    server: server
});

// Отслеживаем подключение к WebSocket серверу
webSocketServer.on('connection', function(ws) {
    // chokidar следит за изменениями файлов
    chokidar.watch('../client').on('change', (event, path) => {
        // Посылаем в браузер сообщение для перезагрузки окна браузера
        ws.send('reload')
    });
});

// app.get('/test-form', function (request, response) {
//     response.send(request.query)
// })

app.use(express.json())

app.post('/chat', function (request, response) {
    console.log(request.body);
    response.send(request.body)
})

app.use(express.static('../client'))

server.listen(3000, function () {
    console.log('http://localhost:3000');
})


const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const init = require('./app');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

init(io);

http.listen(3000, function () {
    console.log('listening on *:3000');
});

const controller = require('./controller');

module.exports = function (io) {

    // const events = Object.getOwnPropertyNames(Object.getPrototypeOf(new Controller));
    // console.log(events);
    const events = Object.keys(controller).filter(event => event !== 'connected');

    io.on('connection', function (socket) {
        if (typeof controller.connected === 'function') {
            controller.connected.call(socket);
        }
        console.log(events);
        events.forEach(event => {
            if (typeof controller[event] === 'function') {
                socket.on(event, controller[event].bind(socket));
            }
        });
        // console.log('a user connected', socket.id);
        // socket.broadcast.emit('hi');
        //
        // socket.on('chat message', function (msg) {
        //     console.log('message: ' + msg);
        //     io.emit('chat message', msg);
        // });
        //
        // socket.on('disconnect', function () {
        //     console.log('user disconnected');
        // });
    });
};

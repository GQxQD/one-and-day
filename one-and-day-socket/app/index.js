const controller = require('./controller');

module.exports = function (io) {

    const events = Object.keys(controller).filter(event => event !== 'connected');

    io.on('connection', function (socket) {
        if (typeof controller.connected === 'function') {
            controller.connected.call(socket);
        }
        events.forEach(event => {
            if (typeof controller[event] === 'function') {
                socket.on(event, controller[event].bind(socket));
            }
        });
    });
};

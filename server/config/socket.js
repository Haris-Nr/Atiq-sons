const socketIO = require('socket.io');
let connectedUsers = 0;

module.exports = function (server) {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('A user connected'+ socket.id);
        connectedUsers++

        socket.on('message', (data)=> {
            console.log('Message received:', data);
        });

        socket.on('disconnect',  ()=> {
            connectedUsers--
            console.log('A user disconnected');
        });
    });
};

const socketIO = require('socket.io');

let loggedInEmployeeCount = 0;

module.exports = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: "*",
        }
    });


    io.on('connection', (socket) => {
        console.log('A user connected ' + socket.id);
        loggedInEmployeeCount++
        socket.emit('userCount', loggedInEmployeeCount);


       socket.on('disconnect', () => {
        loggedInEmployeeCount--;
        });
       
    });

    

    return io;
};

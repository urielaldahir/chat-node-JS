const { Socket } = require("socket.io");
let nickNames = {};


const socketController = (socket = new Socket(), io) => {

    socket.on('disconnect', (data)=>{
        if(!socket.nickName) return;
        delete nickNames[socket.nickName];
        updateNickNames();
    });

    socket.on('nuevo-usuario', (data, callback)=>{
        if(data in nickNames){
            return callback(false);
        }
        callback(true);
        socket.nickName = data;
        nickNames[socket.nickName] = 1;
        updateNickNames();
    });
    
    socket.on('mandar-mensaje', (message) => {
        io.emit('nuevo-mensaje',{msg: message, nick: socket.nickName});
    });

    const updateNickNames = ()=>{
        io.emit('usernames', nickNames);
    }
}

module.exports = {
    socketController
}
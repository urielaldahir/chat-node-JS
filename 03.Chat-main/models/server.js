const express = require("express");
const path = require("path");
const cors = require("cors");
const { socketController } = require("../socket/socket.controller");



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.middlewares();

        this.sockets();
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // directorio publico
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }

    sockets() {
        this.io.on('connection',(socket) => socketController(socket, this.io) );
    }


    listen() {
        this.server.listen(this.port, () => console.log("Servidor corriendo en el puerto", this.port));
    }
}

module.exports = Server;
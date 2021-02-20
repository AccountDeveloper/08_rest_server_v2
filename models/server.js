require('dotenv').config();
const express = require('express');
var cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //middlewares
        this.middlewares();
        //routes
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Parse y lectura de body
        this.app.use(express.json());

        //directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/userRoutes'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Run in port ' + this.port);
        });
    }
}

module.exports = Server;
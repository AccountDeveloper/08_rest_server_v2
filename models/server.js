require('dotenv').config();
const express = require('express');
var cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //
        this.paths = {
                auth: '/api/auth',
                buscar: '/api/buscar',
                categorias: '/api/categorias',
                productos: '/api/productos',
                usuarios: '/api/usuarios'
            }
            //this.authPath = '/api/auth';
            //this.usuariosPath = '/api/usuarios';

        //conectar base de datos
        this.ConnectDB();
        //middlewares
        this.middlewares();
        //routes
        this.routes();
    }

    async ConnectDB() {
        await dbConnection();
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
        this.app.use(this.paths.auth, require('../routes/authRoutes'));
        this.app.use(this.paths.buscar, require('../routes/searchRoutes'));
        this.app.use(this.paths.categorias, require('../routes/categoryRoutes'));
        this.app.use(this.paths.productos, require('../routes/productRoutes'));
        this.app.use(this.paths.usuarios, require('../routes/userRoutes'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Run in port ' + this.port);
        });
    }
}

module.exports = Server;
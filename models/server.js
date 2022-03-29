const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../databases/config');
class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            usuarios: '/api/usuarios',
            categorias: '/api/categorias'
        }

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middleware();
        //Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleware(){
        //CORS
        this.app.use(cors())
        //Lectura y parseo del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
       this.app.use(this.paths.usuarios,require('../routes/usuarios'))
       this.app.use(this.paths.categorias,require('../routes/categorias'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto: ',this.port);
        });
    }
}


module.exports = Server;
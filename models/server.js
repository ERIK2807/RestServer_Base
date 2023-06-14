const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config') // dbConnection es un array, se desestructura.
class Server{
    constructor(){
        this.app = express();
        // si la variable existe envía env.port , si no existe envía el 8082
        this.port = process.env.PORT || 8082  
        this.userpath = '/api/user'
        
        //conectar a la DataBase
        this.conectarDB();

        //middlewares: 
        //funciones que van añadir otra funcionalidad, siempre se ejecuta cuando levantemos nuestro servidor.
        this.middlewares();

        //Rutas de mi aplicación:
        this.routes();

    }
    // función para conectar a la DataBase
    async conectarDB(){
        await dbConnection()
    }
    
    middlewares(){
        //CORS
        this.app.use(cors());
        // lectura y parseo del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        //toma la ruta de user.js
        this.app.use(this.userpath, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, ()=> 
        console.log(`Servidor corriendo en localhost:${this.port}`))
    }

}
module.exports = Server;
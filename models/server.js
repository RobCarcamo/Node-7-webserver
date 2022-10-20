const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        
        this.userPath = '/api/user'
        this.authPath = '/api/auth'

        //Conect to DB
        this.connectDB()

        //Middlewares
        this.middlewares()
        //Routes
        this.routes()
    }

    async connectDB () {
        await dbConnection()
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        //Body - JSON
        this.app.use( express.json())

        //public
        this.app.use(express.static('public'))
    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.userPath, require('../routes/user'))


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server corriendo en ${this.port}`);
        })
    }
}


module.exports = Server
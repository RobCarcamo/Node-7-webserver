const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        
        this.paths = {
            auth:'/api/auth',
            user:'/api/user',
            upload:'/api/upload'
        }

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

        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.user, require('../routes/user'))
        this.app.use(this.paths.upload, require('../routes/upload'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server corriendo en ${this.port}`);
        })
    }
}


module.exports = Server
const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async ( req = request, res = response, next) => {
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            msg: 'No existe token en la petición'
        })
    }
    try {

        const { uid } =  jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const user = await User.findById(uid)

        if(!user){
            return res.status(401).json({
                msg:'Token no valido - Usuario no existe'
            })
        }

        //check: user enable
        if(!user.estado){
            return res.status(401).json({
                msg:'Token no valido'
            })
        }

        req.user = user

        next()
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }
    

}

module.exports = {
    validateJWT
}
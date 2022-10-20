const { respose, request } = require('express')
const bcryptjs = require('bcryptjs')
const { generateJWT } = require('../helpers/generate-jwt')

const Usuario = require('../models/user')

const login = async (req, res = respose) => {

    const {correo, password} = req.body

    try {
        //check if exists mail
        const usuario = await Usuario.findOne({correo})

        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            })
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario deshabilitado'
            })
        }

        //check if user is active
        const isValidPassword = bcryptjs.compareSync(password, usuario.password)
        if(!isValidPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            })
        }

        //Generate JWT
        const token = await generateJWT(usuario.id)


        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log('error', error)
    }
    
}


module.exports = {
    login,
}
const { respose, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/user')


const userGet = async (req = request, res = respose) => {

    const { limite = 5, desde = 0 } = req.query

    const query = { estado: true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}
const userPost = async (req, res = respose) => {

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })

    //Encrypt pass
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save()

    res.json({
        usuario
    })
}
const userPut = async (req, res = respose) => {
    const { id } = req.params

    const { _id, password, gogle, correo, ...resto } = req.body

    if (password) {
        //Encrypt pass
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        usuario
    })
}
const userDelete = async (req, res = respose) => {

    const { id } = req.params
    const uid = req.uid

    // //Delete direct on BD
    // const usuario = await Usuario.findByIdAndDelete(id)

    //Partial delete
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    const userLoged = req.user


    res.json({usuario, userLoged})
}
const userPatch = (req, res = respose) => {
    res.json({
        msg: 'patch API - controller'
    })
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}
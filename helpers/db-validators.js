
const Role = require('../models/role')
const Usuario = require('../models/user')

const existsMail = async (email = '') => {
    const existsMail = await Usuario.findOne({ correo: email })

    if (existsMail) {
        throw new Error(`El correo: ${email} ya registrado`)
    }
}

const existsUserById = async (id = '') => {
    const existsUser = await Usuario.findById(id)

    if (!existsUser) {
        throw new Error(`El id: ${id} no existe`)
    }
}

const isValidRole = async (rol = '') => {
    const existsRole = await Role.findOne({ rol })

    console.log(existsRole);
    if (!existsRole) {
        throw new Error(`El rol ${rol} no existe en la BD.`)
    }
}



module.exports = {
    existsMail
    , existsUserById
    , isValidRole
}
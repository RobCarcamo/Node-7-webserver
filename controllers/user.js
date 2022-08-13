const { respose, request } = require('express')


const userGet = (req = request, res = respose) => {
    const { q, a } = req.query

    res.json({
        msg: 'get API - controller',
        q,
        a
    })
}
const userPost = (req, res = respose) => {

    const body = req.body

    res.json({
        msg: 'post API - controller',
        body
    })
}
const userPut = (req, res = respose) => {
    const { id } = req.params

    res.json({
        msg: 'put API - controller',
        id
    })
}
const userDelete = (req, res = respose) => {
    res.json({
        msg: 'delete API - controller'
    })
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
const { request, response } = require("express");


const isAdminRole = (req = request, res = response, next) => {
    if(!req.user){
        return res.status(500).json({
            msg: 'Cannot verify rol for user undefined'
        })
    }

    const { rol, nombre } = req.user

    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} is not Admin`
        })
    }

    next()
}

const isAnyRole = (...roles) => {
    
    return (req = request, res = response, next) => {

        if(!roles.includes(req.user.rol))
        {
            return res.status(401).json({
                msg: `The service need someone of this roles ${roles}`
            })
        }

        next()
    }
}


module.exports = {
    isAdminRole,
    isAnyRole
}
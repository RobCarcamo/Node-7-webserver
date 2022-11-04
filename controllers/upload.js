const { response } = require("express");


const uploadFile = (req, res = response) => {

    res.json({
        msg:"load file"
    })
}

module.exports = {
    uploadFile
}
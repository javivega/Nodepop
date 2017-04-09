"use strict";

const fs = require('fs');
const localConfig = require('../localConfig');
const mensajesError = require('../mensajesError.json');

module.exports = function(req, res, codeError, status){
    const lang = localConfig.languages[1];

    let langRequired = null;

    if(req.headers['accept-language']){
        langRequired = req.headers['accept-language'];
    }

    console.log(langRequired);

    fs.readFile(localConfig.MENSAJES_ERROR, 'utf8', function(err, data){
        if(err){
            console.log("Error not found" + localConfig.MENSAJES_ERROR, err);
        }

        const errores = JSON.parse(data);

        let errorMessages = errores[lang][codeError];

        if(errores && langRequired && errores[langRequired][codeError]){
            errorMessages = errores[langRequired][codeError];
        }

        res.status(status).json({sucess: false, codeError: codeError, error: errorMessages});
    })
}



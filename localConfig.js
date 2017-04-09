"use strict";


//exporto un objeto de configuracion con propiedades, una de ellas llamada jwt con los datos de mi config de jwt
module.exports = {
    MENSAJES_ERROR: 'mensajesError.json',
    jwt: {
        secret: 'secretsupersecreta',
        expiresIn: '2d'
    },
    languages: [
        'es',
        'en'
    ]
};
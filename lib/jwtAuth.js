"use strict";

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');
const customError = require('./customErrors');


module.exports = function(req, res, next){
    const token = req.body.token || req.query.token || req.get('x-acess-token');

    if(!token){
        return customError(req, res, "NO_TOKEN_PROVIDED", 401);
    }

    jwt.verify(token, localConfig.jwt.secret, function(err, decode){
        if(err){
            return customError(req, res, "INVALID CREDENTIALS", 401);
        }

        req.user_id = decode.user_id;
        next();
    })
}
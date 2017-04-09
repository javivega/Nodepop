"use strict";

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');
const localConfig = require('../../localConfig');
const sha256 = require('sha256');
const customError = require('../../lib/customErrors');



//Creaccion de usuarios via Post
router.post('/', function(req, res, next){
    const nuevoUsuario = new User(req.body);
    nuevoUsuario.password = sha256(nuevoUsuario.password);

    nuevoUsuario.save(function(err, user){
        if(err){
            if(err.code === 11000){
                return customError(req, res, "NAME_EXIST", 400)
            }
        }
        res.json({sucess: true, result: user})
    });
});

//Metodo post para la autenticacion de usuarios
router.post('/authenticate', function(req, res, next){
    const nombre = req.body.nombre;
    let password = req.body.password;
    password = sha256(password);

    User.findOne({nombre: nombre}).exec(function(err, user){
        if(err){
            return customError(req, res, "NAME_EXIST", 400);
        }
        if(!user){
            return customError(req, res, "USR_NOT_FOUND", 401);
        }
        if(password !== user.password){
            return customError(req, res, "INVALID CREDENTIALS", 401);
        }

        jwt.sign({user_id: user._id}, localConfig.jwt.secret, {expiresIn: localConfig.jwt.expiresIn}, function(err, token){
            res.json({sucess: true, token});
        })
    })

})

module.exports = router;
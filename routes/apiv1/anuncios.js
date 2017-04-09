"use strict";


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

const jwtAuth = require('../../lib/jwtAuth');
const customError = require('../../lib/customErrors');
router.use(jwtAuth);


//Api para la obtención del listado de anuncios con páginacion, ordenación y filtrado por ciertos campos
router.get('/', function(req, res, next){
    const tags = req.query.tags;
    const venta = req.query.venta;
    const nombre = req.query.nombre;
    const precio = req.query.precio || '';
    const limit = parseInt(req.query.limit, 6);
    const skip = parseInt(req.query.skip, 6);
    const sort = req.query.sort;
    const limitePrecio = precio.split('-');
    
    

    //Creo objeto de filtro vacio y los condicionales que van llenándolo si existe dicho filtro.
    const filter = {};
    if(tags){
        filter.tags = { $in: tags.split(',')};
    }
    if(venta){
        if(venta === 'true'){
            filter.venta = true;
        }
        if(venta === 'false'){
            filter.venta = false;
        }
    }
    if(nombre){
        filter.nombre = new RegExp(`^${nombre}`, 'i');
    }

    //Filtrado por precio mayor y menor
    
    if(limitePrecio.length === 1){
        if(limitePrecio[0] !== ''){
            filter.precio = limitePrecio[0];
        }
    }

    if(limitePrecio.length === 2) {
        filter.precio = {};
        if(limitePrecio[0] !== ''){
            filter.precio.$gte = limitePrecio[0];
        }
        if(limitePrecio[1] !== ''){
            filter.precio.$lte = limitePrecio[1]
        }
    }     
    
    //uso el método list para recuperar los archivos.
    Anuncio.list(filter, limit, skip, sort, function(err, rows){
        if(err){
            return customError(req, res, "ANC_NOT_FOUND", 401);
        }

        res.json({success:true, result: rows})
    })
    
})

router.get('/tags', function(req, res, next){
    const query = Anuncio.find().select({tags:1, _id:0});
    query.exec(function(err, rows){
        if(err){
            next(err);
        }
        res.json({sucess: true, result: rows})
    })
})

module.exports = router;
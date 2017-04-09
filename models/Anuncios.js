'use strict';

const mongoose = require('mongoose');

const anunciosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    venta: {
        type: Boolean,
        default: true
    },
    precio: {
        type: Number,
        required: true
    },
    foto: {
        type: String,
        default: ''
    },
    tags: {
        type: [
            {
                type: String,
                tagList: ['work', 'lifstyle', 'motor', 'mobile']
            }
        ],
        required: true
    }
})

anunciosSchema.statics = {
    list(filter, limit, skip, sort, cb) {
        const query = Anuncio.find(filter);
        query.limit(limit);
        query.skip(skip);
        query.sort(sort);
        query.exec(cb);
    },
    delete(){
        return Anuncio.deleteMany().exec();
    },
    insert(anuncios){
        return Anuncio.insertMany(anuncios);
    }
}

var Anuncio = mongoose.model('Anuncio', anunciosSchema);
module.exports = Anuncio;

//Creaccion de anuncio de prueba usando Schema de mongoose
/*
const anuncio = new Anuncio({nombre: "Coche carreras", venta: true, precio: 450, tags: 'work'})

anuncio.save();
*/
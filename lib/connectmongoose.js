"use strict";

const mongoose = require('mongoose');
const conn = mongoose.connection;


//hereda de un eventemitter, me subscribo a posibles errores
conn.on('error', function(err){
    console.log('Error de conexion: ', err);
    process.exit(1);
})

//al emitirse el evento open la primera vez, ejecuta l oque le paso en la funcion

conn.once('open', function(){
    console.log('Conectado a MongoDB.');
});

mongoose.connect('mongodb://localhost:27017/anuncios');
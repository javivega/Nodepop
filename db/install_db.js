"use strict";

const Anuncios = require('../models/Anuncios');
const User = require('../models/Users');
const path = require('path');
const fs = require('fs');

require('../lib/connectmongoose');

//Creaccion de promesas que al resolverse satisfactoriamente me borran anuncios y usuarios y me carga anuncios y usuarios

function borradoAnuncios(){
    return new Promise(function(resolve, reject){
        resolve(Anuncios.delete());
    });
};

function borradoUsuarios(){
    return new Promise(function(resolve, reject){
        resolve(User.delete());
    });
};



function leeAnuncios(path){
    return new Promise(function(resolve, reject){
        fs.readFile(path, function(err,data){
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
};

function toJson(data){
    return new Promise(function(resolve, reject){
        resolve(JSON.parse(data.toString()));
    });
};


function iniciaAnuncios(json){
    return new Promise(function(resolve, reject){
        resolve(Anuncios.insert(json))
    });
};

Promise.all([
    borradoAnuncios(),
    borradoUsuarios()
]).then(() => leeAnuncios(path.join(__dirname, 'anuncios.json')))
    .then(toJson)
    .then(json => Promise.all([
        Anuncios.insert(json.anuncios),
        User.insert(json.users)]))
    .then((data) => {
    console.log('Advertisements:', data);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error Instalando la DB:', err);
    process.exit(1);
  });
   


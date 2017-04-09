'use strict';

const mongoose = require('mongoose');

const usuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        index: { unique: true }
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

usuariosSchema.statics = {
    delete(){
        return User.deleteMany().exec();
    },
    insert(users){
        return Promise.all(users.map(user => User.create(user)));
    }
}

var User = mongoose.model('User', usuariosSchema);
module.exports = User;
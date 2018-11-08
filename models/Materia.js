var mongoose = require('mongoose');

let Materia = new mongoose.Schema({
    nombre: String,
    uv: Number,
    descripcion: String
});

module.exports = mongoose.model('materia', Materia);
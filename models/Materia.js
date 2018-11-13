var mongoose = require('mongoose');

let Materia = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    uv: Number,
    descripcion: String
});

module.exports = mongoose.model('materia', Materia);
const mongoose = require('mongoose');
const { Schema } = mongoose

const servicioSchema = new Schema({
    nombre: String,
    descripcion: String,
    tiempoEstimado: Number,
    precio: Number,
    placa: String,
    imagen: String,
    fechaRealizacionServicio: { type: Date, default: Date.now }
})

module.exports = mongoose.model('servicios', servicioSchema)
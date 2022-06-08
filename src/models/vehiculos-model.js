const mongoose = require('mongoose');
const {Schema} = mongoose

const vehiculoSchema = new Schema({
    marca: String,
    modelo: String,
    tipoVehiculo: String,
    placa: String,
    descripciónFalla: String,
    soadActivo: {type: Boolean, default: true},
    fechaIngreso: {type: Date, default:Date.now}
})

module.exports = mongoose.model('vehiculo', vehiculoSchema)
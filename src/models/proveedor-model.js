const mongoose = require('mongoose');
const {Schema} = mongoose

const proveedorSchema = new Schema({
    nombre: String, 
    nit: String, 
    pais: String, 
    direccion: String, 
    telefono: String, 
    correo: String, 
    fechaIngreso: {type: Date, default:Date.now}
})

module.exports = mongoose.model('proveedor', proveedorSchema)
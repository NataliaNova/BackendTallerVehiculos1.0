const mongoose = require('mongoose');
const {Schema} = mongoose

const agendaSchema = new Schema({
    fechaSolicitud: Date,
    nombres: String, 
    apellidos: String, 
    placa: String, 
    servicio: String,
    correo: String,
    telefono: String, 
    comentarios: String,
})

module.exports = mongoose.model('agenda', agendaSchema)
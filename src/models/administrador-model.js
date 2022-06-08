const mongoose = require("mongoose");
const { Schema } = mongoose;

const administradorSchema = new Schema({
  nombres: String,
  apellidos: String,
  documento: String,
  telefono: String,
  email: String,
  contrasena: String,
  taller: String,
  rol: String,
  fechaIngreso: { type: Date, default: Date.now },
});

module.exports = mongoose.model("administrador", administradorSchema);

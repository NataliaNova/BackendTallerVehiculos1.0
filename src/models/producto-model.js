const mongoose = require("mongoose");
const { Schema } = mongoose;

const productoSchema = new Schema({
  nombre: String,
  marca: String,
  descripcion: String,
  imagen: String,
  precio_compra: Number,
  precio_venta: Number,
  cantidad: Number,
  estadoActivo: { type: Boolean, default: true },
  fechaIngreso: { type: Date, default: Date.now },
});

module.exports = mongoose.model("producto", productoSchema);

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var detalleVentaProductoSchema = Schema({
  idproducto: { type: Schema.ObjectId, ref: "producto" },
  cantidad: Number,
  venta: { type: Schema.ObjectId, ref: "ventaProducto" },
});

module.exports = mongoose.model(
  "detalleVentaProducto",
  detalleVentaProductoSchema
);

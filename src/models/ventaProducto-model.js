var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ventaProductoSchema = Schema({
  idcliente: { type: Schema.Types.ObjectId, ref: "cliente" },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ventaProducto", ventaProductoSchema);

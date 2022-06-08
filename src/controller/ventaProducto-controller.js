const ventaCtrl = {};
const ventaProductoModel = require("../models/ventaProducto-model");
const productoModel = require("../models/producto-model");
const detalleVentaProductoModel = require("../models/detalleVentaProducto-model");

ventaCtrl.generarVentaProducto = async (req, res) => {
  let data = req.body;
  const { idcliente } = req.body;
  const nuevaVentaProducto = new ventaProductoModel({
    idcliente,
  });
  await nuevaVentaProducto.save((err, ventaProducto_save) => {
    if (ventaProducto_save) {
      let detalles = data.detalles;
      detalles.forEach((element, index) => {
        var detalleVentaProducto = new detalleVentaProductoModel();
        detalleVentaProducto.idproducto = element.idproducto;
        detalleVentaProducto.cantidad = element.cantidad;
        detalleVentaProducto.venta = venta_save._id;

        detalleVentaProducto.save((err, detalle_save) => {
          if (detalle_save) {
            productoModel.findById(
              { _id: element.idproducto },
              (err, producto_data) => {
                if (producto_data) {
                  productoModel.findByIdAndUpdate(
                    { _id: producto_data._id },
                    {
                      cantidad:
                        parseInt(producto_data.cantidad) -
                        parseInt(element.cantidad),
                    },
                    (err, producto_edit) => {
                      res.json({
                        mensaje: "La venta ha sido realizada",
                      });
                    }
                  );
                } else {
                  res.send(err);
                }
              }
            );
          } else {
            res.send(err);
          }
        });
      });
    } else {
      res.send(err);
    }
  });
};

module.exports = ventaCtrl;

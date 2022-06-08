const { Router } = require("express");
const router = Router();
const ventaCtrl = require("../controller/ventaProducto-controller");

//router.post('/crearVenta2',ventaCtrl.registrar);
router.post("/crearVentaProducto", ventaCtrl.generarVentaProducto);
// router.get("/listar", ventaCtrl.listar);
// router.get("/listarDetalles/:id", ventaCtrl.listarDetalle);
// router.get("/listarId/:id", ventaCtrl.listarId);
//router.get('/venta/data/:id',ventaCtrl.crearventa);

module.exports = router;

const { Router } = require("express");
const router = Router();
const productoCtr = require("../controller/producto-controller");

const auth = require("../helper/auth");

router.post("/crearProducto", productoCtr.crearProducto);
router.get("/listarProductos", productoCtr.listarProductos);
router.get("/listarProductosId/:id", productoCtr.listarProductosId);
router.put(
  "/actualizarProducto",
  auth.verificarToken,
  productoCtr.actualizarProducto
);
router.delete(
  "/eliminarProducto",
  auth.verificarToken,
  productoCtr.eliminarProducto
);

module.exports = router;

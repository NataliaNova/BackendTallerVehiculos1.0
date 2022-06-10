const { Router } = require("express");
const router = Router();
const productoCtr = require("../controller/producto-controller");
const multipart = require("connect-multiparty");
const path = multipart({ uploadDir: "src/uploads/productos" });

const auth = require("../helper/auth");

router.post("/crearProducto", path, productoCtr.crearProducto);
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

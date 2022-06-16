const { Router } = require("express");
const router = Router();
const productoCtr = require("../controller/producto-controller");
const multipart = require("connect-multiparty");
const path = multipart({ uploadDir: "src/uploads/productos" });

const auth = require("../helper/auth");

router.post("/crearProducto", path, productoCtr.crearProducto);
router.get("/listarProductos", productoCtr.listarProductos);
//router.get("/listarNombre/:nombre", productoCtrl.listarNombre);
router.get("/listarProductosId/:id", productoCtr.listarProductosId);
router.put("/actualizarProducto/:id", productoCtr.actualizarProducto);

router.delete("/eliminarProducto/:id", productoCtr.eliminarProducto);

router.get("/producto/img/:img", productoCtr.obtenerImagen);

module.exports = router;

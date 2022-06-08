const { Router } = require("express");
const router = Router();
const adminCtrl = require("../controller/administrador-controller");
const auth = require("../helper/auth");

router.post("/crearAdmin", adminCtrl.crearAdmin);
router.post("/loginAdmin", adminCtrl.login);
router.post("/actualizarAdmin", adminCtrl.actualizarAdmin);
router.delete("/eliminarAdmin", adminCtrl.eliminarAdmin);

module.exports = router;

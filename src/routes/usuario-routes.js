const { Router } = require("express");
const router = Router();
const usuarioCtrl = require("../controller/usuario-controller");
const auth = require("../helper/auth");

router.post("/crearUsuario", usuarioCtrl.crearUsuario);
router.post("/login", usuarioCtrl.login);

router.put("/actualizarUsuario/:id", usuarioCtrl.actualizarUsuario);

router.delete("/eliminarUsuario/:id", usuarioCtrl.eliminarUsuario);

module.exports = router;

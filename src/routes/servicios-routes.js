const { Router } = require('express');
const router = Router();
const servicioCtr = require('../controller/servicio-controller');
const multipart = require("connect-multiparty");
const path = multipart({ uploadDir: "src/uploads/servicios" });

const auth = require('../helper/auth');

router.post('/crearServicio', path, servicioCtr.crearServicio);
router.get('/listarServicios', servicioCtr.listarServicios);
router.put('/actualizarServicio', auth.verificarToken, servicioCtr.actualizarServicios);
router.delete('/eliminarServicio/:id', servicioCtr.eliminarServicio);

router.get("/servicios/img/:img", servicioCtr.obtenerImagen);

module.exports = router;
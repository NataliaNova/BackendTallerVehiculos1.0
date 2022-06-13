const { Router } = require('express');
const router = Router();
const serviciosCtr = require('../controller/servicio-controller');
const multipart = require("connect-multiparty");
const path = multipart({ uploadDir: "src/uploads/servicios" });

const auth = require('../helper/auth');

router.post('/crearServicio', path, serviciosCtr.crearServicio);
router.get('/listarServicios', serviciosCtr.listarServicios);
//router.get('/listarServiciosPorPlaca/:placa', serviciosCtr.listarServiciosPlaca);
router.put('/actualizarServicio', auth.verificarToken, serviciosCtr.actualizarServicios);
router.delete('/eliminarServicio', auth.verificarToken, serviciosCtr.eliminarServicio);

module.exports = router
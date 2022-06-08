const {Router} = require('express');
const router = Router();
const vehiculoCtr = require('../controller/vehiculo-controller')

const auth = require('../helper/auth');

router.post('/crearVehiculo', vehiculoCtr.crearVehiculo);
router.get('/listarVehiculosPorPlaca/:placa', vehiculoCtr.buscarVehiculoPlaca);
router.get('/listarVehiculosTodos', vehiculoCtr.listarVehiculosTodos);
router.put('/actualizarVehiculo/:placa', vehiculoCtr.actualizarVehiculo);
router.delete('/eliminarVehiculo/:placa', vehiculoCtr.eliminarVehiculo);

module.exports = router
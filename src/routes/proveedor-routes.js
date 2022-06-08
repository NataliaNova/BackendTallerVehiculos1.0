const {Router} = require('express');
const router = Router();
const proveedorCtr = require('../controller/proveedor-controller');

const auth = require('../helper/auth');

router.post('/crearProveedor', proveedorCtr.crearProveedor);
router.get('/listarProveedores', proveedorCtr.listarProveedores);
router.get('/listarProveedoresPorNIT/:nit', proveedorCtr.listarProveedoresNit);
router.put('/actualizarProveedores', auth.verificarToken, proveedorCtr.actualizarProveedor);
router.delete('/eliminarProveedores', auth.verificarToken, proveedorCtr.eliminarProveedor);

module.exports = router
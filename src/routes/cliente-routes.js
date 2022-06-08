const {Router} = require('express');
const cli = require('nodemon/lib/cli');
const router = Router();
const clienteCtr = require('../controller/cliente-controller')

const auth = require('../helper/auth');

router.post('/crearCliente', clienteCtr.crearCliente);
router.post('/loginCliente', clienteCtr.login);
router.get('/listarclientes', clienteCtr.listarClientes);
router.put('/actualizarCliente', auth.verificarToken, clienteCtr.actualizarCliente);

module.exports = router
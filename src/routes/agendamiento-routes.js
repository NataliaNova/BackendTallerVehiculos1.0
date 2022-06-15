const {Router} = require('express');
const cli = require('nodemon/lib/cli');
const router = Router();
const agendamientoCtr = require('../controller/agendamiento-controller')

router.post('/crearAgendamiento', agendamientoCtr.crearAgendamiento);
router.get('/listarAgendamiento', agendamientoCtr.listarAgendamiento);
router.put('/actualizarAgendamiento/:id', agendamientoCtr.actualizarAgendamiento);
router.delete('/eliminarAgendamiento/:id', agendamientoCtr.eliminarAgendamiento);


module.exports = router
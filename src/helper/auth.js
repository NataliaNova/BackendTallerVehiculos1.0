const auth = {};
const jwt = require('jsonwebtoken');

/* Validación por diferencia del token */
auth.verificarToken = (req, res, next) => {
    if(!req.header.autorizacion){
        return res.json({
            mensaje: 'No estás autorizado'
        })
    }

    /* Cierre de sesión, por eliminación del token - Token Nulo */
    const token = req.header.autorizacion
    if(token === 'null'){
        res.json({
            mensaje: 'No estás autorizado'
        })
    }

    jwt.verify(token, 'Secreta', (error, resultado) => {
        if(error){
            return res.json({
                mensaje: 'No estás autorizado'
            })

            next();
        }
    })
}

module.exports = auth
const proveedorCtr = {};
const proveedorModel = require('../models/proveedor-model');


// Crear Proveedor
proveedorCtr.crearProveedor = async(req, res) => {
    const {nombre, nit, pais, direccion, telefono, correo} = req.body
    const nuevoProveedor = new proveedorModel({
        nombre, 
        nit, 
        pais, 
        direccion, 
        telefono, 
        correo
    })

    await proveedorModel.Save()
    res.json({
        mensaje: 'El proveedor ha sido creado con exito!'
    })
}

// Listar Proveedores
proveedorCtr.listarProveedores = async(req, res) => {
    const respuesta = await proveedorModel.find()
    res.json(respuesta)
}

// Listar Proveedor por NIT
proveedorCtr.listarProveedoresNit = async(req, res) => {
    const nit = req.params.nit
    const respuesta = await proveedorModel.findOne({nit:nit})
    res.json(respuesta)
}

// Actualizar Proveedor
proveedorCtr.actualizarProveedor = async(req, res) => {
    const nit = req.params.nit
    await proveedorModel.findOneAndUpdate({nit:nit}, req.body)
    const respuesta = proveedorModel.findOne({nit:nit})
    res.json({
        mensaje: 'El proveedor ha sido actualizado',
        respuesta
    })
}

// Eliminar Proveedor
proveedorCtr.eliminarProveedor = async(req, res) => {
    const nit = req.params.nit
    await proveedorModel.findOneAndRemove({nit:nit})
    res.json({
        mensaje: 'El proveedor ha sido eliminado'
    })
}

module.exports = proveedorCtr



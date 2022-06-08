const servicioCtr = {};
// const req = require('express/lib/request');
const servicioModel = require('../models/servicios-model')


// Crear Servicios
servicioCtr.crearServicio = async(req, res) => {
    const {nombre, descripcion, tiempoEstimado,  precio, placa} = req.body
    const nuevoServicio = new servicioModel({
        nombre, 
        descripcion, 
        tiempoEstimado,  
        precio, 
        placa
    })

    await nuevoServicio.save()
    res.json({
        mensaje: 'El servicio ha sido creado satisfactoriamente!'
    })
}

// Listar Servicios Generales
servicioCtr.listarServicios = async(req, res) => {
    const respuesta = await servicioModel.find()
    res.json(respuesta)
}

// Listar Servicios por placa
servicioCtr.listarServiciosPlaca = async(req, res) => {
    const respuesta = await servicioModel.findOne({placa:placa})
    res.json(respuesta)
}

// Actualizar Servicios
servicioCtr.actualizarServicios = async(req, res) => {
    const id = req.params.id
    await servicioModel.findByIdAndUpdate({_id:id}, req.body)
    const respuesta = await servicioModel.findById({_id:id})
    res.json({
        mensaje: 'El servicio ha sido actualizado',
        respuesta
    })
}

// Eliminar Servicio

servicioCtr.eliminarServicio = async(req, res) => {
    const id = req.params.id
    await servicioModel.findByIdAndRemove({_id:id})
    res.json({
        mensaje: 'El servicio ha sido eliminado satisfactoriamente'
    })
}

module.exports = servicioCtr
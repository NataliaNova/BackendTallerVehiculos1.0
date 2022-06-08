const vehiculoCtr = {};
const vehiculoModel = require('../models/vehiculos-model')


// Crear Vehiculo
vehiculoCtr.crearVehiculo = async(req, res) => {
    const {marca, modelo, tipoVehiculo, placa, descripciónFalla} = req.body
    const nuevoVehiculo = new vehiculoModel({
        marca,
        modelo,
        tipoVehiculo,
        placa,
        descripciónFalla
    })

    const placaValidacion = await vehiculoModel.findOne({placa:placa})
    if(placaValidacion){
        res.json({
            mensaje: 'El vehiculo ya se encuentra registrado'
        })
    }
    else{
        await nuevoVehiculo.save()
        res.json({
            mensaje: 'El vehiculo fue creado con éxito'
        })
    }
}


// Listar vehiculos
vehiculoCtr.listarVehiculosTodos = async(req, res) => {
    const respuesta = await vehiculoModel.find()
    res.json(respuesta)
}

// Buscar vehiculo
vehiculoCtr.buscarVehiculoPlaca = async(req, res) =>{
    const placa = req.params.placa
    const respuesta = await vehiculoModel.findOne({placa:placa})
    res.json(respuesta)
}

// Actualizar Vehiculo
vehiculoCtr.actualizarVehiculo = async(req, res) => {
    const placa = req.params.placa
    await vehiculoModel.findOneAndUpdate({placa:placa}, req.body)
    const respuesta = await vehiculoModel.findOne({placa:placa})
    res.json({
        mensaje: 'El vehiculo ha sido actualizado',
        respuesta
    })
}

// Eliminar Vehiculo
vehiculoCtr.eliminarVehiculo = async(req, res) => {
    const placa = req.params.placa
    await vehiculoModel.findOneAndRemove({placa:placa})
    res.json({
        mensaje: 'Vehiculo ha sido eliminado con éxito'
    })
}

module.exports = vehiculoCtr


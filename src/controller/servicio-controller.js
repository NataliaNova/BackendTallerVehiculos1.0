const servicioCtr = {};
const servicioModel = require('../models/servicios-model');
const uploadsServicioControler = require("./uploadsServicios-controler");
const imagenCtrl = {};
const fs = require("fs");
const path = require("path");



// Crear Servicios
servicioCtr.crearServicio = async(req, res) => {
    const {
        nombre,
        descripcion,
        tiempoEstimado,
        precio,
        imagen,
    } = req.body;
    const nuevoServicio = new servicioModel({
        nombre,
        descripcion,
        tiempoEstimado,
        precio,
        imagen,
    });
    const documentoservicio = await servicioModel.findOne({ nombre: nombre });
    if (documentoservicio) {
        res.json({
            mensaje: "Este Servicio ya existe, por favor verifique.",
        });

    } else if (req.files) {
        const imagen_path = req.files.imagen.path;
        const name = imagen_path.split("\\");
        const imagenCargada = name[3];

        const nuevoServicio = new servicioModel({
            nombre,
            descripcion,
            tiempoEstimado,
            precio,
            imagen: imagenCargada

        });
        await nuevoServicio.save();
        res.json({
            mensaje: "El Servicio ha sido creado" + "en req files" + imagenCargada,
            nombre: nombre,
        });
    } else {
        const nuevoServicio = new servicioModel({
            nombre,
            descripcion,
            tiempoEstimado,
            precio,
            imagen: imagenCargada
        });
        await nuevoServicio.save();
        res.json({
            mensaje: "Servicio creado satisfactoriamente",
            nombre: nombre,
        });
    }
};

// Listar Servicios Generales
servicioCtr.listarServicios = async(req, res) => {
    const respuesta = await servicioModel.find()
    res.json(respuesta)
}


// Actualizar Servicios
servicioCtr.actualizarServicios = async(req, res) => {
    const id = req.params.id
    await servicioModel.findByIdAndUpdate({ _id: id }, req.body)
    const respuesta = await servicioModel.findById({ _id: id })
    res.json({
        mensaje: 'El servicio ha sido actualizado',
        respuesta
    })
}

// Eliminar Servicio

servicioCtr.eliminarServicio = async(req, res) => {
    const id = req.params.id
    await servicioModel.findByIdAndRemove({ _id: id })
    res.json({
        mensaje: 'El servicio ha sido eliminado satisfactoriamente'
    })
}

//ObtenerImagen
servicioCtr.obtenerImagen = async(req, res) => {
    const { img } = req.params;

    if (img != "null") {
        let path_img = "src/uploads/servicios/" + img;
        res.status(200).sendFile(path.resolve(path_img));
    } else {
        let path_img = "src/uploads/servicios/default.jpg";
        res.status(200).sendFile(path.resolve(path_img));
    }
};

(module.exports = servicioCtr), imagenCtrl;
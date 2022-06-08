const producCtr = {};
const productoModel = require("../models/producto-model");
const proveedorModel = require("../models/producto-model");
const imagenCtrl = {};
const uploadsProductoControler = require("../controller/uploadsProducto-controler");
const fs = require("fs");
const path = require("path");
// const multer = require("multer");

// Crear producto
producCtr.crearProducto = async (req, res) => {
  const {
    nombre,
    marca,
    descripcion,
    imagen,
    precio_compra,
    precio_venta,
    cantidad,
  } = req.body;
  const nuevoProducto = new productoModel({
    nombre,
    marca,
    descripcion,
    imagen,
    precio_compra,
    precio_venta,
    cantidad,
  });
  const documentoproducto = await productoModel.findOne({ nombre: nombre });
  if (documentoproducto) {
    res.json({
      mensaje: "Este producto ya existe",
    });
  } else if (req.files) {
    const imagen_path = req.files.imagen.path;
    const name = imagen_path.split("\\");
    const imagenCargada = name[3];

    const nuevoProducto = new productoModel({
      nombre,
      marca,
      descripcion,
      imagen,
      // imagen: imagenCargada,
      precio_compra,
      precio_venta,
      cantidad,
    });
    await nuevoProducto.save();
    res.json({
      mensaje: "El producto ha sido creado" + "en req files" + imagenCargada,
      nombre: nombre,
    });
  } else {
    const nuevoProducto = new productoModel({
      nombre,
      marca,
      descripcion,
      imagen,
      precio_compra,
      precio_venta,
      cantidad,
    });
    await nuevoProducto.save();
    res.json({
      mensaje: "Producto creado",
      nombre: nombre,
    });
  }
};

// Listar productos
producCtr.listarProductos = async (req, res) => {
  const respuesta = await productoModel.find();
  res.json(respuesta);
};

// Listar productos por ID
producCtr.listarProductosId = async (req, res) => {
  const id = req.params.id;
  const respuesta = await productoModel.findById({ _id: id });
  res.json(respuesta);
};

// Actualizar Productos
producCtr.actualizarProducto = async (res, req) => {
  const id = req.params.id;
  await proveedorModel.findByIdAndUpdate({ _id: id }, req.body);
  const respuesta = proveedorModel.findById({ _id: id });
  res.json({
    mensaje: "El producto fue actualizado con exito",
    respuesta,
  });
};

// Eliminar producto
producCtr.eliminarProducto = async (req, res) => {
  const id = req.params.id;
  await productoModel.findByIdAndRemove({ _id: id });
  res.json({
    mensaje: "El producto fue eliminado con exito!",
  });
};

//ObtenerImagen
producCtr.obtenerImagen = async (req, res) => {
  const { img } = req.params;

  if (img != "null") {
    let path_img = "src/uploads/productos/" + img;
    res.status(200).sendFile(path.resolve(path_img));
  } else {
    let path_img = "src/uploads/productos/default.jpg";
    res.status(200).sendFile(path.resolve(path_img));
  }
};

(module.exports = producCtr), imagenCtrl;

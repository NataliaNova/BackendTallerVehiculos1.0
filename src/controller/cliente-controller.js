const clientCtr = {};
const clienteModel = require("../models/cliente-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request");

// Crear Cliente
clientCtr.crearCliente = async (req, res) => {
  const {
    nombres,
    apellidos,
    documento,
    telefono,
    email,
    contrasena,
    rol,
    placas,
  } = req.body;
  const nuevoCliente = new clienteModel({
    nombres,
    apellidos,
    documento,
    telefono,
    email,
    contrasena,
    rol,
    placas,
  });

  const emailCliente = await clienteModel.findOne({ email: email });
  if (emailCliente) {
    res.json({
      mensaje: "El cliente ya se encuentra creado",
    });
  } else {
    nuevoCliente.contrasena = await bcrypt.hash(contrasena, 10);
    const token = jwt.sign({ _id: nuevoCliente._id }, "Secreta");
    await nuevoCliente.save();
    res.json({
      mensaje: "Bienvenido a tu taller de confianza",
      id: nuevoCliente._id,
      nombres: nuevoCliente.nombres,
      token,
    });
  }
};

// Login
clientCtr.login = async (req, res) => {
  const { email, contrasena } = req.body;
  const cliente = await clienteModel.findOne({ email: email });
  if (!cliente) {
    return res.json({
      mensaje: "El correo electrónico no es correcto",
    });
  }

  const match = await bcrypt.compare(contrasena, cliente.contrasena);
  if (match) {
    const token = jwt.sign({ _id: cliente._id }, "Secreta");
    res.json({
      mensaje: "¡Le damos la bienvenida a nuestro cliente favorito!",
      id: cliente._id,
      nombres: cliente.nombres,
      rol: cliente.rol,
      token,
    });
  } else {
    res.json({
      mensaje: "La contraseña no es correcta",
    });
  }
};

// Listar Clientes

clientCtr.listarClientes = async (req, res) => {
  const respuesta = await clienteModel.find();
  res.json(respuesta);
};

// Actualizar Cliente
clientCtr.actualizarCliente = async (req, res) => {
  const id = req.params.id;
  await clienteModel.findByIdAndUpdate({ _id: id }, req.body);
  const respuesta = await clienteModel.findById({ _id: id });
  res.json({
    mensaje: "El cliente ha sido actualizado",
    respuesta,
  });
};

module.exports = clientCtr;

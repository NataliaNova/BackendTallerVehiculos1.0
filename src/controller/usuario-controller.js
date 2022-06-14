const usuarioCtrl = {};
const usuarioModel = require("../models/usuario-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request");

usuarioCtrl.crearUsuario = async (req, res) => {
  const { nombres, apellidos, documento, telefono, email, contrasena, rol } =
    req.body;
  const nuevoUsuario = new usuarioModel({
    nombres,
    apellidos,
    documento,
    telefono,
    email,
    contrasena,
    rol,
  });

  const emailUsuario = await usuarioModel.findOne({ email: email });
  if (emailUsuario) {
    res.json({
      mensaje: "El usuario ya existe",
    });
  } else {
    nuevoUsuario.contrasena = await bcrypt.hash(contrasena, 10);
    const token = jwt.sign({ _id: nuevoUsuario._id }, "Secreta");
    await nuevoUsuario.save();
    res.json({
      mensaje: "Tu cuenta ha sido creada! Te damos la bienvenida",
      id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      token,
    });
  }
};

// Login
usuarioCtrl.login = async (req, res) => {
  const { email, contrasena } = req.body;
  const usuario = await usuarioModel.findOne({ email: email });
  if (!usuario) {
    return res.json({
      mensaje: "El correo electrónico no es correcto",
    });
  }

  const match = await bcrypt.compare(contrasena, usuario.contrasena);
  if (match) {
    const token = jwt.sign({ _id: usuario._id }, "Secreta");
    res.json({
      mensaje: "¡Te damos la bienvenida !",
      id: usuario._id,
      nombres: usuario.nombres,
      rol: usuario.rol,
      token,
    });
  } else {
    res.json({
      mensaje: "La contraseña no es correcta",
    });
  }
};

usuarioCtrl.actualizarUsuario = async (req, res) => {
  const id = req.params.id;
  await usuarioModel.findByIdAndUpdate({ _id: id }, req.body);
  const respuesta = await usuarioModel.findById({ _id: id });
  res.json({
    mensaje: "Usuario actualizado",
    respuesta,
  });
};

usuarioCtrl.eliminarUsuario = async (req, res) => {
  const id = req.params.id;
  await usuarioModel.findByIdAndRemove({ _id: id });
  res.json({
    mensaje: "Producto eliminado",
  });
};

module.exports = usuarioCtrl;

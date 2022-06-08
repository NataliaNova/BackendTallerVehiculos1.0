const adminCtrl = {};
const adminModel = require("../models/administrador-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Crear Admin
adminCtrl.crearAdmin = async (req, res) => {
  const {
    nombres,
    apellidos,
    documento,
    telefono,
    email,
    contrasena,
    taller,
    rol,
  } = req.body;
  const nuevoAdmin = new adminModel({
    nombres,
    apellidos,
    documento,
    telefono,
    email,
    contrasena,
    taller,
    rol,
  });

  const emailAdmin = await adminModel.findOne({ email: email });
  if (emailAdmin) {
    res.json({
      mensaje: "El Administrador ya se encuentra creado",
    });
  } else {
    nuevoAdmin.contrasena = await bcrypt.hash(contrasena, 10);
    const token = jwt.sign({ _id: nuevoAdmin._id }, "Secreta");
    await nuevoAdmin.save();
    res.json({
      mensaje: "Bienvenido Administrador",
      id: nuevoAdmin._id,
      nombres: nuevoAdmin.nombres,
      token,
    });
  }
};

//LoginAdmin
adminCtrl.login = async (req, res) => {
  const { email, contrasena } = req.body;
  const admin = await adminModel.findOne({ email: email });
  if (!admin) {
    return res.json({
      mensaje: "El correo electrónico no es correcto",
    });
  }

  const match = await bcrypt.compare(contrasena, admin.contrasena);
  if (match) {
    const token = jwt.sign({ _id: admin._id }, "Secreta");
    res.json({
      mensaje: "Bienvenido Administrador",
      id: admin._id,
      nombres: admin.nombres,
      token,
    });
  } else {
    res.json({
      mensaje: "La contraseña es incorrecta",
    });
  }
};

//ActualizarAdmin
adminCtrl.actualizarAdmin = async (req, res) => {
  const id = req.params.id;
  await adminModel.findByIdAndUpdate({ _id: id }, req.body);
  const respuesta = await adminModel.findById({ _id: id });
  res.json({
    mensaje: "Administrador actualizado",
    respuesta,
  });
};

//EliminarAdmin
adminCtrl.eliminarAdmin = async (req, res) => {
  const id = req.params.id;
  await adminModel.findByIdAndRemove({ _id: id });
  res.json({
    mensaje: "Administrador eliminado",
  });
};

module.exports = adminCtrl;

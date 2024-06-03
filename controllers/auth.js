const { response } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { validarJWT } = require("../middlewares/validar-jwt");

// req:  lo que la persona solicita
// res: lo que nosotros respondemos

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe un usuario con ese correo",
      });
    }

    usuario = new Usuario(req.body);

    // Encriptar contraseña
    const saltRounds = 10; // Número de rondas para la generación de la sal
    const salt = bcryptjs.genSaltSync(saltRounds);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    // Generar nuestr JWT
    const token = await generarJWT(usuario.id, usuario.nombre);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      nombre: usuario.nombre,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        message: "El usuario no existe con ese email",
      });
    }

    //Confirmar los dos password
    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validarPassword) {
      res.status(400).json({
        ok: false,
        message: "Contraseña incorrecta",
      });
    }

    // Generar nuestr JWT
    const token = await generarJWT(usuario.id, usuario.nombre);

    res.json({
      ok: true,
      uid: usuario.id,
      nombre: usuario.nombre,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const uid = req.uid;
  const nombre = req.nombre;

  // Genero un nuevo JWT y lo retorno
  const token = await generarJWT(uid, nombre);

  res.json({
    ok: true,
    uid,
    nombre,
    token: token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};

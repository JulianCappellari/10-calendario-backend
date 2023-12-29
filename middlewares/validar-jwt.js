const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  // Como voy a recibir el JWT -> x-token headers
  const token = req.header("x-token");

  //Validar token
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "No hay token en la peticion",
    });
  }

  try {
    const {uid, nombre} = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid
    req.nombre = uid

  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Token no valido",
    });
  }

  next();
};

module.exports = { validarJWT };

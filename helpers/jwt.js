const e = require("express");
const jwt = require("jsonwebtoken");

// los parametros de la funcion son lo que yo voy a poner en el body
const generarJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generarJWT,
};

const express = require("express");
const dbConnection = require("./database/configuracion");
require("dotenv").config();
const cors = require('cors');
// Crear el servidor de express
const app = express();

// Base de datos
dbConnection()

// CORS
app.use(cors())

// Directorio público
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json())

// Rutas
// TODO: auth // crear, login, renew
app.use("/api/auth", require("./routes/auth"));
// TODO: CRUD: Eventos
app.use("/api/eventos", require("./routes/eventos"));

const puerto = process.env.PORT || 4000;

// Escuchar peticiones
app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

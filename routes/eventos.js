/*
    Eventos Routes
    /api/eventos
*/

const { Router } = require("express");
const router = Router();

const { validarJWT } = require("../middlewares/validar-jwt");
const {
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/eventos");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const isDate = require("../helpers/isDate");

// Todas tienen que pasar por la validacion del token
router.use(validarJWT);

// Obtener eventos
router.get("/", obtenerEventos);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("titulo", "El titulo es obligatorio").not().isEmpty(),
    check("fechaInicio", "Fecha de inicio es obligatoria").custom(isDate),
    check("fechaFin", "Fecha de finalizacion es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// Actualizar evento
router.put("/:id", actualizarEvento);

// Borrar Evento
router.delete("/:id", eliminarEvento);

module.exports = router;

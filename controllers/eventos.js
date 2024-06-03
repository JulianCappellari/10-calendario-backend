const { response } = require("express");
const Evento = require("../models/Evento");

const obtenerEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("usuario", "nombre");

  return res.json({
    ok: true,
    eventos,
  });
};
const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.usuario = req.uid;

    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Hable con el administrador",
    });
  }
};
const actualizarEvento = async (req, res = response) => {
  const eventoid = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoid);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        message: "El evento no existe con ese id",
      });
    }

    // En caso de que este todo correcto
    // Verfifico que la persona sea la misma
    if (evento.usuario.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        message: "No tiene privilegio de editar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      usuario: uid,
    };

    // Actualizar evento
    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoid,
      nuevoEvento,
      { new: true }
    );

    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Hable con el administrador",
    });
  }
};
const eliminarEvento = async (req, res = response) => {
  const eventoid = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoid);

    // Comprobaciones
    if (!evento) {
      return res.status(404).json({
        ok: false,
        message: "El evento no existe con ese id",
      });
    }

    // En caso de que este todo correcto
    // Verfifico que la persona sea la misma
    if (evento.usuario.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        message: "No tiene privilegio de editar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      usuario: uid,
    };

    // Eliminar evento
    await Evento.findByIdAndDelete(eventoid);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Hable con el administrador",
    });
  }
};

module.exports = {
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};

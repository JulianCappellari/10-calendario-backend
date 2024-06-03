const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
  titulo: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
  },
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaFin: {
    type: Date,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  notas: {
    type: String
  }
});

EventoSchema.method('toJSON', function(){
  const { __v, _id, ...object} =  this.toObject()
  object.id = _id
  return object
})

module.exports = model("Evento", EventoSchema);


const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Calendario", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('DB andando')
  } catch (error) {
    console.log(error);
    throw new Error("Error al inicializar a la base de datos");
  }
};

module.exports = dbConnection;

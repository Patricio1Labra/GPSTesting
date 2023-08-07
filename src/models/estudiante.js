const mongoose = require('mongoose');
const { Schema } = mongoose;

const PruebaSchema = new Schema({
    _id: Number,
    rut: {type: Number },
    nombre: {type: String },
    apellido: {type: String},
    ramas: [
        {
          nombre: String,
          descripcion: String
        }
      ]
}, { versionKey: false });

module.exports = mongoose.model('Estudiante', PruebaSchema);
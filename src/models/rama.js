const mongoose = require('mongoose');
const { Schema } = mongoose;

const PruebaSchema = new Schema({
    nombre: {type: String },
    descripcion: {type: String},
    horario: {type: Date}
}, { versionKey: false });

module.exports = mongoose.model('Rama', PruebaSchema);
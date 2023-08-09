const mongoose = require('mongoose');

// Definir esquema Estudiante
const EstudianteSchema = new mongoose.Schema({
  nombre: String,
  carrera: String,
  correo: String,
  rut: String,
  telefono: String,
  descripcion: String,
  contraseña: String,
  ramaDeportiva: [String],
  implementosSolicitados: [String],
  recintoSolicitado: String
});

// Definir esquema Profesor
const profesorSchema = new mongoose.Schema({
  RUT: String,
  CONTRASEÑA: String,
  RAMAS: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rama' }]
});

// Definir esquema Rama
const RamaDeportivaSchema = new mongoose.Schema({
  alumnos: [String],
  nombre: String,
  descripcion: String,
  entrenador: String,
  horario: {
    dia: String,
    horaInicio: Date,
    horaSalida: Date
  },
  cupos: Number,
  recinto: String,
  entrenamiento: String
});

// Definir esquema EspacioDeportivo
const espacioDeportivoSchema = new mongoose.Schema({
  NOMBRE: String,
  UBICACION: String
});

// Definir modelos
const Estudiante = mongoose.model('Estudiante', EstudianteSchema);
const Profesor = mongoose.model('Profesor', profesorSchema);
const RamaDeportiva = mongoose.model('RamaDeportiva', RamaDeportivaSchema);
const EspacioDeportivo = mongoose.model('EspacioDeportivo', espacioDeportivoSchema);

module.exports = {
  Estudiante,
  Profesor,
  RamaDeportiva,
  EspacioDeportivo
};
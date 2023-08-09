const express = require('express');
const router = express.Router();
const {
  Estudiante,
  Profesor,
  RamaDeportiva,
  EspacioDeportivo
} = require('../models/modelo'); // Asegúrate de proporcionar la ruta correcta a tus modelos

router.get('/estudiantes', async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

router.get('/ramas', async (req, res) => {
    try {
      const ramas = await RamaDeportiva.find();
      res.json(ramas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener ramas' });
    }
  });

  router.get('/estudiantes/:id', async (req, res) => {
    try {
      const estudianteId = req.params.id;
      const estudiante = await Estudiante.findById(estudianteId);
      
      if (!estudiante) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
      
      res.json(estudiante);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener estudiante' });
    }
  });
  
  router.get('/ramas/:id', async (req, res) => {
    try {
      const ramaId = req.params.id;
      const rama = await RamaDeportiva.findById(ramaId);
      
      if (!rama) {
        return res.status(404).json({ message: 'Rama no encontrada' });
      }
      
      res.json(rama);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener rama' });
    }
  });

  router.post('/estudiantes', async (req, res) => {
    try {
      const nuevoEstudiante = await Estudiante.create(req.body);
      res.status(201).json(nuevoEstudiante);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear estudiante' });
    }
  });
  
  router.put('/estudiantes/:id', async (req, res) => {
    try {
      const estudianteId = req.params.id;
      const accion = req.body.accion; // Acción: 'agregar' o 'eliminar'
      const ramaId = req.body.ramaId; // ID de la rama a agregar o eliminar
  
      // Obtener el estudiante existente
      const estudianteExistente = await Estudiante.findById(estudianteId);
  
      if (accion === 'agregar') {
        // Verificar si la rama ya está en la lista de ramas del estudiante
        if (estudianteExistente.ramaDeportiva.includes(ramaId)) {
          return res.status(400).json({ error: 'La rama ya está registrada para este estudiante' });
        }
  
        // Agregar la nueva rama al arreglo de RAMAS del estudiante
        estudianteExistente.ramaDeportiva.push(ramaId);
      } else if (accion === 'eliminar') {
        // Eliminar la rama del arreglo de RAMAS del estudiante
        estudianteExistente.ramaDeportiva = estudianteExistente.ramaDeportiva.filter(id => id.toString() !== ramaId);
      }
  
      // Guardar el estudiante actualizado en la base de datos
      const estudianteEditado = await estudianteExistente.save();
  
      res.json(estudianteEditado);
    } catch (error) {
      res.status(500).json({ error: 'Error al editar estudiante' });
    }
  });  
  
  router.post('/ramas', async (req, res) => {
    try {
      const nuevaRama = await RamaDeportiva.create(req.body);
      res.status(201).json(nuevaRama);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear rama' });
    }
  });

  router.post('/profesores', async (req, res) => {
    try {
      const nuevoProfesor = await Profesor.create(req.body);
      res.status(201).json(nuevoProfesor);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear profesor' });
    }
  });
  
  router.post('/espaciosdeportivos', async (req, res) => {
    try {
      const nuevoEspacioDeportivo = await EspacioDeportivo.create(req.body);
      res.status(201).json(nuevoEspacioDeportivo);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear espacio deportivo' });
    }
  });
  
  router.put('/ramas/:id', async (req, res) => {
    try {
      const ramaId = req.params.id;
      const ramaEditada = await RamaDeportiva.findByIdAndUpdate(
        ramaId,
        req.body,
        { new: true }
      );
      res.json(ramaEditada);
    } catch (error) {
      res.status(500).json({ error: 'Error al editar rama' });
    }
  });

module.exports = router;
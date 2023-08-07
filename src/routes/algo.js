const express = require('express');
const router = express.Router();
const Estudiantes = require('../models/estudiante');
const Rama = require('../models/rama');

router.get('/r', async (req, res) => {
    try {
        const modelos = await Rama.find().exec();
        console.log(modelos);
        res.json(modelos); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor'); 
    }
});
router.get('/e', async (req, res) => {
    try {
        const modelos = await Estudiantes.find().exec();
        console.log(modelos);
        res.json(modelos); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor'); 
    }
});
router.get('/e/:id', async (req, res) => {
    try {
        const modelo = await Estudiantes.findById(req.params.id).exec();
        console.log(modelo);
        res.json(modelo); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor'); 
    }
});

router.post('/e', async (req, res) => {
    try {
        const nuevoModelo = new Estudiantes(req.body); // Suponiendo que estás pasando los datos en el cuerpo de la solicitud (req.body)
        const resultado = await nuevoModelo.save();
        console.log('Nuevo modelo guardado:', resultado);
        res.status(201).send(resultado); // 201: Created
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});
router.post('/r', async (req, res) => {
    try {
        const nuevoModelo = new Rama(req.body); // Suponiendo que estás pasando los datos en el cuerpo de la solicitud (req.body)
        const resultado = await nuevoModelo.save();
        console.log('Nuevo modelo guardado:', resultado);
        res.status(201).send(resultado); // 201: Created
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const nuevoModelo = new Estudiantes(req.body);
        const resultado = await Estudiantes.findByIdAndUpdate(id,nuevoModelo);
        
        if (resultado) {
            console.log('Modelo eliminado:', resultado);
            res.send(resultado);
        } else {
            res.status(404).send('No se encontró el modelo');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const resultado = await Estudiantes.findByIdAndUpdate(id);
        
        if (resultado) {
            console.log('Modelo eliminado:', resultado);
            res.send(resultado);
        } else {
            res.status(404).send('No se encontró el modelo');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
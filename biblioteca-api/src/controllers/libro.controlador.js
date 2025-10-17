const libroService = require('../services/libro.service');

async function getAllLibros(req, res) {
    try {
        const libros = await libroService.getAllLibros();
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createLibro(req, res) {
    try {
        const nuevoLibro = await libroService.createLibro(req.body);
        res.status(201).json(nuevoLibro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getAllLibros,
    createLibro,
};
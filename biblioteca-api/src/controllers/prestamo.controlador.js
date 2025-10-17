const prestamoService = require('../services/prestamo.service');

async function registrarPrestamo(req, res) {
    try {
        const nuevoPrestamo = await prestamoService.registrarPrestamo(req.body);
        res.status(201).json(nuevoPrestamo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function registrarDevolucion(req, res) {
    try {
        const devolucion = await prestamoService.registrarDevolucion(req.body);
        res.status(200).json(devolucion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    registrarPrestamo,
    registrarDevolucion,
};
const socioService = require('../services/socio.service');

// Nomenclatura consistente y descriptiva como planeaste [cite: 174, 175]
async function getAllSocios(req, res) {
    try {
        const socios = await socioService.getAllSocios();
        res.status(200).json(socios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createSocio(req, res) {
    try {
        const nuevoSocio = await socioService.createSocio(req.body);
        res.status(201).json(nuevoSocio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getAllSocios,
    createSocio,
};
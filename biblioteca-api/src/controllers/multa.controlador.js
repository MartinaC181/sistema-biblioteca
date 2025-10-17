const multaService = require('../services/multa.service');

async function getMultasBySocio(req, res) {
    try {
        const { numeroSocio } = req.params;
        const multas = await multaService.getMultasBySocio(numeroSocio);
        res.status(200).json(multas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Nota: La creación de multas se maneja desde el servicio de préstamos,
// por lo que no necesita su propio endpoint público, a menos que se requiera.

module.exports = {
    getMultasBySocio,
};
const multaRepository = require('../repositories/multa.repository');

class MultaService {
    async crearMulta(datosMulta) {
        [cite_start]// Aquí podrías implementar el patrón Strategy que definiste [cite: 85]
        // para calcular el monto según el motivo o daño.
        // Por ahora, simplemente la creamos con los datos recibidos.
        return await multaRepository.createMulta(datosMulta);
    }

    async getMultasBySocio(numeroSocio) {
        return await multaRepository.getMultasBySocio(numeroSocio);
    }
}

module.exports = new MultaService();
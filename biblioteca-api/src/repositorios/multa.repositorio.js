const db = require('../config/database');

class MultaRepository {
    async createMulta(multa) {
        const { monto, motivo, fecha, numeroSocio, idPrestamo } = multa;
        const result = await db.getPool().query(
            'INSERT INTO multas (monto, motivo, fecha, numeroSocio, idPrestamo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [monto, motivo, fecha, numeroSocio, idPrestamo]
        );
        return result.rows[0];
    }

    async getMultasBySocio(numeroSocio) {
        const result = await db.getPool().query('SELECT * FROM multas WHERE numeroSocio = $1', [numeroSocio]);
        return result.rows;
    }
}

module.exports = new MultaRepository();
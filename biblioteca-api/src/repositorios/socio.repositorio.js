const db = require('../config/database');

class SocioRepository {
    async getAllSocios() {
        const result = await db.getPool().query('SELECT * FROM socios ORDER BY numeroSocio ASC');
        return result.rows;
    }

    async getSocioByDni(dni) {
        const result = await db.getPool().query('SELECT * FROM socios WHERE dni = $1', [dni]);
        return result.rows[0];
    }

    async createSocio(socio) {
        const { dni, nombre } = socio;
        // La base de datos debería generar el numeroSocio automáticamente (SERIAL)
        const result = await db.getPool().query(
            'INSERT INTO socios (dni, nombre) VALUES ($1, $2) RETURNING *',
            [dni, nombre]
        );
        return result.rows[0];
    }
}

module.exports = new SocioRepository();
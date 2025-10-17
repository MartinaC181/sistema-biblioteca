const db = require('../config/database');

class PrestamoRepository {
    async findActivePrestamoByIsbn(isbn) {
        const result = await db.getPool().query(
            'SELECT * FROM prestamos WHERE isbn = $1 AND fechaDevolucionReal IS NULL',
            [isbn]
        );
        return result.rows[0];
    }

    async createPrestamo(prestamo) {
        const { fechaInicio, fechaDevolucion, isbn, numeroSocio } = prestamo;
        const result = await db.getPool().query(
            'INSERT INTO prestamos (fechaInicio, fechaDevolucion, isbn, numeroSocio) VALUES ($1, $2, $3, $4) RETURNING *',
            [fechaInicio, fechaDevolucion, isbn, numeroSocio]
        );
        return result.rows[0];
    }

    async registrarDevolucion(id) {
        const fechaDevolucionReal = new Date();
        const result = await db.getPool().query(
            'UPDATE prestamos SET fechaDevolucionReal = $1 WHERE id = $2 RETURNING *',
            [fechaDevolucionReal, id]
        );
        return result.rows[0];
    }
}

module.exports = new PrestamoRepository();
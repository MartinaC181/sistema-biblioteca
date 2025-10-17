const db = require('../config/database');

class LibroRepository {
    async getAllLibros() {
        const result = await db.getPool().query('SELECT * FROM libros ORDER BY titulo ASC');
        return result.rows;
    }

    async getLibroByIsbn(isbn) {
        const result = await db.getPool().query('SELECT * FROM libros WHERE isbn = $1', [isbn]);
        return result.rows[0];
    }

    async createLibro(libro) {
        const { isbn, titulo, autor, estado } = libro;
        const result = await db.getPool().query(
            'INSERT INTO libros (isbn, titulo, autor, estado) VALUES ($1, $2, $3, $4) RETURNING *',
            [isbn, titulo, autor, estado || 'disponible'] // Por defecto, 'disponible'
        );
        return result.rows[0];
    }

    async updateEstadoLibro(isbn, estado) {
        const result = await db.getPool().query(
            'UPDATE libros SET estado = $1 WHERE isbn = $2 RETURNING *',
            [estado, isbn]
        );
        return result.rows[0];
    }
}

module.exports = new LibroRepository();
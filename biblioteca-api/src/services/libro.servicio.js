const libroRepository = require('../repositories/libro.repository');

class LibroService {
    async getAllLibros() {
        return await libroRepository.getAllLibros();
    }

    async createLibro(libro) {
        const existingLibro = await libroRepository.getLibroByIsbn(libro.isbn);
        if (existingLibro) {
            throw new Error('Ya existe un libro con ese ISBN.');
        }
        return await libroRepository.createLibro(libro);
    }
}

module.exports = new LibroService();
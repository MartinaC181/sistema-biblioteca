const prestamoRepository = require('../repositories/prestamo.repository');
const libroRepository = require('../repositories/libro.repository');
const multaService = require('./multa.service'); // Usaremos el servicio de multas

class PrestamoService {
    async registrarPrestamo(datosPrestamo) {
        const { isbn, numeroSocio, fechaDevolucion } = datosPrestamo;

        [cite_start]// 1. Verificar si el libro existe y está disponible [cite: 175]
        const libro = await libroRepository.getLibroByIsbn(isbn);
        if (!libro) {
            throw new Error('El libro no existe.');
        }
        if (libro.estado !== 'disponible') {
            throw new Error('El libro no está disponible para préstamo.'); [cite_start]// [cite: 182]
        }

        [cite_start]// Aquí iría la lógica para verificar si el socio está habilitado [cite: 54] (a implementar)

        [cite_start]// 2. Registrar el préstamo [cite: 177]
        const nuevoPrestamo = await prestamoRepository.createPrestamo({
            fechaInicio: new Date(),
            fechaDevolucion,
            isbn,
            numeroSocio
        });

        [cite_start]// 3. Cambiar el estado del libro a "prestado" [cite: 178]
        await libroRepository.updateEstadoLibro(isbn, 'prestado');

        return nuevoPrestamo;
    }

    async registrarDevolucion(datosDevolucion) {
        const { isbn, estaDanado } = datosDevolucion;

        // 1. Buscar el préstamo activo para ese libro
        const prestamoActivo = await prestamoRepository.findActivePrestamoByIsbn(isbn);
        if (!prestamoActivo) {
            throw new Error('No se encontró un préstamo activo para este libro.');
        }

        [cite_start]// 2. Registrar la devolución en el sistema [cite: 186]
        const prestamoActualizado = await prestamoRepository.registrarDevolucion(prestamoActivo.id);

        [cite_start]// 3. Actualizar el estado del libro a "disponible" [cite: 187]
        await libroRepository.updateEstadoLibro(isbn, 'disponible');

        [cite_start]// 4. Si el libro está dañado, registrar una multa [cite: 192]
        if (estaDanado) {
            await multaService.crearMulta({
                monto: 500.00, // Monto de ejemplo
                motivo: 'Libro devuelto con daños.',
                fecha: new Date(),
                numeroSocio: prestamoActivo.numerosocio,
                idPrestamo: prestamoActivo.id
            });
        }
        
        return prestamoActualizado;
    }
}

module.exports = new PrestamoService();
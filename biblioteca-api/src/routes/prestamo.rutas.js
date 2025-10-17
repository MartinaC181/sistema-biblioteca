const { Router } = require('express');
const { registrarPrestamo, registrarDevolucion } = require('../controllers/prestamo.controller');

const router = Router();

router.post('/prestamos', registrarPrestamo);
router.post('/devoluciones', registrarDevolucion); // Usamos un endpoint diferente para claridad

module.exports = router;
const { Router } = require('express');
const { getAllLibros, createLibro } = require('../controllers/libro.controller');

const router = Router();

router.get('/libros', getAllLibros);
router.post('/libros', createLibro);

module.exports = router;
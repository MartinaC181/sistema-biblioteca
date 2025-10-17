const { Router } = require('express');
const { getAllSocios, createSocio } = require('../controllers/socio.controller');

const router = Router();

router.get('/socios', getAllSocios);
router.post('/socios', createSocio);

module.exports = router;
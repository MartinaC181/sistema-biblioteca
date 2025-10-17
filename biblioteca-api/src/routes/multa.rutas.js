const { Router } = require('express');
const { getMultasBySocio } = require('../controllers/multa.controller');

const router = Router();

router.get('/multas/socio/:numeroSocio', getMultasBySocio);

module.exports = router;
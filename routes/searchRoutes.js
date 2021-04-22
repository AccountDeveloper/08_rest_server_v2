const { Router } = require('express');
const { check } = require('express-validator');

//exportar desde controller
const { buscar } = require('../controllers/searchController');

const router = Router();

//get. búsqueda
router.get('/:coleccion/:termino', buscar);

module.exports = router;
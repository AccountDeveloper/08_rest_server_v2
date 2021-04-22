const { Router } = require('express');
const { check } = require('express-validator');
const {
    CategoriaPost,
    ObtenerCategorias,
    ObtenerCategoria,
    CategoriaPut,
    CategoriaDelete
} = require('../controllers/categoryController');
const { validarJWT, validate_fields, esAdminRole } = require('../middlewares');
const { existeCategoria } = require('../helpers/db-validators');


const router = Router();

//obtener todas las categorías, sin validar usuario - acceso público
router.get('/', ObtenerCategorias);

//obtener una categoría, en específico
router.get('/:id', [
    check('id').custom(existeCategoria),
    check('id', 'No es id válido').isMongoId(),
    validate_fields
], ObtenerCategoria);

//crear categoría - privado, cualquiera con token válido
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    validate_fields
], CategoriaPost);

//actualizar categoría - privado, cualquiera con token válido
router.put('/:id', [
    check('id').custom(existeCategoria),
    check('id', 'No es id válido').isMongoId(),
    validarJWT,
    check('nombre', 'nombre es requerido').not().isEmpty(),
    validate_fields
], CategoriaPut);

//eliminar categoría - privado, cualquiera con token válido y admin user
router.delete('/:id', [
    check('id').custom(existeCategoria),
    check('id', 'No es id válido').isMongoId(),
    validarJWT,
    esAdminRole,
    validate_fields
], CategoriaDelete);

module.exports = router;
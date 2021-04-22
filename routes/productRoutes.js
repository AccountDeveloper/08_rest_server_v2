//Importaciones de paquetes
const { Router, response } = require('express');
const { check } = require('express-validator');

//Importaciones desde el controlador
const {
    ObtenerProductos,
    ObtenerProducto,
    CrearProducto,
    ActualizarProducto,
    EliminarProducto
} = require('../controllers/productController');

//Importaciones desde Helpers
const {
    existeProducto,
    existeCategoria
} = require('../helpers/db-validators');

//Importaciones desde Middlewares
const {
    validarJWT,
    validate_fields,
    esAdminRole
} = require('../middlewares');

//
const router = Router();

//get. todos los productos
router.get('/', ObtenerProductos);

//get. producto en específico por el id
router.get('/:id', [
    check('id').custom(existeProducto),
    check('id', 'No es id válido').isMongoId(),
    validate_fields
], ObtenerProducto);

//post. crear producto
router.post('/', [
    validarJWT,
    check('nombre', 'nombre es requerido').notEmpty(),
    check('categoria', 'No es id válido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validate_fields
], CrearProducto);

//put. actualizar producto
router.put('/:id', [
    validarJWT,
    check('id').custom(existeProducto),
    validate_fields
], ActualizarProducto);

//delete. eliminar producto
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id').custom(existeProducto),
    check('id', 'No es id válido').isMongoId(),
    validate_fields
], EliminarProducto);

module.exports = router;
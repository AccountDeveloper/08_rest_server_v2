const { Router } = require('express');
const { check } = require('express-validator');

//todas las exportaciones se centralizaron en middlewares/index
const {
    validate_fields,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');

const {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
} = require('../helpers/db-validators');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/userController');
//
const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    //
    check('nombre', 'nombre es requerido').not().isEmpty(),
    //validaciones de correo
    check('correo', 'correo no válido').isEmail(),
    check('correo').custom(existeEmail),
    //
    check('password', 'debe contener al menos seis caracteres').isLength({ min: 6 }),
    check('rol').custom(esRolValido), //(rol) => esRolValido(rol)... esto es lo mismo
    validate_fields
], usuariosPost);

router.put('/:id', [
    check('id').custom(existeUsuarioPorId),
    check('id', 'No es id válido').isMongoId(),
    check('rol').custom(esRolValido), //(rol) => esRolValido(rol)... esto es lo mismo
    validate_fields
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'SALE_ROLE'), //y agregar cualquier otro rol
    check('id', 'No es id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validate_fields
], usuariosDelete);


module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields } = require('../middlewares/validate-fields-mid');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
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
    check('id', 'No es id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validate_fields
], usuariosDelete);


module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/authController');

const { validate_fields } = require('../middlewares/validate-fields-mid');

const router = Router();

router.post('/login', [
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').notEmpty(), //.not().isEmpty() existe y hace lo mismo
    validate_fields
], login);

router.post('/google', [
    check('id_token', 'el id_token es obligatorio').notEmpty(), //.not().isEmpty() existe y hace lo mismo
    validate_fields
], googleSignIn);

module.exports = router;
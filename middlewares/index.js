const validateFieldsMid = require('../middlewares/validate-fields-mid'); //validate_fields
const JWTValidate = require('../middlewares/jwt-validate'); //validarJWT
const rolValidate = require('../middlewares/rol-validate'); //esAdminRole, tieneRole

module.exports = {
    ...validateFieldsMid,
    ...JWTValidate,
    ...rolValidate
}
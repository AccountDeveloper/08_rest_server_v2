//
const { validationResult } = require('express-validator');

const validate_fields = (req, res, next) => {
    //verificar los check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};

module.exports = {
    validate_fields
}
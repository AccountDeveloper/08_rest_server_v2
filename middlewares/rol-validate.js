const { response } = require("express");
const role = require("../models/role");

const esAdminRole = (req = request, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'se quiere verificar el role sin validar el token primero sdr'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no está autorizado`
        });
    }

    next();
}

//tieneRole
const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'se quiere verificar el role sin validar el token primero'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `se requiere que tu rol sea uno de estos: ${roles}`
            });
        }
        next();
    }
};

module.exports = {
    esAdminRole,
    tieneRole
}
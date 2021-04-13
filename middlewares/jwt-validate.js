const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {
    try {
        const token = req.header('x-token');

        if (!token) {
            return res.status(401).json({
                msg: 'no hay token en la petición'
            });
        }

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leer usuario correspondiente al uid
        const usuario = await Usuario.findById(uid);

        //verificar que usuario se encuentre en true
        if (!usuario) {
            return res.status(401).json({
                msg: 'token no válido - usuario inexistente'
            });
        }

        //verificar que usuario se encuentre en true
        if (!usuario.status) {
            return res.status(401).json({
                msg: 'token no válido - usuario inactivo'
            });
        }

        req.usuario = usuario
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'token no válido'
        });
    }
};

module.exports = {
    validarJWT
}
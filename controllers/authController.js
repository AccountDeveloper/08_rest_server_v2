const { response } = require('express');
const bcript = require('bcryptjs');
//
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt-generate');

const login = async(req, res = response) => {

    const { correo, password } = req.body;
    try {

        //ver si correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'correo / password incorrecto - correo'
            });
        }
        //verificar que usuario esté activo
        if (!usuario.status) {
            return res.status(400).json({
                msg: 'correo / password incorrecto - estado inactivo'
            });
        }
        //verificar password
        const validPassword = bcript.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'correo / password incorrecto - password inválido'
            });
        }
        //generar token
        const token = await generarJWT(usuario.id);

        ///
        res.status(200).json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'habla con administrador'
        });
    }
};

module.exports = { login }
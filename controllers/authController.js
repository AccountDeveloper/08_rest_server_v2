const { response } = require('express');
const bcript = require('bcryptjs');
//
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt-generate');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;
    try {
        const { nombre, correo, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        //si el usuario aparece inactivo en bd
        if (!usuario.status) {
            res.status(401).json({
                msg: 'habla con administrador - usuario bloqueado'
            });
        }

        //generar jwt
        const token = await generarJWT(usuario.id)

        return res.status(200).json({ usuario, token });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'token no reconocido - google' });
    }
};

module.exports = { login, googleSignIn }
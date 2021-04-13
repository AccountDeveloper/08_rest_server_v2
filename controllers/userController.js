const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {
    //const { variable, algo = 0 } = req.query; // query es lo que viene como opcion de la ruta, ejm: localhost/api?variable=algo
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true }
        /*const usuarios = await Usuario.find()
            .skip(Number(desde))
            .limit(Number(limite));

        const total = await Usuario.countDocuments(query);*/
        // a esto se le llama destructuración de arreglos
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find()
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res.status(200).json({ total, usuarios });
};

const usuariosPost = async(req, res = response) => {
    const { nombre, correo, password, rol } = req.body; //esto cuando es ruta slash ejm: localhost/api/este_es_body
    const usuario = new Usuario({ nombre, correo, password, rol });

    //encriptar password
    const salt = bcryptjs.genSaltSync(); //por defecto 10, pero puede colocarse bcryptjs.genSaltSync(20) u otro número
    usuario.password = bcryptjs.hashSync(password, salt);
    //guardar
    await usuario.save();
    res.status(201).json({ msg: 'post World from controller', usuario });
};

const usuariosPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...restoBody } = req.body;
    //validar en base de datos
    if (password) {
        //encriptar password
        const salt = bcryptjs.genSaltSync(); //por defecto 10, pero puede colocarse bcryptjs.genSaltSync(20) u otro número
        restoBody.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, restoBody, { new: true });
    res.status(202).json({ usuario, msg: 'put World from controller' });
};

const usuariosPatch = (req, res = response) => {
    res.status(205).json({ msg: 'patch World from controller' });
};

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;

    //borrado lógico
    const usuario = await Usuario.findByIdAndUpdate(id, { status: false })

    res.status(200).json({
        usuario
    });
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};
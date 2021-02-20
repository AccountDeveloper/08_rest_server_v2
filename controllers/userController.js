const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const { variable, algo = 0 } = req.query; // query es lo que viene como opcion de la ruta, ejm: localhost/api?variable=algo
    res.status(200).json({ variable, algo, msg: 'get World from controller' });
};

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body; //esto cuando es ruta slash ejm: localhost/api/este_es_body
    res.status(201).json({ nombre, edad, msg: 'post World from controller' });
};

const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.status(202).json({ id, msg: 'put World from controller' });
};

const usuariosPatch = (req, res = response) => {
    res.status(205).json({ msg: 'patch World from controller' });
};

const usuariosDelete = (req, res = response) => {
    res.status(206).json({ msg: 'delete World from controller' });
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};
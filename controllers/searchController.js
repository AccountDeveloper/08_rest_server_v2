const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = ['categorias', 'productos', 'usuarios', 'roles'];

const buscarUsuario = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.status(200).json({ results: (usuario) ? [usuario] : [] });
    }
    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({ $or: [{ nombre: regex }, { correo: regex }], $and: [{ status: true }] });
    return res.status(200).json({ results: (usuarios) ? [usuarios] : [] });
}

//
const buscarCategoria = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.status(200).json({ results: (categoria) ? [categoria] : [] });
    }
    const regex = new RegExp(termino, 'i');
    const categorias = await Categoria.find({ nombre: regex, status: true });
    return res.status(200).json({ results: (categorias) ? [categorias] : [] });
}

//
const buscarProducto = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const producto = await Producto.findById({ nombre: regex }).populate('categoria', 'nombre');
        return res.status(200).json({ results: (producto) ? [producto] : [] });
    }
    const regex = new RegExp(termino, 'i');
    const productos = await Producto.find({ nombre: regex, status: true }).populate('categoria', 'nombre');
    return res.status(200).json({ results: (productos) ? [prodcutos] : [] });
}


//////
const buscar = (req, res = response) => {
    const { coleccion, termino } = req.params;
    try {
        if (!coleccionesPermitidas.includes(coleccion)) {
            return res.status(400).json({
                msg: `${coleccion} no es una búsqueda válida, debe pertenecer a ${coleccionesPermitidas}`
            });
        }
        switch (coleccion) {
            case 'categorias':
                buscarCategoria(termino, res)
                break;
            case 'productos':
                buscarProducto(termino, res)
                break;
            case 'usuarios':
                buscarUsuario(termino, res);
                break;

            default:
                res.status(500).json({ msg: `${coleccion} no búsqueda respectiva` });
                break;
        }
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    buscar
}
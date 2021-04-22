const { response, request } = require("express");
const { Categoria } = require("../models");

//obtener categorías - paginado - total - populate
const ObtenerCategorias = async(req = request, resp = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const categorias = await Categoria.find({ status: true })
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    const total = await Categoria.countDocuments({ status: true });

    resp.status(200).json({
        total,
        categorias
    });
};

//obtener categoría - populate // listo
const ObtenerCategoria = async(req, res = response) => {
    const { id } = req.params;
    const categoriaDB = await Categoria.findById(id, { status: true })
        .populate('usuario', 'nombre');
    if (!categoriaDB) {
        res.status(404).json({
            msg: 'categoria no encontrada'
        });
    }
    res.status(200).json({
        categoriaDB
    });
};

//crear categoría
const CategoriaPost = async(req, resp = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
        return resp.status(400).json({
            msg: `la categoría ${nombre} ya existe`
        });
    }

    //generar data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    resp.status(201).json(categoria);
};

//Actualizar categoría
const CategoriaPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, status, usuario, ...data } = req.body;

    //data.nombre = req.body.nombre.toUpperCase();
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoriaBD = await Categoria.findByIdAndUpdate(id, data, { new: true });
    res.status(202).json({ categoriaBD });
};

//Borrar Categoría
const CategoriaDelete = async(req, res = response) => {
    const { id } = req.params;

    //borrado lógico
    const categoriaBD = await Categoria.findByIdAndUpdate(id, { status: false });

    res.status(200).json({
        categoriaBD
    });
};
module.exports = {
    ObtenerCategorias,
    ObtenerCategoria,
    CategoriaPost,
    CategoriaPut,
    CategoriaDelete
}
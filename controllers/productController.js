//importaciones
const { response, request } = require("express");
const { Producto } = require("../models");

//get
const ObtenerProductos = async(req = request, resp = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const productos = await Producto.find({ status: true })
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    const total = await Producto.countDocuments({ status: true });

    resp.status(200).json({
        total,
        productos
    });
};

//get
const ObtenerProducto = async(req, res = response) => {
    const { id } = req.params;
    const productoDB = await Producto.findById(id, { status: true })
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
    console.log("aqui", productoDB.nombre);
    console.log("aqui", productoDB.disponible);
    if (!productoDB) {
        res.status(404).json({
            msg: 'categoria no encontrada'
        });
    }
    res.status(200).json({
        productoDB
    });
};

//post crear producto
const CrearProducto = async(req, resp = response) => {
    const { status, usuario, ...body } = req.body;
    //console.log(req.usuario);
    const productoDB = await Producto.findOne({ nombre: body.nombre });
    if (productoDB) {
        return resp.status(400).json({
            msg: `el producto ${productoDB.nombre} ya existe`
        });
    }
    //generar data a guardar
    const data = {
        ...body,
        nombre: req.body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);
    await producto.save();
    resp.status(201).json(producto);
};

//Actualizar producto
const ActualizarProducto = async(req, res = response) => {
    const { id } = req.params;
    const { status, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const productoBD = await Producto.findByIdAndUpdate(id, data, { new: true });
    res.status(202).json({ productoBD });
};

//Borrar Producto
const EliminarProducto = async(req, res = response) => {
    const { id } = req.params;
    //borrado lógico
    const productoBD = await Producto.findByIdAndUpdate(id, { status: false });

    res.status(200).json({
        productoBD
    });
};

module.exports = {
    ObtenerProductos,
    ObtenerProducto,
    CrearProducto,
    ActualizarProducto,
    EliminarProducto
}
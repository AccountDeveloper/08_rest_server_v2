//
const {
    Categoria,
    Producto,
    Role,
    Usuario
} = require('../models');

//verificar roles
const esRolValido = async(rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`El rol ${rol} no existe`);
    }
};
//
const existeUsuarioPorId = async(id = '') => {
    const existeUsuario = await Usuario.findById(id); //aquí revisar cuando el formato de id no es el que reconoce mongo
    if (!existeUsuario) {
        throw new Error(`${id} no existe db`);
    }
};

//verificar si correo existe
const existeEmail = async(correo = '') => {
    const existEmail = await Usuario.findOne({ correo });
    if (existEmail) {
        throw new Error(`correo ya existe db`);
    }
};


//////////////////
//para categoría//
//////////////////
const existeCategoria = async(id = '') => {
    const existeCategoria = await Categoria.findById(id); //aquí revisar cuando el formato de id no es el que reconoce mongo
    if (!existeCategoria) {
        throw new Error(`${id} no existe en db`);
    }
};

///////////////////
///para producto///
///////////////////
const existeProducto = async(id = '') => {
    const existeProducto = await Producto.findById(id); //aquí revisar cuando el formato de id no es el que reconoce mongo
    if (!existeProducto) {
        throw new Error(`${id} no existe en db`);
    }
};

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto
}
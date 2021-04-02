//
const Role = require('../models/role');
const Usuario = require('../models/usuario');

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
        console.log('entra existe usuario negado');
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

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}
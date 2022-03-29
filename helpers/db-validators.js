const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol='')=>{
    const existeRol = await Role.findOne({rol})
    if (!existeRol) {
        throw new Error(`El role ${rol} no está registrado en la base de datos`)
    }
}

const emailExiste = async ( correo='')=>{
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error('Ese correo ya está registrado')
    }
}

const existeUsuarioPorId = async ( id)=>{
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error('El ID NO Existe')
    }
}

module.exports ={
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}


const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require('../models/usuario');

const login = async(req, res = response)=>{
    const{correo,password}=req.body;
    try {
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({correo})
        if (!usuario) {
            return res.status(400).json({
                msg:'Usuario/Password NO son correctos - Correo '
            })
        }
        //el usuario esta activo en la base de datos
        if (! usuario.estado) {
            return res.status(400).json({
                msg:'Usuario/Password NO son correctos - estado: false '
            })
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg:'Usuario/Password NO son correctos - password'
            })
        }
        //generar JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

    
}



module.exports = {
    login
}
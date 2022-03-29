const { response } = require("express");
const { Categoria } = require("../models");

const crearCategoria = async (req, res = response)=>{
    const nombre = req.body.nombre.toUpperCase();
    const userId = req.body.userId;
    const categoriaDB = await Categoria.findOne({nombre});
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }
    //Generar la data a guardar
    const data = {
        nombre,
        usuario:userId
    }

    const categoria = new Categoria(data);

    //Guardar
    await categoria.save();

    res.status(201).json(categoria)



}

module.exports = {
    crearCategoria
}
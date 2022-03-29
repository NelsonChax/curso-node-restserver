const {Schema,model} = require('mongoose');


const CategoriaShema = Schema({
    nombre:{
        type:String,
        require:[true,'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type: Boolean,
        default:true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true 
    }
});


module.exports = model('Categoria',CategoriaShema);
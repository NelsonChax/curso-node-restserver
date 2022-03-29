

const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const {esRolValido,emailExiste,existeUsuarioPorId }  = require('../helpers/db-validators')

const router = Router();

router.get('/',usuariosGet)

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es validado').isEmail(),
    check('rol').custom(esRolValido),
    check('correo').custom(emailExiste),
    validarCampos
],usuariosPost) 

router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPut)

router.delete('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete)



module.exports = router;






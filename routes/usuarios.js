

const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const {esRolValido }  = require('../helpers/db-validators')

const router = Router();

router.get('/',usuariosGet)

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es validado').isEmail(),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost) 

router.put('/:id',usuariosPut)
 
router.patch('/',usuariosPatch)

router.delete('/',usuariosDelete)



module.exports = router;






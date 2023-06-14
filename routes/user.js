const {Router} = require('express');
const { check } = require('express-validator');
const { usuarioGet, 
        usuarioPut, 
        usuarioPost, 
        usuarioDelete, 
        usuarioPatch } = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar_campos');
const { validaRol, validaEmail, validaEmail2, validaId } = require('../helpers/db-validator');

const router = Router();

router.get('/', usuarioGet);
router.put('/:id',[
        check('id','el id no es valido').isMongoId(),
        check('id').custom(validaId),
        check('rol').custom(validaRol),
        validarCampos
],usuarioPut);
router.post('/',[
        check('email','El correo que ingreso no es valido.').isEmail(),
        check('nombre','el nombre es oblitario').notEmpty(),
        check('pass','La contraseña debe contener: al menos 7 caracteres, 1 letra minuscula, 1 letra mayuscula, 1 número y 1 simbolo').isStrongPassword({minLength: 7}),
        // check('rol','No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        // check('email').custom(validaEmail),
        validaEmail2,//validacion de email forma 2
        check('rol').custom(validaRol), // la forma (rol)=>validaRol(rol) se puede reducir a validaRol.
        validarCampos,
],usuarioPost);
router.delete('/:id',[
        check('id','el id no es valido').isMongoId(),
        check('id').custom(validaId),
        validarCampos
], usuarioDelete);
router.patch('/', usuarioPatch);

module.exports = router;
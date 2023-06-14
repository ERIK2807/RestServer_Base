const { validationResult } = require('express-validator');

const validarCampos =async (req, res, next)=>{
    // validación de correo 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    //continuar
    next();
}
module.exports = {
    validarCampos
}

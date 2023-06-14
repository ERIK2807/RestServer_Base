
const Usuario = require('../models/user');
const rolesUser= require('../models/rolesUser');
const { response } = require('express');

//funcion para validar el rol 
const validaRol = async (rol='')=>{
    const existerol = await rolesUser.findOne({rol});
    // console.log('rol: ',existerol,!existerol,rol);
    // validar error que capture el custom.
    if(!existerol){ 
            throw new Error(`El rol ${rol} no existe.`);
    }
}
// //verificar si correo existe forma 1
const validaEmail = async (email='')=>{  
    
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`El correo ${email} ya se encuentra registrado`);
    }
}

// //verificar si correo existe forma 2 (middleware)
const validaEmail2 = async(req,res=response, next )=>{
    console.log('Email es:',req.body.email);
    const email = req.body.email;
    const existeEmail2 = await Usuario.findOne({email});
    // console.log("exiteEmail: ",existeEmail) 
    if(existeEmail2){
        return res.status(406).json({
            error: `El correo ${email} ya se encuentra registrado validacion 2`
        })
    } 
    next();
} 

const validaId = async (id='')=>{
    const existeid = await Usuario.findById(id);
    console.log('rol: ',existeid,!existeid,id);
    // validar error que capture el custom.
    if(!existeid){ 
            throw new Error(`El usuario con id ${id} no existe.`);
    }
}
module.exports ={
    validaRol,
    validaEmail,
    validaEmail2,
    validaId
}
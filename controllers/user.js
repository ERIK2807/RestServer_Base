const {response, request} = require('express');
const Usuario = require('../models/user');
const bcript = require('bcryptjs');


const usuarioGet = async (req=request,res=response)=>{
    const {limite=3, desde=11}= req.query
    const estado = {estado:true} // para valdiar correos activos

    // const usuarios = await Usuario.find(estado)
    // .skip(desde)
    // .limit(limite);
    // //mostrar total de registros de usuarios en la DB
    // const total_registros = await Usuario.countDocuments(estado);
    
    //en la promesa se ejecuta al mismo tiempo:
    const [total_registros, usuarios] = await Promise.all([
        Usuario.countDocuments(estado),   
        Usuario.find(estado)
        .skip(desde)
        .limit(limite)
    ])
    res.status(202).json({
        total_registros,
        usuarios
    })
}

const usuarioPost = async (req,res=response)=>{  
    const {nombre, email, pass, rol} = req.body;
    
    //creación de la instancia
    const usuario = new Usuario({nombre,email,pass,rol}); //mongoose ignora lo que no este definido en Usuario() del body
    console.log('usuario:',usuario);
    
    // //verificar si correo existe
    // const existeEmail = await Usuario.findOne({email});
    // // console.log("exiteEmail: ",existeEmail) 
    // if(existeEmail){
    //     return res.status(400).json({
    //         error: 'El correo ya se encuentra registrado'
    //     })
    // }
    //encriptar contraseña
    const salt = bcript.genSaltSync(10);
    usuario.pass = bcript.hashSync(pass,salt);
    
    //guardar el registro en DB
    await usuario.save();
    res.status(201).json({
        usuario
    })
}
const usuarioPut = async (req,res=response)=>{
    const {id} = req.params;
    const {_id,pass,google,email, ...resto} = req.body; 
    // console.log('resto:',resto);

    //TODO validar contra base de datos
    if (pass){
        //encriptar contranseña
        const salt = bcript.genSaltSync(10);
        resto.pass = bcript.hashSync(pass,salt);
         
    }
    // const usuario = await Usuario.findByIdAndUpdate(id,resto);
    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({usuario,"se actualizaron los campos":resto})
}
const usuarioDelete = async(req,res=response)=>{
    const {id} = req.params;
    
    //elimina el registro fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);

    //Cambiando el estado a false (recomendado)
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false} )

    res.json({
        "se ha desactivado/eliminado el usuario":usuario
    })
}
const usuarioPatch =(req,res=response)=>{
    res.json({
        desc:'metodo PATCH en /get'
    })
}

module.exports ={
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    usuarioPatch
}
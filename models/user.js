const {Schema, model} = require('mongoose'); // así se evita usar el mongoose.Schema y .model

const usuarioSchema = Schema({
    nombre:{
        type: String,
        required:[true,'El nombre es obligatorio'],
    },
    email:{
        type:String,
        required:[true,'el correo es obligatorio'],
        unique: true
    },
    pass:{
        type:String,
        required:[true,'la contraseña es obligatoria']
    },
    image:{
        type:String,
    },
    rol:{
        type:String,
        required:true,
        emun:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false,
    }
})

//metodo para descartar "pass" y "__v" de usuarioSchema NO DEBE SER FUNCION FLECHA.
usuarioSchema.methods.toJSON = function () {
    const {pass, __v, ...users} = this.toObject(); //genera la instancia como objeto de Javascript.
    // console.log('this es:',this)
    return users;
}

module.exports= model('Usuario', usuarioSchema) //mongoose por defecto a usuario le añade la s "usuarios"

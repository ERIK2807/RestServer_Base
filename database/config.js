const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            // useNewUrlParser:true,
            // useUnifiedTopology:true,
            // useCreateIndex:true,
            // useFindAndModify: false
        });
        console.log('conexión permitida a DataBase')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error inciando la base de datos');  //error controlado para ver en consola
        
    }

}

module.exports = {
    dbConnection
}
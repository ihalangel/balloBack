require("dotenv").config();
const Model= require('./../keychaintrx_chest/models.js')
const MONGOUSE = process.env.MONGOUSE
URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`
const db = require('mongoose');
db.Promise = global.Promise;
db.connect(URI_MD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
console.log("conexion_db");



// Obtener el número de conexiones abiertas
const numConnections = db.connections.length;

console.log(`Número de conexiones abiertas: ${numConnections}`);


async function add_buy(notification) {
   const Notificaton = new Model(notification)
   console.log("Notificaton", Notificaton);
       await Notificaton.save().catch((e)=>{
            //console.log(e)
            console.log("KEY DUPLICADADA")
        });

}






module.exports = {
add_buy, 
}



require("dotenv").config();
const Model= require('./models.js')
const MONGOUSE = process.env.MONGOUSE
URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`
const db = require('mongoose');
db.Promise = global.Promise;
db.connect(URI_MD, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
console.log("conexion_db");


async function get_boletos(actuacion) {
	console.log("Store get_boletos::",actuacion)
	console.log("Model",Model)
	 return Actuacion = await Model.find(actuacion).catch((e)=>{
	    	console.log("errror")
	    	console.log(e)
	    });
	console.log("EQU",actuacion)

}





module.exports = {
get_boletos, 

}



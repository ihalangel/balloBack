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


// async function get_equino(equino) {
// 	console.log("ME ejecuto desde store get equino",equino)
// 	 return Equino = await Model.find(equino).catch((e)=>{
// 	    	console.log("errror")
// 	    	console.log(e)
// 	    });
// 	console.log("EQU",Equino)

// }


// async function get_equino(equino) {
//   console.log("ME ejecuto desde store get equino", equino);
//   const equinos = await Model.find(equino).catch(e => {
//     console.log("error");
//     console.log(e);
//   });
//   console.log("EQU", equinos);
//   return equinos;
// }




async function get_equino(equino) {
  let equineIds;

  if (equino.equineId.includes(',')) {
    equineIds = equino.equineId.split(',').map(Number);
  } else {
    equineIds = [Number(equino.equineId)];
  }

  console.log("ME ejecuto desde store get equino", equineIds);
  const equinos = await Model.find({ equineId: { $in: equineIds } }).catch(e => {
    console.log("error");
    console.log(e);
  });
  console.log("EQU", equinos.length);
  return equinos;
}



// async function get_habilitar_equino(equino) {
//   // Paso 1: Realizar la consulta para obtener los equinos.
//   const equinos = await Model.find(equino).catch(e => {
//     console.log("error");
//     console.log(e);
//   });

//   // Paso 2: Verificar si hay suficientes equinos.
//   if (!equinos || equinos.length === 0) {
//     return []; // Si no hay equinos, devolver un array vacío.
//   }

//   // Paso 3: Filtrar los equinos para que solo incluya aquellos con equineId <= 5000.
//   const equinosFiltrados = equinos.filter(horse => Number(horse.equineId) <= 5000);

//   // Paso 4: Verificar si hay suficientes equinos filtrados.
//   if (equinosFiltrados.length === 0) {
//     return []; // Si no hay equinos válidos, devolver un array vacío.
//   }

//   // Paso 5: Barajar el array de equinos de forma aleatoria.
//   const shuffledEquinos = equinosFiltrados.sort(() => 0.5 - Math.random());

//   // Paso 6: Seleccionar los primeros 20 equinos del array barajado.
//   const randomEquinos = shuffledEquinos.slice(0, 15);

//   console.log("EQU", randomEquinos.length); // Debería imprimir 20 (si hay suficientes).
  
//   // Paso 7: Retornar los equinos aleatorios.
//   return randomEquinos;
// }


async function get_habilitar_equino(equino) {
  try {
    // Realiza la consulta usando aggregate con $match, $sample y $project
    const equinos = await Model.aggregate([
      { $match: { ...equino, equineId: { $lte: 5000 } } }, // Filtra solo los equinos con equineId <= 5000
      { $sample: { size: 15 } }, // Toma una muestra aleatoria de 15 documentos
       { 
        $project: { 
          equineId: 1, 
          account: 1, 
          agilidad: 1, 
          animo: 1, 
          generacion: 1, 
          name: 1, 
          resistencia: 1, 
          resistencia_add: 1, 
          salud: 1, 
          sexo: 1, 
          tipo: 1, 
          velocidad: 1, 
          velocidad_add: 1, 
          estado: 1, 
          schedule: 1, 
          implementos_ptos: 1, 
          for_shedule_Oficiales: 1, 
          status_oficial: 1, 
          habilitado: 1, 
          habilitador: 1, 
          nameBhr: 1 
        } 
      } // Selecciona solo los campos necesarios
    ]);

    console.log("EQU", equinos.length); // Debería imprimir 15 (si hay suficientes)
    
    return equinos;
  } catch (error) {
    console.error("Error al obtener los equinos:", error);
    return [];
  }
}






async function get_equino_account(account) {
  const equinos = await Model.find(account).catch(e => {
    console.log("error");
    console.log(e);
  });
  console.log("EQU", equinos.length);
  return equinos;
}





async function set_equino_status(equino) {
	console.log("SETEANDO ",equino)
	 return Equino = await Model.findOneAndUpdate(equino[0],equino[1]).catch((e)=>{
	    	console.log("errror")
	    	console.log(e)
	    });
	//console.log("EQU",Equino)

}









module.exports = {
get_equino_account,
get_equino, 
set_equino_status,
get_habilitar_equino


}



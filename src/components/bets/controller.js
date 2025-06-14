const store = require('./store.js');
const storeW= require('./../wallet/store.js')
const ModelW= require('./../wallet/models.js')
const Model= require('./../wallet/models.js')


async function agregar_apuesta(body) {
  console.log("BODY DEJUSTP", body);

const{equinoId, cantidadTickets,nombreEquino,race,usuario}=body;
console.log("De back : cantidadTickets,nombreEquino,race,owner", cantidadTickets,nombreEquino,race,usuario);



const wallet= await storeW.get_wallet({usuario:usuario})
console.log("wallet TTTTTTTT", wallet);




const raceactives=await buscar_apuestas({race : race})
const statusSuperior = raceactives[0]._doc.status_superior;
console.log("statusSuperior", statusSuperior);





if(statusSuperior==="create"){
  
if(wallet){
const balance=wallet[0].balance - wallet[0].retiros;
const tickets=wallet[0].tickets 

 console.log("balance", balance);
 const bet=cantidadTickets/100;
 console.log("bet", bet);

if(tickets>=bet){

let quedan=tickets -bet

if(quedan>=0){
   await ModelW.findOneAndUpdate(
  { usuario: usuario },
  { $inc: { tickets: -bet } } // Use -bet to decrement the balance  
);
  const agregando_puesta= await store.agregarApuesta(equinoId,bet, nombreEquino, race, usuario);
  
return(`trx Success, balance tickets: ${quedan.toFixed(3)}`);
}

}


 saldo=balance - bet;
  if(balance>=bet){
//descontar_balace sumar a apuesta en carrera
   await ModelW.findOneAndUpdate(
  { usuario: usuario },
  { $inc: { balance: -bet } } // Use -bet to decrement the balance
);

//sumar a apuestas en carreras tabla apuesta
const agregando_puesta= await store.agregarApuesta(equinoId,bet, nombreEquino, race, usuario);


  }else{
    return("Insufficient funds")
  }


}else{return("Wallet not found")}


}else{

  return("race closed, in progress")
}



  return(`trx Success, balance: ${saldo.toFixed(3)}`)
}



async function buscar_apuestas(body){
console.log("BODY APUESTAS", body)
if(body.race || body.raceid){
return new Promise((resolve,reject) =>{
resolve(store.buscar_apuestas(body))

 })
}

if(body.usuario){
  console.log("BODY USER")
return new Promise((resolve,reject) =>{
resolve(store.buscar_apuestas_usuario(body))

 })
}
}







// Función para agregar una apuesta a la tabla de apuestas en carreras
// async function agregarApuesta(cantidadTickets, nombreEquino, race, usuario) {
//   try {
//     // Buscar la carrera en la que se realiza la apuesta
//     const carrera = await Model.findOne({ race });

//     if (carrera) {
//       // La carrera existe, ahora agregamos la apuesta
//       const apuesta = {
//         nombreEquino,
//         cantidadTickets,
//         usuario,
//       };

//       // Agregar la apuesta a la lista de apuestas en la carrera
//       carrera.apuestas.push(apuesta);

//       // Calcular el nuevo Total_Pote
//       carrera.Total_Pote += cantidadTickets;

//       // Guardar los cambios en la carrera
//       await carrera.save();

//       console.log('Apuesta agregada con éxito.');
//     } else {
//       console.log('La carrera no existe.');
//     }
//   } catch (error) {
//     console.error('Error al agregar la apuesta:', error);
//   }
// }

// Llama a la función para agregar la apuesta

  // return new Promise(async (resolve, reject) => {
  //   try {
  //     const claims = await store.get_claim(body);
  //     console.log("claims", claims);
  //      balance_en_wallet=claims[0].balance - claims[0].retiros
  //      status_retiro=claims[0].status_retiro
  //      console.log("balance_en_wallet", balance_en_wallet);
  //      console.log("body.balance", body.balance);
  //     // Verificar si la respuesta del store es un array vacío
  //     if (balance_en_wallet == body.balance ){
        
  //       console.log("CLAIM ES CERO");
  //       // Aquí puedes agregar la lógica para registrar los datos enviados en lugar de devolver el array vacío
  //       // Por ejemplo, puedes guardar los datos en una base de datos o hacer otra acción
  //       // Si la acción se realiza con éxito, puedes resolver la promesa con un mensaje de éxito
  //       if(status_retiro!=="pending"){
       
  //         await store.register_claim([{usuario:body.usuario},{status_retiro:'pending'}]);
  //       let respues=`You have successfully submitted a withdrawal request for  ${body.balance_drops} tokens`
  //       resolve(respues);          
  //       }
   
  //         let respuesta = "You must wait for the withdrawal to be processed";
  //       resolve(respuesta);
  //     } else {
  //     let respues=`${body.balance} Error Balance`
  //       resolve(respues);  

  //     }
  //   } catch (error) {
  //     reject(error); // Manejar cualquier error que ocurra durante el registro o la obtención de datos
  //   }
  // });


module.exports = {
 agregar_apuesta,
 buscar_apuestas
}

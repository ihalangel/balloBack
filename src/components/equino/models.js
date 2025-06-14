const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const equino = new Schema({
  equineId: {
    type: Number,
    index: true,
    require: true
  },
  tipo: {
    type: String,
    default: ''
  },
  generacion: {
    type: String,
    default: ''
  },
  account: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
   nameBhr:{
        type: String,
        default:"noname", 
    },
namesBhr:{
        type: Object,
        default:"noname", 
    },

  sexo: {
    type: String,
    default: ''
  },
  salud: {
    type: String,
    default: ''
  },
  velocidad: {
    type: String,
    default: ''
  },
  velocidad_add: {
    type: String,
    default: ''
  },
  resistencia: {
    type: String,
    default: ''
  },
  resistencia_add: {
    type: String,
    default: ''
  },
  agilidad: {
    type: String,
    default: ''
  },
  animo: {
    type: String,
    default: ''
  },
  carreras: {
    type: Array,
    default: []
  },
  llegadas: {
    type: Object,
    default: {}
  },
  estado: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  for_shedule_Oficiales:String,
  habilitado:{
        type: String,
        default:"no", 
    },
    habilitador:{
        type: String,
        default:"no", 
    },



  Nacimiento: {
    type: Date,
    default: null
  },
  Dias_Vida: {
    type: String,
    default: ''
  },
  Carreras_Utiles: {
    type: String,
    default: ''
  },
  Schedule: {
    type: Number,
    default: 0
  },
  Dia_descanzo: {
    type: Date,
    default: null
  },
   alimentos: {
    type: Array,
    default: []
  },
  alimentos_ptos: {
    type: Number,
    default: 0
  },
  alimentos_status: {
    type: String,
    default: 'free'
  },
  alimentos_fecha: {
    type: Date,
    },
   alimentos_trx_id: { type: Object },

  implementos: {
    type: Array,
    default: []
  },
  implementos_ptos: {
    type: Number,
    default: 0
  },
  implementos_status: {
    type: String,
    default: 'free'
  },
   entrenamiento_gratis: {
    type: Number,
    default: 0
  },
   trx_entrenmientos: {
    type: Array,
    default: []
  },
    lastTrain: {
    type: Array,
    default: []
  },
   opcion_entrenamiento: {
    type: Number,
    default: 0
  },
  last_training: {
    type: Array,
    default: []
  },
  implementos_fecha: {
    type: Date,
    },
  carreras_Oficiales:Array,
  carreras_win_Oficiales:Array,
  carreras_second_Oficiales:Array,
  carreras_third_Oficiales:Array,
  for_shedule_Oficiales:String,
   status_oficial:  {
        type:String,
        default:"F",
    },
}, 
  {
  timestamps: true,
  versionKey: false,
    autoIndex:false,
    autoCreate: false,
});






const equinoModel = mongoose.model("equino",equino)

module.exports = equinoModel;







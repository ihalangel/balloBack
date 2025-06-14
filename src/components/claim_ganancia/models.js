const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const canjes={
  usuario: { type: String, index: true },
  balance:{type:Number, default:0},
  balance_api:{type:Number, default:0},
  balance_real:{type:Number, default:0},
  balance_restante:{type:Number, default:0},
  reclamo:{type:String, default:"nada"},
  valor:{type:Number, default:0},
  symbol:{type:String},

  entregado:{type: Boolean, default:false},
  status_claim:{type:String, default:"create"},
  error:{type:String, default:"Sin errores"},
  dia_drop:{type:Date,default:Date},

}

const canjesModel = mongoose.model("canjes",canjes)


module.exports = canjesModel;


 
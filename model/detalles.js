//Modulos internos
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//Esquema
const esquemaDetalles = new mongoose.Schema({
    idCliente:String,
    idProducto:String,
    cantidad:Number
});
//Jwt
esquemaDetalles.methods.generateJWT= function () {
    return jwt.sign({
        id_:this._id,
        cantidad:this.cantidad,
    },"LaVerduleria");
}
//Exports
const Detalles = mongoose.model('detalles',esquemaDetalles);
module.exports.Detalles = Detalles;

//Modulos internos
const mongoose = require('mongoose');
//Esquema
const esquemaProducto = mongoose.Schema({
    idProveedor: String,
    foto:String,
    nombre: String,
    tipo: String,
    masaUnitaria: String,
    precio: Number,
    cantidad: Number
});
//Exports
const Producto = mongoose.model('producto', esquemaProducto);
module.exports.Producto= Producto;




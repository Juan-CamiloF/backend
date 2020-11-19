//Modulos internos
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//Modulos internos
//Esquema
const esquemaProveedor = new mongoose.Schema({
	nombres: String,
	apellidos: String,
	correo: String,
	departamento: String,
	municipio: String,
	direccion: String,
	telefono: String,
	pass: String,
});
//Jwt
esquemaProveedor.methods.generateJWT= function(){
	return jwt.sign({
		_id:this._id,
		nombres:this.nombres,
		apellidos: this.apellidos,
		correo: this.correo,
	},"LaVerduleria");
};
//Exports
const Proveedor = mongoose.model('proveedor',esquemaProveedor);
module.exports.Proveedor =  Proveedor;
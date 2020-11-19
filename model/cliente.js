//Modulos internos
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//Esquema
const esquemaCliente = new mongoose.Schema({
	nombres: String,
	apellidos: String,
	correo: String,
    pass: String,
});
//Jwt
esquemaCliente.methods.generateJWT= function(){
	return jwt.sign({
	_id: this._id,
	nombres: this.nombres,
	correo: this.correo,
	},"LaVerduleria")
}
//Exports
const Cliente = mongoose.model('cliente',esquemaCliente);
module.exports.Cliente= Cliente;
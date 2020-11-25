//Modulos internos
const express = require('express');
const router = express.Router();
//Modulos creados
const { Cliente } = require('../model/cliente');
const authCliente = require('../middleware/authCliente');
//Registrar cliente
router.post("/", async (req,res)=>{
	let cliente = await Cliente.findOne({correo:req.body.correo});


	if(cliente) return res.status(400).send('El correo ya existe como cliente');

	cliente = new Cliente({
		nombres: req.body.nombres,
		apellidos: req.body.apellidos,
		correo: req.body.correo,
		pass: req.body.pass,
		rol: req.body.rol
	});
	const result = await cliente.save();
	const jwtoken = cliente.generateJWT();
	res.status(200).send({jwtoken});
});
//Perfil del cliente
router.get("/perfil",authCliente, async(req,res)=>{
	const cliente = await Cliente.findById(req.cliente._id);
	if(!cliente) return res.status(400).send("El cliente no existe");
	res.send(cliente);
})
//Export
module.exports = router;
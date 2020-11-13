//Modulos internos
const express = require('express');
const router = express.Router();
//Modulos creados
const { Cliente } = require('../model/cliente');

router.post("/", async (req,res)=>{
	let cliente = await Cliente.findOne({correo:req.body.correo});


	if(cliente) return res.status(400).send('El correo ya existe como cliente');

	cliente = new Cliente({
		nombres: req.body.nombres,
		apellidos: req.body.apellidos,
		correo: req.body.correo,
		pass: req.body.pass,
	});
	const result = await cliente.save();
	const jwtoken = cliente.generateJWT();
	res.status(200).send({jwtoken});
});

module.exports = router;
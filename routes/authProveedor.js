//Modulos internos
const express = require('express');
const router = express.Router();
//Modulos creados
const { Proveedor } = require('../model/proveedor');
//Ruta
router.post("/" , async(req,res)=>{
    const proveedor = await Proveedor.findOne({correo:req.body.correo});

    if(!proveedor) return res.status(400).send("Correo o contraseña incorrectos");

    if(proveedor.pass !== req.body.pass) return res.status(400).send("Correo o contraseña incorrectos");

    const jwToken =  proveedor.generateJWT();
    res.status(200).send({jwToken});
});
//Export
module.exports = router;
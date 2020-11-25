//Modulos internos
const express = require('express');
const router = express.Router();
//Modulos creados
const { Cliente } = require('../model/cliente');
//Ruta
router.post("/", async(req,res)=>{
    const cliente = await Cliente.findOne({correo:req.body.correo});

    if(!cliente) return res.status(400).send("Correo o contraseña incorrectos");

    if(cliente.pass !== req.body.pass) return res.status(400).send("Correo o contraseña incorrectos");

    const jwToken = cliente.generateJWT();
    res.status(200).send({ 
        jwToken,
        infoUsuario: {
            nombre: `${proveedor.nombres} ${proveedor.apellidos}`, 
            correo: proveedor.correo, 
            rol: proveedor.rol
        }
    })
});
module.exports = router;


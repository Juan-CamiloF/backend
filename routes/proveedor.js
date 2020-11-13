const express = require("express");
const router = express.Router();

const {Proveedor} =require ("../model/proveedor");


router.post("/", async(req,res)=>{
    let proveedor = await Proveedor.findOne({ correo: req.body.correo });

    //SI ENCUENTRA EL CORREO
    if (proveedor) return res.status(400).send("El correo ya está registrado");

    //si no existe en BD
    proveedor = new Proveedor({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        departamento: req.body.departamento,
        municipio: req.body.municipio,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        pass: req.body.pass,
    });
     //Se guarda el usuario que se crea con el JWT
    const resul = await proveedor.save();
    const jwToken = proveedor.generateJWT();
    res.status(200).send({ jwToken });
});
//exports

module.exports = router;
//Modulos internos
const express = require("express");
const router = express.Router();
//Modulos creados
const { Proveedor } = require("../model/proveedor");
const { Producto } = require("../model/producto");
const authProveedor = require("../middleware/authProveedor");
//Rutas
//Registrar producto
router.post("/",authProveedor,async(req,res)=>{
    //Id del proveedor
    const proveedor = await Proveedor.findById(req.proveedor._id);
    //El proveedor no existe
    if(!proveedor) res.status(400).send("El usuario no existe");
    //Si el proveedor existe agregamos producto
    const producto = new Producto({
        idProveedor: proveedor._id,
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        masaUnitaria:req.body.masaUnitaria,
        precio:req.body.precio,
        cantidad:req.body.cantidad,
    });
    //Resultados
    const result = await producto.save();
    res.status(200).send(result);
});


module.exports= router;
//Modulos internos
const express = require("express");
const router = express.Router();
//Modulos creados
const { Proveedor } = require("../model/proveedor");
const { Detalles } = require("../model/detalles");
const { Producto } = require("../model/producto");
const { Cliente } = require("../model/cliente");
const authProveedor = require("../middleware/authProveedor");
const authCliente = require("../middleware/authCliente");
//Rutas
//----------------------------------Proveedor-----------------------------------------------//
//Registrar producto
router.post("/", authProveedor, async (req, res) => {
  //Id del proveedor
  const proveedor = await Proveedor.findById(req.proveedor._id);
  //El proveedor no existe
  if (!proveedor) res.status(400).send("El proveedor no existe");
  //Si el proveedor existe agregamos producto
  const producto = new Producto({
    idProveedor: proveedor._id,
    //foto:req.body.foto,
    nombre: req.body.nombre,
    tipo: req.body.tipo,
    masaUnitaria: req.body.masaUnitaria,
    precio: req.body.precio,
    cantidad: req.body.cantidad,
  });
  //Resultados
  const result = await producto.save();
  res.status(200).send(result);
});
//Listar los producto propios
router.get("/misProductos", authProveedor, async (req, res) => {
  //Buscamos el proveedor
  const proveedor = await Proveedor.findById(req.proveedor._id);
  //Si no existe el usuario
  if (!proveedor) return res.status(400).send("El proveedor no existe");
  //Si existe
  const producto = await Producto.find({ idProveedor: req.proveedor._id });
  res.send(producto);
});
//Actualizar
router.put("/", authProveedor, async (req, res) => {
  //Buscamos el proveedor
  const proveedor = await Proveedor.findById(req.proveedor._id);
  //Si no existe el usuario
  if (!proveedor) return res.status(400).send("El proveedor no existe");
  const producto = await Producto.findByIdAndUpdate(
    req.body._id,
    {
      idProveedor: req.proveedor._id,
      nombre: req.body.nombre,
      tipo: req.body.tipo,
      masaUnitaria: req.body.masaUnitaria,
      precio: req.body.precio,
      cantidad: req.body.cantidad,
    },
    {
      new: true,
    }
  );
  if (!producto) res.status(400).send("No tiene producto el proveedor");
  res.status(200).send(producto);
});
//Eliminar productos
router.delete("/:_id", authProveedor, async (req, res) => {
  //Buscamos el proveedor
  const proveedor = await Proveedor.findById(req.proveedor._id);
  //Si no existe el proveedor
  if (!proveedor) res.status(400).send("El proveedor no existe");
  //SI existe
  console.log(req.params._id)
  const producto = await Producto.findOneAndDelete(req.params._id);
  //Si no existe el producto
  if (!producto) res.status(400).send("No existe ese producto");
  res.status(200).send({ message: "Producto eliminado" });
});
//----------------------------------Cliente-----------------------------------------------//
//Todos los productos
router.get("/todos", authCliente, async (req, res) => {
    //Buscar el cliente
    const cliente = await Cliente.findById(req.cliente._id);
    //Si no existe
    if(!cliente) return res.status(400).send("No existe el cliente");
    //Buscamos los productos
    const productos = await Producto.find();
    res.send(productos);
    // const todos = res.json(productos)
    // res.send(todos);
});
//Comprar productos
router.post("/compra",authCliente, async(req,res)=>{
  const cliente = await Cliente.findById(req.cliente._id);
  if(!cliente) return res.status(400).send("El cliente no existe");
  const producto = await Producto.findById(req.body.idProducto);
  if(!producto) return res.status(400).send("El producto no existe");

  const detalles = new Detalles({
    idCliente:cliente._id,
    idProducto:producto._id,
    cantidad:req.body.cantidad
  });
  //resultados
  const result = await detalles.save();
  res.status(200).send(result);
});
//Productos comprados
router.get("/misCompras",authCliente, async(req,res)=>{
  const cliente = await Cliente.findById(req.cliente._id);
  if(!cliente) return res.status(400).send("El cliente no existe");
  const detalles = await Detalles.find({idCliente:req.cliente._id});
  res.send(detalles);
})
//Export
module.exports = router;

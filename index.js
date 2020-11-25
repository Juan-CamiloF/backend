//Modulos internos
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
//Modulo creados
const cliente= require("./routes/cliente");
const proveedor = require("./routes/proveedor");
const authCliente = require("./routes/authCliente");
const authProveedor = require("./routes/authProveedor");
const producto = require("./routes/producto");

//APP
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/cliente",cliente);
app.use("/api/proveedor",proveedor);
app.use("/api/authCliente", authCliente);
app.use("/api/authProveedor", authProveedor);
app.use("/api/producto", producto);

//puerto para ejecutar el srvr
const port = process.env.PORT || 3003;
app.listen(port, () => console.log("Ejecutando en el puerto:" + port));
//conexion a mongoDB
mongoose.connect("mongodb://localhost/laVerduleria",{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Conexión a mongoDB: Online"))
.catch((error) => console.log("Conexión a mongoDB: OffLine"));
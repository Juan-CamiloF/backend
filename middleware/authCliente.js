//importar modulo de node
const jwt = require("jsonwebtoken");
//validación para identificar el usuario loggeado y sus procesos
function authCliente(req, res, next) {
    let jwToken = req.header("Authorization");
    //split al JWT para separar el Beare que pone por defecto el header del Auth
    jwToken = jwtToken.split(" ")[1];
    //si el token no existe
    if (!jwtToken) return res.status(405).send("no hay token para acceder");
    //si el token existe
    try {
        const payload = jwt.verify(jwtToken, "LaVerduleria");
        req.cliente = payload;
        next();
    } catch (error) {
        res.status(405).send("Token sin autorización")
    }
}
//export
module.exports = authCliente;
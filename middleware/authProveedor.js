//importar modulo de node
const jwt = require("jsonwebtoken");
//validación para identificar el usuario loggeado y sus procesos
function authProveedor(req, res, next) {
    let jwToken = req.header("Authorization");
    console.log('este es el token de proveedor ---------------------------------------', jwToken)
    //split al JWT para separar el Beare que pone por defecto el header del Auth
    jwToken = jwToken.split(" ")[1];
    //si el token no existe
    if (!jwToken) return res.status(405).send("no hay token para acceder");
    //si el token existe
    try {
        const payload = jwt.verify(jwToken, "LaVerduleria");
        req.proveedor = payload;
        next();
    } catch (error) {
        res.status(405).send("Token sin autorización")
    }
}
//export
module.exports = authProveedor;
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey  = getProperties();
//generar token
/**
 * pasar el objeto del usuario (name,password etc)
 * @param {*} user 
 */
const tokenSign = async (user) => {
    //firmar el token
    const sign = jwt.sign(
        {
            [propertiesKey.id]: user[propertiesKey.id],
            role:user.role
        },
        JWT_SECRET,
        {
            expiresIn:3000//expiresIn:"1h"
        }
    );
    return sign;
};

/**
 * pasar el token de sesion el JWT
 * @param {*} tokenJwt 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt,JWT_SECRET);
    } catch (error) {
        return null
    }
}

//exportar funciones
module.exports = {tokenSign,verifyToken}
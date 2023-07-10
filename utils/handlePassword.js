const bcryptjs = require("bcryptjs");

/**
 * Contraseña sin encriptar:
 * @param {*} passwordPlain 
 */
const encrypt = async (passwordPlain) => {
    const hash =  await bcryptjs.hash(passwordPlain,10);// 10 => cantidad de caracteres del encriptado
    return hash;
};
/**
 * Pasar la contraseña sin encriptar y pasar contrasea encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlain,hashPassword) => {
    return await bcryptjs.compare(passwordPlain,hashPassword);
};

module.exports = {encrypt,compare}

const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT");
const { usersModel } = require("../database/models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const authMiddleware = async (req,res,next) =>{
    try {
        //capturar token
        if(!req.headers.authorization){
            handleHttpError(res,"NOT_TOKEN",401);
            return
        }
        const token = req.headers.authorization.split(' ').pop();//.pop() toma solo la segunda division y no el bearer
        const dataToken = await verifyToken(token)

        if(!dataToken){
            handleHttpError(res,"NOT_PAYLOAD_DATA",401);
            return
        }

        const query = {
            [propertiesKey.id]:dataToken[propertiesKey.id]
        }
        //TODO: _id:97987 ó id:97987 
        const user = await usersModel.findOne(query); // metodo comun =>  findOne
        //const user = await usersModel.findById(dataToken._id); findById => metodo para mongo
        req.user = user
        
        next()
        
    } catch (error) {
        handleHttpError(res,"NOT_SESSION",401);
    }

}

module.exports = authMiddleware
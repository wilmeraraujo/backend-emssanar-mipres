const fs = require("fs");
//const { matchedData } = require('express-validator');
const {usersModel} = require("../../database/models");
const { handleHttpError } = require("../../utils/handleError");
const { matchedData } = require('express-validator');
const {tokenSign} = require("../../utils/handleJWT");
const {encrypt} = require("../../utils/handlePassword")

//const PUBLIC_URL = process.env.PUBLIC_URL;
//const MEDIA_PATH = `${__dirname}/../storage`;
/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req,res) => {
    //const data = ["hola","mundo"]
    //  res.send({data})
    try {
        const data = await usersModel.find({});
        res.send({data})    
    } catch (error) {
        handleHttpError(res,"ERROR_GET_ITEM")   
    }    
};
/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req,res) => {
    //const { id } = matchedData(req);
    //console.log("id=>" + id);
    try {
        const { id } = matchedData(req);
        const data = await usersModel.findById(id);
        res.send({data})    
    } catch (error) {
        handleHttpError(res,"ERROR_DETAIL_ITEM")   
    }
};
/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req,res) => {
    try {
        const { id, ...body } = matchedData(req); // matchedData(req) limpia la data y quita los campos basura
        const password = await encrypt(body.password);
        const dataUpdate = { ...body, password };
        const dataUser = await usersModel.findOneAndUpdate({ _id: id }, dataUpdate,{new:true}); // Agregamos un objeto de filtro para encontrar el documento específico //{new:true} => devuelve la informacion actualizada
        dataUser.set('password', undefined,{strict:false});//para quitar el campo password en la respuesta, pero tambien se debe desactivar del modelo
        
        const data = {
            token: await tokenSign(dataUser),
            user:dataUser
        }
        res.send({data}); 
      
    } catch (e) {
        console.error(e); // Imprimimos el error en la consola para obtener más detalles
        handleHttpError(res, 'ERROR_UPDATE_ITEMS');
    }
};
/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req,res) => {
    try {
        req = matchedData(req);// matchedData(req)=> limpia la data => quita los campos basura 
        const {id} = req;
        //const data = await tracksModel.deleteOne({_id:id});//deleteOne=> se lo utiliza para realizar un borrado fisico
        const data = await usersModel.delete({_id:id});//delete => borrado logico => deleteOne= borrado fisico o total
        res.send({data});
    } catch (error) {
        handleHttpError(res,"ERROR_DELETE_ITEM")
    }
};
module.exports = {getItems,getItem,updateItem,deleteItem};
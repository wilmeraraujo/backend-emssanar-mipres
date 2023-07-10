const express = require("express");
const router = express.Router();
//const uploadMiddleware = require("../utils/handleStorage");
//const {validatorGetItem} = require("../validators/storage");
const authMiddleware = require("../middleware/sessionMiddleware");
const { getItems,getItem,updateItem,deleteItem }= require("../controllers/users/usersController");
const checkRol = require("../middleware/rol");
const { validatorGetItem,validatorCreateItem } = require("../validators/users/userValidator");
//TODO http://localhost:3000/storge

/*router.post("/",uploadMiddleware.single("myfile"), (req,res) => {
    res.send({a:1})
})*/

/**
 * lista de items
 */
router.get("/",authMiddleware,checkRol(["user"]),getItems);
/**
 * obtener detalle de items
 * router.get("/:id/:var1/:var2", getItem);
 */
router.get("/:id", authMiddleware, checkRol(["user"]),validatorGetItem, getItem);
/**
 * actualizar un registro
 */
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem,updateItem);
/**
 * eliminar un registro
 */
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);


module.exports = router;
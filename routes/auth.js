const express = require("express");
const router = express.Router();
const {registerCtrl,loginCtrl} = require("../controllers/auth/authController");
const {validatorRegister,validatorLogin}= require("../validators/auth/authValidator");
const authMiddleware = require("../middleware/sessionMiddleware");
const checkRol = require("../middleware/rol");

//TODO http://localhost:3000/api/auth GET, POST, DELETE, PUT
//TODO http://localhost:3000/api/auth/login
//TODO http://localhost:3000/api/v1/auth/register
/**
 * crear un registro
 */
router.post("/register",validatorRegister,registerCtrl)
//router.post("/register",registerCtrl)
router.post("/login",validatorLogin,loginCtrl)

module.exports = router
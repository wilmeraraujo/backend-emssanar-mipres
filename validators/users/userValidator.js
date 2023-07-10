const {check, validationResult} = require("express-validator");
const  validateResults = require("../../utils/handleValidator");



const validatorCreateItem = [
    check("name").exists().notEmpty().isLength({min:1,max:99}),
    check("age").exists().notEmpty().isNumeric(),
    check("password").exists().notEmpty().isLength({min:3,max:15}),
    check("email").exists().notEmpty().isEmail(),
    check("role").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req,res,next)
    }
];
const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req,res,next)
    }
];

module.exports = { validatorGetItem,validatorCreateItem };
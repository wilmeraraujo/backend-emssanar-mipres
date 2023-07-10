const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")
const UserScheme = new mongoose.Schema(
    {
        name: {
            type:String,
            required:true,
            trim:true,
        },
        age:{
            type:Number,
            required:true,
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            unique:true,
        },
        password:{
            type:String,
            select:false//oculta el campo
        },
        role:{
            type:["user","admin"],
            //default:"user",
        }
    },
    {
        timestamps:true, //createdAt, updatedAt
        versionkey:false,
    }
);

UserScheme.plugin(mongooseDelete, {overrideMethods:'all'}) 
//mongoose.model('user',UserScheme,'usuarios');
module.exports = mongoose.model("users", UserScheme)
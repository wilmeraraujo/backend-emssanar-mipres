const express = require("express");
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname;//TODO direccion c:\ ...

const removeExtension = (fileName) => {
    //TODO tracks.js => [tracks,js]
    return fileName.split('.').shift()//toma el primer valor es decir el nombre sin la extencion "tracks"
}
//const a = fs.readdirSync(PATH_ROUTES)
fs.readdirSync(PATH_ROUTES).filter((file) =>{
    const name = removeExtension(file)//TODO index,tracks
    if (name !== 'index'){
        //console.log(`cagando ruta ${name}`)
        router.use(`/${name}`,require(`./${file}`)) //TODO http://localhost:3000/api/v1/users
    }
})
//console.log({a})

module.exports = router
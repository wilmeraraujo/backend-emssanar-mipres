require("dotenv").config()
const express = require("express")
const http = require('http')
const cors = require ("cors")
const dbConnectNoSql = require('./config/mongo-conexion')

dbConnectNoSql();
const app = express();
const server = http.createServer(app);
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3002

app.use("/api/v1",require("./routes"))

server.listen(port, () =>{
    console.log(`el servidor esta corriendo en http://localhost:${port}`);
});
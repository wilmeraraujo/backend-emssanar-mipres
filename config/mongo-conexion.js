const mongoose = require('mongoose');

// Conectar a la base de datos
const dbConnect = () => {
    // Establecer la cadena de conexión a tu instancia local de MongoDB
    const MONGO_HOST = process.env.MONGO_HOST;
    const MONGO_DB = process.env.MONGO_DB;
    const DB_URI = `mongodb://${MONGO_HOST}/${MONGO_DB}`;

    mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const collection = mongoose.connection.db.collection('dummyCollection');
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });
}

module.exports = dbConnect
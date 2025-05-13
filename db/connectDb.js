const mongoose = require("mongoose");

const URL_MONGO = process.env.URL_MONGO;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(URL_MONGO);
        console.log("Conexión a MongoDb exitosa");
    } catch (error) {
    console.log("Error al conectar con MongoDb", error);
    }
}

module.exports = connectToDatabase;



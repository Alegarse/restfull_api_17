// FICHERO DE ARRANQUE

// GET -> GET PARA OBTENER RECURSOS -> find
// POST -> POST PARA CREAR RECURSOS -> create
// PUT -> PUT PARA ACTUALIZAR RECURSOS -> updateOne
// DELETE -> DELETE PARA ELIMINAR RECURSOS -> deteleOne
// PATCH -> PATCH PARA ACTUALIZAR PARCIALMENTE RECURSOS -> updateOne
const PORT = 3000;
const express = require('express');
const userRouter = require('./routers/userRouter');
// Para tener nuestras variables de entorno en cualquier parte de la aplicacion
require("dotenv").config();
const connectToDatabase = require("./db/connectDb");

const app = express();

connectToDatabase();
// Middleware que permite usar JSON en el body para pasar datos
// Importante este orden, siempre la configuración antes de meter las rutas
app.use(express.json());
app.use('/api/user', userRouter);
//app.use('/api/product', productRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


// ENDPOINTS
// http//localhost:3000/api/user
// http//localhost:3000/api/user/1
// http//localhost:3000/api/user/search/car
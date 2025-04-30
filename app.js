// GET -> GET PARA OBTENER RECURSOS -> find
// POST -> POST PARA CREAR RECURSOS -> create
// PUT -> PUT PARA ACTUALIZAR RECURSOS -> updateOne
// DELETE -> DELETE PARA ELIMINAR RECURSOS -> deteleOne
// PATCH -> PATCH PARA ACTUALIZAR PARCIALMENTE RECURSOS -> updateOne
const PORT = 3000;
const express = require('express');
const userRouter = require('./routers/userRouter')

const app = express();

app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// http//localhost:3000/api/user
// http//localhost:3000/api/user/1
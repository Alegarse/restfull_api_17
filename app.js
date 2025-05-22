// FICHERO DE ARRANQUE

// GET -> GET PARA OBTENER RECURSOS -> find
// POST -> POST PARA CREAR RECURSOS -> create
// PUT -> PUT PARA ACTUALIZAR RECURSOS -> updateOne
// DELETE -> DELETE PARA ELIMINAR RECURSOS -> deteleOne
// PATCH -> PATCH PARA ACTUALIZAR PARCIALMENTE RECURSOS -> updateOne
const PORT = 3000;
const express = require("express");
const userRouter = require("./routers/userRouter");
const movieRouter = require("./routers/movieRouter");
const loginRouter = require("./routers/loginRouter");
const cors = require("cors");
const cron = require("node-cron");

// Para tener nuestras variables de entorno en cualquier parte de la aplicacion
require("dotenv").config();
require("./jobs/emailCronJob");

const connectToDatabase = require("./db/connectDb");

const app = express();
// Middleware que permite usar JSON en el body para pasar datos
// Importante este orden, siempre la configuración antes de meter las rutas
app.use(cors());
app.use(express.json());

const test = true;
if (!test) connectToDatabase();

app.use("/api/user", userRouter);
// Para las peliculas
app.use("/api/movies", movieRouter);
//Para el login
app.use("/api/auth", loginRouter);

if (!test) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

cron.schedule("39 18 * * *", async () => {
  console.log("Ejecutando tarea programada");
});

// * * * * *
// │ │ │ │ │
// │ │ │ │ └─ Día de la semana (0 - 7) (0 o 7 = Domingo)
// │ │ │ └─── Mes (1 - 12)
// │ │ └───── Día del mes (1 - 31)
// │ └─────── Hora (0 - 23)
// └───────── Minuto (0 - 59)

module.exports = app;
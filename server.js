const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
mongoose
  .connect("mongodb://localhost:27017/eatez", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("No se pudo conectar a MongoDB:", err));

app.get("/", (req, res) => {
  res.send("¡Hola, mundo! Bienvenido a la API de Eatez.");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

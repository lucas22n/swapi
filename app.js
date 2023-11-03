const express = require("express");
const cors = require("cors");
const app = express();
const puerto = 8080;

// Puerto de ejecución
app.listen(puerto, () => {
  console.log(`Corriendo el servidor en el puerto ${puerto}`);
});

// Cors para evitar "Access control allow origin"
app.use(
  cors({
    origin: "*",
  })
);

// Endpoint de personajes
app.get("/", (req, res) => {
  // Petición a Star Wars API
  const starwars = fetch("https://swapi.dev/api/people/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.send(data);
    });
});

// Endpoint para paginado de personas

app.get("/api/people", (req, res) => {
  const urlPage = req.query.page;
  // Petición a Star Wars API
  const starwars = fetch(`${urlPage}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.send(data);
    });
});

// Endpoint para planetas

app.get("/api/planet/", (req, res) => {
  const urlPlanet = req.query.planet;
  // Petición a Star Wars API
  const starwars = fetch(`${urlPlanet}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.send(data);
    });
});

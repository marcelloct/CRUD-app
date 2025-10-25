const express = require("express");
const app = express();

process.loadEnvFile();
const PORT = process.env.PORT;

let pokemons = [
  {
    id: 1,
    name: "pikachu",
    type: "electric",
  },
  {
    id: 2,
    name: "raichu",
    type: "electric",
  },
];

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/api", (request, response) => {
  response.json(pokemons);
});

app.get("/api/:name", (request, response) => {
  const pokemonName = request.params.name.toLowerCase();
  const pokemon = pokemons.find((p) => p.name === pokemonName);

  pokemon ? response.json(pokemon) : response.status(404).end();
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Running Server on http://localhost:8000`);
});

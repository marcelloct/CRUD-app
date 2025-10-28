const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();

process.loadEnvFile();
const PORT = 8000;
const ADMIN = process.env.DB_ADMIN;
const PASSWORD = process.env.DB_PASSWORD;

const connectionString = `mongodb+srv://${ADMIN}:${PASSWORD}@cluster0.veax5p4.mongodb.net/?appName=Cluster0`;

// Database Connection
MongoClient.connect(connectionString)
  .then((client) => {
    const db = client.db("currentMovies");
    const collection = db.collection("movies");
    console.log(`Connected to Database`);

    // Template engine
    app.set("view engine", "ejs");

    // Make sure you place this before your CRUD handlers!
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(express.json());

    // Render index with db data
    app.get("/", (request, response) => {
      collection
        .find()
        .toArray()
        .then((results) => {
          response.render("index.ejs", { info: results });
        })
        .catch((err) => console.error(err));
    });

    // Post Movie
    app.post("/addMovie", (request, response) => {
      collection
        .insertOne({
          title: request.body.title,
          genre: request.body.genre,
          likes: 0,
        })
        .then((result) => {
          console.log("Movie Added Successfully");
          response.redirect("/");
        })
        .catch((err) => console.error(err));
    });
  })
  .catch((err) => console.error(`error: ${err}`));

app.get("/api", (request, response) => {
  response.json(movies);
});

app.get("/api/:title", (request, response) => {
  const movieTitle = request.params.title.toLowerCase();
  const movie = movies.find((m) => m.title === movieTitle);

  movie ? response.json(movie) : response.status(404).end();
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Running Server on http://localhost:8000`);
});

// Add .sort({likes: -1}) method before toArray in app.get('/')

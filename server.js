const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();

process.loadEnvFile();
const PORT = 8000;
const ADMIN = process.env.DB_ADMIN;
const PASSWORD = process.env.DB_PASSWORD;

let db, collection;

const connectionString = `mongodb+srv://${ADMIN}:${PASSWORD}@cluster0.veax5p4.mongodb.net/?appName=Cluster0`;

// Database Connection
MongoClient.connect(connectionString)
  .then((client) => {
    db = client.db("currentMovies");
    collection = db.collection("movies");
    console.log(`Connected to Database`);

    // Template engine
    app.set("view engine", "ejs");

    // Make sure you place this before your CRUD handlers!
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(express.json());

    // GET Method - Render index with data
    app.get("/", (request, response) => {
      collection
        .find()
        .toArray()
        .then((results) => {
          response.render("index.ejs", { info: results });
          console.log(results);
        })
        .catch((err) => console.error(err));
    });

    // POST Method
    app.post("/addMovie", (request, response) => {
      collection
        .insertOne({
          title: request.body.title,
          genre: request.body.genre,
          likes: 0,
        })
        .then((result) => {
          console.log("Movie Added Successfully");
          console.log(result);
          response.redirect("/");
        })
        .catch((err) => console.error(err));
    });

    // DELETE Method
    app.delete("/deleteMovie", (request, response) => {
      collection
        .deleteOne({ title: request.body.title })
        .then((result) => {
          console.log(`${request.body.title} removed successfully`);
          response.json("Movie Deleted");
        })
        .catch((err) => console.error(err));
    });
    // PUT Method
    app.put("/addLike", (request, response) => {
      // collection
      //   .updateOne(
      //     { title: request.body.title, likes: request.body.likes },
      //     {
      //       $set: {
      //         likes: request.body.likes + 1,
      //       },
      //     },
      //     {
      //       sort: { _id: -1 },
      //       upsert: false, // Do not insert new doc if not found
      //     }
      //   )
      //   .then((result) => {
      //     console.log("Added One"); // Log confirmation
      //     response.json("Added One"); // Send JSON response
      //   })
      //   .catch((error) => console.error(error));
    });

    // End of connection
  })
  .catch((err) => console.error(`error: ${err}`));

app.listen(process.env.PORT || PORT, () => {
  console.log(`Running Server on http://localhost:8000`);
});

// Add .sort({likes: -1}) method before toArray in app.get('/')

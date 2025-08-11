const express = require("express");
// import mongoose
const mongoose = require("mongoose");

// setup an express app
const app = express();

// connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    // wait for the MongoDB to connect
    await mongoose.connect("mongodb://localhost:27017/netflix");
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
}

// trigger the connection with MongoDB
connectToMongoDB();

// declare the schema for Movies
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  release_year: Number,
  genre: String,
  rating: Number,
});

const tvshowSchema = new mongoose.Schema({
  title: String,
  creator: String,
  premiere_year: Number,
  end_year: Number,
  seasons: Number,
  genre: String,
  rating: Number,
});

// create a modal form the schema
const Movie = mongoose.model("Movie", movieSchema);

const TVShow = mongoose.model("TVShow", tvshowSchema);

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

/*
  Routes for movies
  GET /movies - list all the movies
  GET /movies/68941d9dd6c0a0f6f210a9ae - get a specific movie
  POST /movies - add a new movie
  PUT /movies/68941d9dd6c0a0f6f210a9ae - update movie
  DELETE /movies/68941d9dd6c0a0f6f210a9ae - delete movie
*/

//  GET /movies - list all the movies
/*
  query params is everything after the ? mark
*/
app.get("/movies", async (req, res) => {
  // query params
  const director = req.query.director;
  const genre = req.query.genre;
  const rating = req.query.rating;

  // create an empty container for filter
  let filter = {};

  // if director exists, then only add it into the filter container
  if (director) {
    filter.director = director;
  }

  // if genre exists, then only add it into the filter container
  if (genre) {
    filter.genre = genre;
  }

  // if rating exists, then only add it into the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }

  // load the movies data from mongoDB
  const movies = await Movie.find(filter);
  res.send(movies);
});

// GET /movies/:id - get a specific movie
app.get("/movies/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the movie data based on id
  const movie = await Movie.findById(id);
  res.send(movie);
});

// get all tvshows
app.get("/tvshows", async (req, res) => {
  // query params
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;

  const filter = {};

  if (genre) {
    filter.genre = genre;
  }

  if (rating) {
    filter.rating = { $gt: rating };
  }

  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }

  const tvshows = await TVShow.find(filter);
  res.send(tvshows);
});

// get a specific tvshow id
app.get("/tvshows/:id", async (req, res) => {
  const id = req.params.id;
  const tvshow = await TVShow.findById(id);
  res.send(tvshow);
});

// start the express port
app.listen(5123, () => {
  console.log("The server is running at http://localhost:5123");
});

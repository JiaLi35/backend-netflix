const express = require("express");
// create an express router
const router = express.Router();
// import the movie
const Movie = require("../models/movie");

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
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the movie data based on id
  const movie = await Movie.findById(id);
  res.send(movie);
});

module.exports = router;

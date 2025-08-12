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

/*
  POST /movies - add new movie
  this POST route need to accept the following parameters
  - title
  - director
  - release_year
  - genre
  - rating
*/
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (!title || !director || !release_year || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required.",
      });
    }

    // create new movie
    const newMovie = new Movie({
      title: title,
      director: director,
      release_year: release_year,
      genre: genre,
      rating: rating,
    });
    // save the new movie into mongodb
    await newMovie.save(); // clicking the "save" button
    res.send(newMovie);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// PUT /movies/68941d9dd6c0a0f6f210a9ae - update movie
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id of the movie from url
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (!title || !director || !release_year || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required.",
      });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        title: title,
        director: director,
        release_year: release_year,
        genre: genre,
        rating: rating,
      },
      {
        new: true, // return the updated data
      }
    );

    res.status(200).send(updatedMovie);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// DELETE /movies/68941d9dd6c0a0f6f210a9ae - delete movie
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Movie.findByIdAndDelete(id);
    res
      .status(200)
      .send({ message: `Movie with the ID of ${id} has been deleted.` });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;

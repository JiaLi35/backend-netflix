const express = require("express");
// create an express router
const router = express.Router();
// import the model TVShow
const TVShow = require("../models/tvshow");

// get all tvshows
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const tvshow = await TVShow.findById(id);
  res.send(tvshow);
});

module.exports = router;

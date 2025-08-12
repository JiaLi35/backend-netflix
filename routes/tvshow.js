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

// POST - add new movie
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year; // optional
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check if fields are empty
    if (!title || !creator || !premiere_year || !seasons || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required.",
      });
    }

    // create a new tvshow
    const newTVShow = new TVShow({
      title: title,
      creator: creator,
      premiere_year: premiere_year,
      end_year: end_year,
      seasons: seasons,
      genre: genre,
      rating: rating,
    });

    // save the new tvshow into mongodb
    await newTVShow.save();
    res.send(newTVShow);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// PUT - update tvshow
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year; // optional
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check if fields are empty
    if (!title || !creator || !premiere_year || !seasons || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required.",
      });
    }

    const updatedTVShow = await TVShow.findByIdAndUpdate(
      id,
      {
        title: title,
        creator: creator,
        premiere_year: premiere_year,
        end_year: end_year,
        seasons: seasons,
        genre: genre,
        rating: rating,
      },
      {
        new: true,
      }
    );

    res.status(200).send(updatedTVShow);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// DELETE - delete tvshow
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await TVShow.findByIdAndDelete(id);
    res
      .status(200)
      .send({ message: `TV show with the ID of ${id} has been deleted.` });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;

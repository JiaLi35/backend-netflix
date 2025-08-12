const express = require("express");
// create an express router
const router = express.Router();
// import the model TVShow
const TVShow = require("../models/tvshow");

const {
  getTVShows,
  getTVShow,
  addTVShow,
  updateTVShow,
  deleteTVShow,
} = require("../controllers/tvshow");

// get all tvshows
router.get("/", async (req, res) => {
  // query params
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;

  res.status(200).send(await getTVShows(genre, rating, premiere_year));
});

// get a specific tvshow id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  res.send(await getTVShow(id));
});

// POST - add new tvshow
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

    res
      .status(200)
      .send(
        await addTVShow(
          title,
          creator,
          premiere_year,
          end_year,
          seasons,
          genre,
          rating
        )
      );
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

    res
      .status(200)
      .send(
        await updateTVShow(
          id,
          title,
          creator,
          premiere_year,
          end_year,
          seasons,
          genre,
          rating
        )
      );
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// DELETE - delete tvshow
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteTVShow(id);
    res
      .status(200)
      .send({ message: `TV show with the ID of ${id} has been deleted.` });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;

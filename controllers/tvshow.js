const TVShow = require("../models/tvshow");

async function getTVShows(genre, rating, premiere_year) {
  let filter = {};

  if (genre) {
    filter.genre = genre;
  }

  if (rating) {
    filter.rating = { $gt: rating };
  }

  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }

  return await TVShow.find(filter);
}

async function getTVShow(id) {
  return await TVShow.findById(id);
}

async function addTVShow(
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) {
  // create a new tvshow
  const newTVShow = new TVShow({
    // title: title // long method
    title, // short method (can only use if both sides are same name)
    creator,
    premiere_year,
    end_year,
    seasons,
    genre,
    rating,
  });

  // save the new tvshow into mongodb
  await newTVShow.save();
  return newTVShow;
}

async function updateTVShow(
  id,
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) {
  return await TVShow.findByIdAndUpdate(
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
}

async function deleteTVShow(id) {
  return await TVShow.findByIdAndDelete(id);
}

module.exports = {
  getTVShows,
  getTVShow,
  addTVShow,
  updateTVShow,
  deleteTVShow,
};

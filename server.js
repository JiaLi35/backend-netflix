const express = require("express");
// import mongoose
const mongoose = require("mongoose");

// setup an express app
const app = express();

// set up a middleware to handle JSON request
app.use(express.json());

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

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

// import all the routers
const movieRouter = require("./routes/movie");
app.use("/movies", movieRouter);

const tvshowRouter = require("./routes/tvshow");
app.use("/tvshows", tvshowRouter);

// start the express port
app.listen(5123, () => {
  console.log("The server is running at http://localhost:5123");
});

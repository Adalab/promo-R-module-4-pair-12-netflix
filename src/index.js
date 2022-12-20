const express = require("express");
const cors = require("cors");
const movies = require('./data/movies.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get("/movies", (req, res) => {
const genderFilterParam = req.query.gender;
const filteredMovies = movies.filter((movie) => {
  return movie.gender.toLowerCase().includes(genderFilterParam.toLowerCase());
});

const response = {
    success: true,
    movies: filteredMovies,
  };
  res.json(response);
});

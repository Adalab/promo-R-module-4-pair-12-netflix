const express = require("express");
const cors = require("cors");
const movies = require("./data/movies.json");
const users = require("./data/users.json");

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

server.post("/login", (req, res) => {
  const filteredUsers = users.find((user) => {
    console.log(req.body.email.value);
    return user.email === req.body.email;
  });
  console.log(filteredUsers);
  if (filteredUsers === undefined) {
    const response = {
      success: false,
      errorMessage: "Usuaria/o no encontrada/o",
    };
    res.json(response);
  } else {
    const response = {
      success: true,
      userId: "id_de_la_usuaria_encontrada",
    };

    res.json(response);
  }
});

const staticServerPath = "./src/public-react";
server.use(express.static(staticServerPath));

const staticServerPhotoPath = "./src/public-movies-images";
server.use(express.static(staticServerPhotoPath));

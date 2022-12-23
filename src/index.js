const express = require('express');
const cors = require('cors');
/* const movies = require('./data/movies.json'); */
const users = require('./data/users.json');

// create and config server
const server = express();
const Database = require('better-sqlite3');
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');
const db = Database('./src/data/movies.db', {
  verbose: console.log,
});

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
  if (req.query.gender !== '') {
    const query = db.prepare('SELECT * FROM movies WHERE lower(gender) = ?');
    const movies = query.all(req.query.gender);
    const response = {
      success: true,
      movies: movies,
    };
    res.json(response);
  } else {
    const query = db.prepare('SELECT * FROM movies');
    const movies = query.all();
    const response = {
      success: true,
      movies: movies,
    };
    res.json(response);
  }
});

/* const genderFilterParam = req.query.gender;
  const filteredMovies = movies.filter((movie) => {
    return movie.gender.toLowerCase().includes(genderFilterParam.toLowerCase());
  });
  if (req.query.sort === "asc") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
  }

  const response = {
    success: true,
    movies: filteredMovies,
  };
  res.json(response); */

server.post('/login', (req, res) => {
  const filteredUsers = users.find((user) => {
    return (
      user.email === req.body.userEmail &&
      user.password === req.body.userPassword
    );
  });
  console.log(filteredUsers);
  if (filteredUsers) {
    const response = {
      success: true,
      userId: 'id_de_la_usuaria_encontrada',
    };
    res.json(response);
  } else {
    const response = {
      success: false,
      errorMessage: 'Usuaria/o no encontrada/o',
    };
    res.json(response);
  }
});

server.get('/movie/:movieId', (req, res) => {
  const foundMovie = movies.find((movie) => movie.id === req.params.movieId);
  res.render('movie', foundMovie);
});

const staticServerPath = './src/public-react';
server.use(express.static(staticServerPath));

const staticServerPhotoPath = './src/public-movies-images';
server.use(express.static(staticServerPhotoPath));

const staticServerStyles = './src/public-movies-styles';
server.use(express.static(staticServerStyles));

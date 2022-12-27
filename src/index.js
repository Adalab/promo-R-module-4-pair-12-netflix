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
const db = new Database('./src/data/movies.db', {
  verbose: console.log,
});
const dbUsers = new Database('./src/data/users.db', {
  verbose: console.log,
});

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
  if (req.query.gender !== '') {
    const query = db.prepare(`SELECT * FROM movies WHERE lower(gender) = ? ORDER BY ${req.body.sort.toUpperCase()}`);
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
  const email = req.body.userEmail;
  const password = req.body.userPassword;
  const query = dbUsers.prepare('SELECT * FROM users WHERE email = ? AND password = ?');
  const foundUserLogin = query.get(email, password);

  if (foundUserLogin) {
    const response = {
      success: true,
      userId: foundUserLogin.id,
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

server.post('/sign-up', (req, res) => {
  const email = req.body.userEmail;
  const password = req.body.userPassword;
  const selectUsers = dbUsers.prepare('SELECT * FROM users WHERE email = ?');
  const foundUser = selectUsers.get(email);
  if (foundUser === undefined) {
    const query = dbUsers.prepare('INSERT INTO users (email, password)  VALUES (? , ?)');
    const result = query.run(email, password);
    res.json({
      "success": true,
      "userId": result.lastInsertRowid
    });
  } else {
    res.json({
      "success": false,
      "errorMessage": "Usuaria ya existente"
    });
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

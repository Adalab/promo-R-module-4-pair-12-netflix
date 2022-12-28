const express = require('express');
const cors = require('cors');

// create and config server
const server = express();
const Database = require('better-sqlite3');
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');
const db = new Database('./src/data/database.db', {
  verbose: console.log,
});

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
  if (req.query.gender !== '') {
    const query = db.prepare(
      `SELECT * FROM movies WHERE lower(gender) = ? ORDER BY title ${req.query.sort.toUpperCase()}`
    );
    const movies = query.all(req.query.gender);
    const response = {
      success: true,
      movies: movies,
    };
    res.json(response);
  } else {
    const query = db.prepare(
      `SELECT * FROM movies ORDER BY title ${req.query.sort.toUpperCase()}`
    );
    const movies = query.all();
    const response = {
      success: true,
      movies: movies,
    };
    res.json(response);
  }
});

server.post('/login', (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const query = db.prepare(
    'SELECT * FROM users WHERE email = ? AND password = ?'
  );
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
  const selectUsers = db.prepare('SELECT * FROM users WHERE email = ?');
  const foundUser = selectUsers.get(email);
  if (foundUser === undefined) {
    const query = db.prepare(
      'INSERT INTO users (email, password)  VALUES (? , ?)'
    );
    const result = query.run(email, password);
    res.json({
      success: true,
      userId: result.lastInsertRowid,
    });
  } else {
    res.json({
      success: false,
      errorMessage: 'Usuaria ya existente',
    });
  }
});

server.post('/user/profile', (req, res) => {
  const selectUsers = db.prepare(
    'UPDATE users SET email = ?, name = ?, password = ? WHERE id = ?'
  );
  const foundUser = selectUsers.run(
    req.body.userEmail,
    req.body.userName,
    req.body.userPassword,
    req.header.userId
  );
  console.log(req.header.userId);
  res.json({
    success: true,
  });
});

server.get('/movie/:movieId', (req, res) => {
  const foundMovie = db.prepare('SELECT * FROM movies WHERE id = ?');
  const movieInfo = foundMovie.get(req.params.movieId);
  res.render('movie', movieInfo);
});

server.get('/user/movies', (req, res) => {
  const movieIdsQuery = db.prepare(
    'SELECT movieId FROM rel_movies_users WHERE userId = ?'
  );
  const movieIds = movieIdsQuery.all(req.header('user-id'));

  const moviesIdsQuestions = movieIds.map((id) => '?').join(', ');

  const moviesQuery = db.prepare(
    `SELECT * FROM movies WHERE id IN (${moviesIdsQuestions})`
  );
  const moviesIdsNumbers = movieIds.map((movie) => movie.movieId);
  const movies = moviesQuery.all(moviesIdsNumbers);

  res.json({
    success: true,
    movies: movies,
  });
  /* res.send('/my-movies'); */
});

const staticServerPath = './src/public-react';
server.use(express.static(staticServerPath));

const staticServerPhotoPath = './src/public-movies-images';
server.use(express.static(staticServerPhotoPath));

const staticServerStyles = './src/public-movies-styles';
server.use(express.static(staticServerStyles));

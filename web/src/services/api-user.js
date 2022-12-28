// login

const sendLoginToApi = (data) => {
  console.log(data, 'Tiene id?');
  const bodyParams = {
    userEmail: data.email,
    userPassword: data.password,
  };
  return fetch('//localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyParams),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// signup

const sendSingUpToApi = (data) => {
  const bodyParams = {
    userEmail: data.email,
    userPassword: data.password,
  };
  return fetch('//localhost:4000/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyParams),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// profile

const sendProfileToApi = (userId) => {
  console.log('Se están enviando datos al profile:', userId);
   const bodyParams = {
    userEmail: userId.email,
    userName: userId.name,
    userPassword: userId.password,
  };
  return fetch('//localhost:4000/user/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user-id': userId,
    },
    body: JSON.stringify(bodyParams),
  })
};


const getProfileFromApi = (userId) => {
  console.log('Se están pidiendo datos del profile del usuario:', userId);
  return fetch('//localhost:4000/user/profile', {
   headers: {
      'user-id': userId,
   }}
  )
  .then(response => response.json())
  .then(data => {
     return data;
  });
};

// user movies

const getUserMoviesFromApi = (userId) => {
  console.log(
    'Se están pidiendo datos de las películas de la usuaria:',
    userId
  );

  return fetch('//localhost:4000/user/movies', {
    method: 'GET',
    headers: {
      'user-id': userId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  sendLoginToApi: sendLoginToApi,
  sendSingUpToApi: sendSingUpToApi,
  sendProfileToApi: sendProfileToApi,
  getProfileFromApi: getProfileFromApi,
  getUserMoviesFromApi: getUserMoviesFromApi,
};

export default objToExport;

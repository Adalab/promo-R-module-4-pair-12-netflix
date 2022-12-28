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
  console.log('Se están enviando datos al signup:', data);
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

const sendProfileToApi = (userId, data) => {
  console.log('Se están enviando datos al profile:', userId, data);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(
    '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json'
  );
};

const getProfileFromApi = (userId) => {
  console.log('Se están pidiendo datos del profile del usuario:', userId);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(
    '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json'
  )
    .then((response) => response.json())
    .then(() => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return {
        success: true,
        name: 'Maricarmen',
        email: 'mari@mail.com',
        password: '1234567',
      };
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

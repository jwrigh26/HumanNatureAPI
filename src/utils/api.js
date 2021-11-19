const axios = require('axios');
const { env } = require('../constants');

function omdbApi() {
  const key = 'a70492f3';
  const api = axios.create({
    baseURL: `http://www.omdbapi.com`,
  });

  async function getStarWars() {
    return await api.get(`?apikey=a70492f3&s=star+wars`);
    // return await axios.get(
    //   'http://www.omdbapi.com/?apikey=a70492f3&s=star+wars'
    // );
  }

  return {
    api,
    getStarWars,
  };
}

function jobNimbusApi() {
  const api = axios.create({
    baseURL: 'https://app.jobnimbus.com/api1',
    headers: {
      common: {
        Authorization: `bearer ${env.jobNimbusToken}`,
        'Content-Type': 'application-json',
      },
    },
  });

  async function createFile(payload) {
    const url = '/files';
    const response = await api.post(url, payload);
    return response;
  }

  return {
    api,
    createFile,
  };
}

module.exports = {
  jobNimbusApi,
  omdbApi,
};

//http://www.omdbapi.com/?apikey=a70492f3&s=star+wars

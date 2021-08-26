const axios = require('axios');

function omdbApi() {
  const key = 'a70492f3';
  const api = axios.create({
    baseURL: `http://www.omdbapi.com`,
  });

  async function getStarWars() {
    return await api.get(`?apikey=a70492f3&s=star+wars`)
    // return await axios.get(
    //   'http://www.omdbapi.com/?apikey=a70492f3&s=star+wars'
    // );
  }

  return {
    api,
    getStarWars,
  };
}

module.exports = {
  omdbApi,
};

//http://www.omdbapi.com/?apikey=a70492f3&s=star+wars

<<<<<<< HEAD
// config.js
import axios from 'axios';

const beAxios = axios.create({
  baseURL: 'http://localhost:3030',
  // timeout: 10000,
  headers: {
    'Accept': 'application/json',
  }
});

export default beAxios;
=======
module.exports = {
  google: {
    API_KEY: '',
    CLIENT_ID: '',
    SECRET: ''
  },
  facebook: {
    APP_ID: ''
  }
};
>>>>>>> a9f051a557aab60e256f92a3b13e46a3324649ae

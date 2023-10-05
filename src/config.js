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

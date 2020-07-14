import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://localhost:5000',
      headers: req.headers
    });
  }
  axios.defaults.withCredentials = true;
  return axios.create({
    baseURL: 'http://localhost:5000'
  });
};

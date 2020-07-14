import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://localhost:5000',
      headers: req.headers
    });
  }
  return axios.create({
    baseURL: 'http://localhost:5000'
  });
};

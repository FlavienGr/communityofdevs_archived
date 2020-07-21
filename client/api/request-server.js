import axios from 'axios';

export default ({ req }) => {
  return axios.create({
    baseURL: 'http://localhost:5000',
    headers: req.headers
  });
};

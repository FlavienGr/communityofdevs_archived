const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    path: path.join(`${process.cwd()}/config/.env.development`)
  });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: path.join(`${process.cwd()}/config/test.env`)
  });
}

const knex = require('knex');

const knexfile = require('../../knexfile');

// sets configuration based on env variable
const env = process.env.NODE_ENV || 'development';
module.exports = knex(knexfile[env]);

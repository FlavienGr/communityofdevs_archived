const dotenv = require('dotenv');
const path = require('path');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    path: path.join(`${process.cwd()}/config/.env.development`)
  });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: path.join(`${process.cwd()}/config/.env.test`)
  });
}
const express = require('express');

const app = express();
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');

// / link to body
app.use(express.json());
// / Logs
app.use(morgan('combined'));
// cookies

// / user router
const routeAuthUser = require('./routes/authUser');
// const routeUser = require('./routes/user');

// / user routes
app.use('/api/v1/user/auth', routeAuthUser);
// app.use('/api/v1/user', routeUser);

// / error handler
app.use(errorHandler);
module.exports = app;

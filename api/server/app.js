const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// / Logs
app.use(morgan('combined'));

// cors
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
  credentials: true, // required to pass
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With'
};
app.use(cors(corsOptions));
app.use(cookieParser());

/// cookies
// / user router
const routeAuthUser = require('./routes/authUser');
const routeUser = require('./routes/user');
const routeUserProject = require('./routes/routeUserProject');

// / user routes
app.use('/api/v1/user/auth', routeAuthUser);
app.use('/api/v1/user', routeUser);
app.use('/api/v1/user/project', routeUserProject);

// / error handler
app.use(errorHandler);
module.exports = app;

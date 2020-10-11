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
  methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS,PUT',
  credentials: true, // required to pass
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With'
};
app.use(cors(corsOptions));
app.use(cookieParser());

// / user router
const routeAuthUser = require('./routes/authUser');
const routeUser = require('./routes/user');
const routeUserProject = require('./routes/routeUserProject');

// / devs router
const routeDevs = require('./routes/devs/routeDevs');
const routeAuthDevelopers = require('./routes/devs/routeAuthDevelopers.js');
const routeSearchProjects = require('./routes/devs/routeSearchProjects.js');
const routeDevsProjects = require('./routes/devs/routeDevsProjects.js');

// / user routes
app.use('/api/v1/user/auth', routeAuthUser);
app.use('/api/v1/user', routeUser);
app.use('/api/v1/user/project', routeUserProject);

/// devs routes
app.use('/api/v1/devs', routeDevs);
app.use('/api/v1/devs/auth', routeAuthDevelopers);
app.use('/api/v1/devs/search', routeSearchProjects);
app.use('/api/v1/devs/search/devs', routeSearchProjects);
app.use('/api/v1/devs/project', routeDevsProjects);

// / error handler
app.use(errorHandler);
module.exports = app;

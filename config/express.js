const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const strategies = require('./passport');
const routes = require('../server/routes/index.route');

const { logs } = require('./vars');

const app = express();
app.use(morgan(logs));

// parse of body parameters and attach it to the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// gzip compression
app.use(compression());

// Allow use PUT or DELETE in places where the client does not support it
// app.use(methodOverride());

// We secure the app through headers HTTP
app.use(helmet());

// activate CORS - Cross Origins Resource Sharing
app.use(cors());

// we activate authentication by passport
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

// mount route api en /api
app.use('/api', routes);

// If the error is not an instance of APIError, convert it
// app.use(error.converter);

// capture 404 and send to error handler
// app.use(error.notFound);

// error handler, send stacktrace only on develepment mode
// app.use(error.handler);

module.exports = app;
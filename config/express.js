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

// parseo de parametros del body y lo adjuntamos a la peticion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// compresion gzip
app.use(compression());

// permite usar PUT o DELETE en lugares donde el cliente no lo soporta
// app.use(methodOverride());

//securizamos la app mediante cabeceras HTTP
app.use(helmet());

//activamos CORS - Cross Origins Resource Sharing
app.use(cors());

// activamos la autenticación mediante passport
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

// montamos las rutas de la api en /api
app.use('/api', routes);

// si el error no es una instancia de APIError, conviértelo
// app.use(error.converter);

// capturamos 404 y lo reenviamos al error handler
// app.use(error.notFound);

// error handler, enviar el stacktrace solo en desarrollo
// app.use(error.handler);

module.exports = app;
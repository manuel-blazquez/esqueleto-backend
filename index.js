Promise = require('bluebird'); 
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');


// abrimos la conexión a mongoose

mongoose.connect();

// escuchamos las peticiones

app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

/**
 * Exportamos express
 * @public
 */

module.exports = app;
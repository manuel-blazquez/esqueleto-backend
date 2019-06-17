const mongoose = require('mongoose');
const logger = require('./logger');
const {mongo, env} = require('./vars');

// Salimos de la aplicacion si hay un error

mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB error de conexión: ${err}`);
    process.exit(-1);
})

// imprimimos el log de mongoose en el entorno de desarrollo
if (env === 'development') {
    mongoose.set('debug', true);
}

/**
 * Conectamos a MongoDB
 * @returns {object} Conexíon a mongoose
 * @public
*/

exports.connect = () => {
    mongoose.connect(mongo.uri, {
        keepAlive: 1, 
        useNewUrlParser: true,
        useCreateIndex: true,
    });
    return mongoose.connection;
}

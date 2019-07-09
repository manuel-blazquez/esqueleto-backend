const mongoose = require('mongoose');
const logger = require('./logger');
const {mongo, env} = require('./vars');

// leave the application if there is an error

mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB error de conexión: ${err}`);
    process.exit(-1);
})

// print log of mongoose on development enviroment
if (env === 'development') {
    mongoose.set('debug', true);
}

/**
 * Connect to MongoDB
 * @returns {object} Connection to mongoose
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

const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        
        /**
         * - Escribe en todos los logs con nivel `info` y siguientes a `combined.log`
         * - Escribe todos los errores a `error.log`.
         */
        
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }), 
    ]
})


/**
 * Si no estamos en producción envía el log a la consola con el formato:
 *  ${info.level}: ${info.message} JSON.stringify({ ...rest }) `
 * 
 */

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

logger.stream = {
    write: (message) => {
        logger.info(message.trim());
    },

};

module.exports = logger;
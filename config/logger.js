const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        
        /**
         * - Write in all logs with level `info` and next to `combined.log`
         * - Write in all logs to `error.log`.
         */
        
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }), 
    ]
})


/**
 *  If we are not in production send the log to the console with the format:
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
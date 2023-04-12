import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'bold red',
        error: 'red',
        warning: 'yellow',
        info: 'green',
        http: 'cyan',
        debug: 'white'
    }
}

const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelsOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: winston.format.simple()
        })
    ]
})

const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug'
        })
    ]
})

export const addLogger = (req, res, next) => {
    if (process.env.NODEENV === 'PROD') {
        req.logger = prodLogger;
        //console.log('Log en modo prodLogger', process.env.NODEENV, prodLogger)
        req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    } else {
        req.logger = devLogger;
        req.logger.debug(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        //console.log(devLogger)
    }

    next();
}
const moment = require('moment');

const logger = (req, res, next) => {
    console.log(`[${moment().format('YYYY-MM-DD hh:mm:ss')}]Endpoint ${req.protocol}://${req.get('host')}${req.originalUrl} hit`)
    next();
}

module.exports = logger;
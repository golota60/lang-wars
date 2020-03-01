const moment = require('moment');

const logger = (req, res, next) => {
    console.log(`Endpoint ${req.protocol}://${req.get('host')}${req.originalUrl} has been hit at ${moment().format()}`)
    next();
}

module.exports = logger;
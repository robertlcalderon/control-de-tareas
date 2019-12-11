const dateTime = require('date-time');
const date = dateTime({local:false});

const helpers = {};

helpers.dateTime = (local) => {
    return date(local);
};

module.exports = helpers;
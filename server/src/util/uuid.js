const uuid = require('uuid').v4;

function createUUID() {
    return uuid()
}

module.exports = createUUID;
const validator = require('validator');

function validateUsername(username) {
    try {
        if (!validator.isAlphanumeric(username) || !validator.isLength(username, { min: 4, max: 20 })) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}
function validateFullName(fullName) {
    try {
        if (!validator.isLength(fullName, { min: 2, max: 50 })) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}

function validateEmail(email) {
    try {
        if (!validator.isEmail(email)) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}


function validatePassword(password) {
    try {
        if (!validator.isLength(password, { min: 8, max: 30 })) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}


module.exports = {
    validateEmail,
    validatePassword,
    validateFullName,
    validateUsername
}
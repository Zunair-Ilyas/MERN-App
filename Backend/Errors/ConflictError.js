const StatusCode = require('http-status-codes')

class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = StatusCode.CONFLICT
    }
}

module.exports = ConflictError;
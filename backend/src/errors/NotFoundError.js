class NotFoundError extends Error {
    constructor(message, externalMessage = 'Resource not found') {
        super(message);
        this.name = 'NotFoundError';
        this.status = 404;
        this.externalMessage = externalMessage;
    }
}

module.exports = NotFoundError;
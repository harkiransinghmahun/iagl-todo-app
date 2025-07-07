class DataAccessError extends Error {
    constructor(message, externalMessage = 'Data access failed') {
        super(message);
        this.name = 'DataAccessError';
        this.status = 500;
        this.externalMessage = externalMessage;
    }
}

module.exports = DataAccessError;
class BaseError extends Error {
    toJSON() {
        return {
            name: this.constructor.name,
            message: this.message,
        }
    }
}

class ValidationError extends BaseError {

};

class PermissionError extends BaseError {

};

class NotFoundError extends BaseError {

};

module.exports = {
    ValidationError,
    NotFoundError,
    PermissionError,
};
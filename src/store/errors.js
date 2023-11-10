class BaseError extends Error {
  toJSON() {
    return {
      name: this.constructor.name,
      message: this.message,
    }
  }
}

export class InvalidNetworkError extends BaseError {
}

export class ConnectionTimedOutError extends BaseError {
}


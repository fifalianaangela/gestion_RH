/**
 * Custom error handler for GraphQL
 */
class GraphQLError extends Error {
  constructor(message, code, additionalInfo = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.additionalInfo = additionalInfo;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Format error for Apollo Server
 */
const formatError = (err) => {
  console.error('GraphQL Error:', err);
  
  // If this is already a formatted error, return it
  if (err.originalError instanceof GraphQLError) {
    const originalError = err.originalError;
    return {
      message: originalError.message,
      code: originalError.code,
      additionalInfo: originalError.additionalInfo,
      locations: err.locations,
      path: err.path
    };
  }

  // Generic database errors
  if (err.originalError && err.originalError.name === 'SequelizeValidationError') {
    return {
      message: 'Validation error',
      code: 'VALIDATION_ERROR',
      additionalInfo: {
        errors: err.originalError.errors.map(e => ({
          field: e.path,
          message: e.message
        }))
      },
      locations: err.locations,
      path: err.path
    };
  }

  if (err.originalError && err.originalError.name === 'SequelizeForeignKeyConstraintError') {
    return {
      message: 'Foreign key constraint error',
      code: 'FOREIGN_KEY_ERROR',
      additionalInfo: {
        detail: err.originalError.original.message
      },
      locations: err.locations,
      path: err.path
    };
  }

  // Default error format
  return {
    message: err.message,
    code: 'INTERNAL_SERVER_ERROR',
    locations: err.locations,
    path: err.path
  };
};

module.exports = {
  GraphQLError,
  formatError
};
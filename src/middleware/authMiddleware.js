const jwt = require('jsonwebtoken');
const { GraphQLError } = require('../utils/errorHandler');

/**
 * Authentication middleware for GraphQL context
 */
const authMiddleware = (req) => {
  // Get the authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return { isAuth: false, userId: null, role: null };
  }
  
  // Extract the token
  const token = authHeader.split(' ')[1];
  if (!token) {
    return { isAuth: false, userId: null, role: null };
  }
  
  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return { 
      isAuth: true, 
      userId: decodedToken.userId,
      role: decodedToken.role 
    };
  } catch (err) {
    return { isAuth: false, userId: null, role: null };
  }
};

/**
 * Verify authentication in resolvers
 */
const isAuthenticated = (context) => {
  if (!context.isAuth) {
    throw new GraphQLError(
      'Not authenticated', 
      'UNAUTHENTICATED',
      { requiredAuth: true }
    );
  }
  return true;
};

/**
 * Check if user has required role
 */
const hasRole = (context, requiredRole) => {
  if (!context.isAuth) {
    throw new GraphQLError(
      'Not authenticated', 
      'UNAUTHENTICATED',
      { requiredAuth: true }
    );
  }
  
  if (context.role !== requiredRole) {
    throw new GraphQLError(
      'Not authorized', 
      'UNAUTHORIZED',
      { requiredRole }
    );
  }
  
  return true;
};

module.exports = {
  authMiddleware,
  isAuthenticated,
  hasRole
};
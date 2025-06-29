// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// Import Joi for schema validation
import Joi from 'joi';

// Middleware to validate request body using Joi schema
export const validateRequest = (schema) => {
  return (req, res, next) => {
    // Validate the request body using the provided schema
    const { error } = schema.validate(req.body, { abortEarly: false });

    // If validation fails, return a 400 error with details
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.details.map((err) => err.message),
      });
    }

    // If validation passes, move to the next middleware or route
    next();
  };
};

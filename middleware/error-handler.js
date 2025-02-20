const errorHandlerMiddleware = (err, req, res, next) => {
  try {
    let customError = {
      // Default to a general error message and status code
      statusCode: err.statusCode || 500,
      message: err.message || "Something went wrong, try again later",
    };

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      customError.message = Object.values(err.errors)
        .map((item) => item.message)
        .join(", ");
      customError.statusCode = 400;
    }

    // Handle duplicate key errors (like duplicate email, username, etc.)
    if (err.code && err.code === 11000) {
      customError.message = `Duplicate value entered for ${Object.keys(
        err.keyValue
      )} field, please choose another value`;
      customError.statusCode = 400;
    }

    // Respond with the clean, user-friendly error message
    return res
      .status(customError.statusCode)
      .json({ error: customError.message });
  } catch (error) {
    next(error);
  }
};

module.exports = errorHandlerMiddleware;

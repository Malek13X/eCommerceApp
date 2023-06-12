const errorHandler = (err, req, res, next) => {
   // Log the error
   console.error(err.stack);

   // Set default status code and error message
   let statusCode = 500;
   let message = "Internal Server Error";

   // Handle Mongoose validation errors
   if (err.name === "ValidationError") {
      statusCode = 400;
      message = Object.values(err.errors).map((error) => error.message);
   }

   // Handle Mongoose duplicate key errors
   if (err.code === 11000) {
      statusCode = 400;
      message = "Duplicate field value entered";
   }

   // Handle JWT errors
   if (err.name === "JsonWebTokenError") {
      statusCode = 401;
      message = "Not authorized, token failed";
   }

   // Handle JWT expired token errors
   if (err.name === "TokenExpiredError") {
      statusCode = 401;
      message = "Not authorized, token expired";
   }

   // Handle email already exist
   if (err.message === "Email already exists") {
      statusCode = 409;
      message = "Email already exist";
   }

   // Handle invalid email or password error
   if (err.message === "Invalid email or password") {
      statusCode = 401;
      message = "Invalid email or password";
   }

   // Handle rate limiting errors
   if (err.status === 429) {
      statusCode = 429;

      message = "Too many attempts. Please try again later.";
   }

   // Handle adding item required field
   if (err.message === "All fields are required") {
      statusCode = 400;
      message = "All fields are required";
   }

   // Check if the error message exists
   if (err.message) {
      message = err.message;
   }

   // Send the error response
   if (process.env.NODE_ENV === "production") {
      // If in production, only send the status code and message
      res.status(statusCode).json({ message });
   } else {
      // If in development, send the full error object
      res.status(statusCode).json({ error: err.red, message });
   }
};

export { errorHandler };

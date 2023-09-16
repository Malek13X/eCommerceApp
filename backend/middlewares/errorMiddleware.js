const errorHandler = (err, req, res, next) => {
   console.error(err.stack);

   let statusCode = 500;
   let message = "Internal Server Error";

   if (err.name === "ValidationError") {
      statusCode = 400;
      message = Object.values(err.errors).map((error) => error.message);
   }
   if (err.code === 11000) {
      statusCode = 400;
      message = "Duplicate field value entered";
   }

   if (err.name === "JsonWebTokenError") {
      statusCode = 401;
      message = "Not authorized, token failed";
   }

   if (err.name === "TokenExpiredError") {
      statusCode = 401;
      message = "Not authorized, token expired";
   }

   if (err.message === "Email already exists") {
      statusCode = 409;
      message = "Email already exist";
   }

   if (err.message === "Invalid email or password") {
      statusCode = 401;
      message = "Invalid email or password";
   }

   if (err.status === 429) {
      statusCode = 429;

      message = "Too many attempts. Please try again later.";
   }

   if (err.message === "All fields are required") {
      statusCode = 400;
      message = "All fields are required";
   }

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

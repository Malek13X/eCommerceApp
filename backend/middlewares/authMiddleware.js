import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import rateLimit from "express-rate-limit";

const protect = asyncHandler(async (req, res, next) => {
   let token;
   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
   ) {
      try {
         token = req.headers.authorization.split(" ")[1];

         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         req.user = await User.findById(decoded.id).select("-password");
         // check if the token has expired
         if (decoded.exp < Date.now() / 1000) {
            res.status(401);
            throw new Error("Token has expired");
         }

         next();
      } catch (error) {
         console.error(error);
         res.status(401);
         throw new Error("Not authorized, token failed");
      }
   }

   if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
   }
});
const admin = (req, res, next) => {
   let token;
   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
   ) {
      try {
         token = req.headers.authorization.split(" ")[1];

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const userId = decoded.userId;
         const userRole = decoded.userRole;

         if (userId && userRole === "admin") {
            next();
         } else {
            res.status(401);
            throw new Error("Not authorized as an admin");
         }
      } catch (error) {
         res.status(401).json({ error: "Invalid or expired token" });
      }
   } else {
      res.status(401).json({ error: "No token found" });
   }
};

// Rate limiting middleware, to prevent Brute-Force attacks
const authLimiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 5, // limit each IP to 5 requests per windowMs
   message: "Too many login attempts. Please try again later.",
});

export { protect, admin, authLimiter };

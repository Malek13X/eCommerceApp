import jwt from "jsonwebtoken";

const generateToken = (userId, userRole) => {
   const token = jwt.sign({ userId, userRole }, process.env.JWT_SECRET, {
      expiresIn: "30d",
   });
   return token;
};

export default generateToken;

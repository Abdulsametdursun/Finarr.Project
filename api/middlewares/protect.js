import error from "../utils/error.js";
import jwt from "jsonwebtoken";
// Check the validity of the JWT token sent via cookies/headers by the client, and if it is valid, save the user information into the req object; if it is invalid, send an error.

const protect = (req, res, next) => {
  // 1) get token from cookies/headers
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  // 2) Give error if token is invalid
  if (!token) return next(error(423, "Token could not be found"));

  // 3) Check if token is valid
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return next(error(423, "Invalid token or expired token"));

    // 4) If token is valid, get user data from JWT and save it into req object
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
  });

  // 5) Continue next step
  next();
};

export default protect;

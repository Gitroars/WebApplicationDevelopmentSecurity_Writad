import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

      req.user = User.findById(decoded.id);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token failed.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token.");
  }
});

const admin = (req, res, next) => {
  req.user = User.findById(decoded.id);
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin.");
  }
};

export { protectRoute, admin };

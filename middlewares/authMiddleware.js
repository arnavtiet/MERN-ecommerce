const JWT = require("jsonwebtoken");
const userModel = require("../models/user.js");

const { getSession } = require("../services/sessionService");

//Auth middleWare
const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ success: false, message: "Authorization header missing" });
    }

    // Try to get session first
    const session = await getSession(authHeader);
    if (session && session.user) {
      req.user = session.user;
      return next();
    }

    // Fallback to JWT
    const decode = JWT.verify(
      authHeader,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ success: false, message: "Authorization failed" });
  }
};

//Admin check

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    if (!user || user.role !== 1) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorised Access" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Authorization failed" });
  }
};

module.exports = { requireSignIn, isAdmin };

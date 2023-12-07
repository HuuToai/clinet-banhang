// sessionMiddleware.js
const session = require("express-session");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");

const sessionmiddleware = session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
});

module.exports = sessionmiddleware;

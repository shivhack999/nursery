// config/expressConfig.js
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

module.exports = function configureExpress(app) {
  // CORS setup
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  
  // Body parsing
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Cookies
  app.use(cookieParser());

  // Static files
  app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

  // View engine
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../../views"));

  // Logger
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
};

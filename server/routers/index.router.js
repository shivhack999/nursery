const express = require("express");

const router = express.Router();

const auth = require("./auth.router.js");
const frontend = require("./frontend.router.js");
router.use("/auth", auth);
router.use("/frontend", frontend);

module.exports = router;
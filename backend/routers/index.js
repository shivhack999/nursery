const express = require("express");

const router = express.Router();

const loginRouter = require("./auth.router.js");

router.use("/auth", loginRouter);

module.exports = router;
require("dotenv").config();
require('./config/db/mysql.db');
const express = require("express");
const configureExpress = require("./config/expressConfig");
const indexRouter = require('./routers/index.router');
const path = require("path");

const app = express();
configureExpress(app);
const PORT = process.env.PORT || 5000;


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use('/api', indexRouter);
// Cookie test route
app.get("/set-cookie", (req, res) => {
  res.cookie("sessionId", "abc123", {
    domain: process.env.IP_ADDRESS,
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });
  res.send("Cookie has been set");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

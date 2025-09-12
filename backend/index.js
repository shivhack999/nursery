require("dotenv").config();
const express = require("express");
const configureExpress = require("./expressConfig");
// require("./db");
const app = express();

configureExpress(app);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT : ${PORT}`);
});

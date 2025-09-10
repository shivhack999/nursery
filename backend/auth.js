require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const db = require("./db");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// In-memory token store (can replace with DB if needed)
let resetTokens = {};

// ===================== LOGIN =====================
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM admin_users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error ❌" });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials ❌" });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials ❌" });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, message: "Login successful ✅", token });
  });
});

// ===================== VERIFY TOKEN =====================
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token expired or invalid" });
    req.user = decoded;
    next();
  });
}

// ===================== FORGOT PASSWORD =====================
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM admin_users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error ❌" });
    if (results.length === 0) return res.status(400).json({ message: "Invalid email ❌" });

    const user = results[0];
    const token = Math.random().toString(36).substring(2, 15);
    resetTokens[token] = user.email;

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Send mail using the admin credentials stored in DB
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,         // DB email
        pass: process.env.MAIL_PASS,    // DB email password field
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Admin Password Reset",
      html: `<p>Click to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to send email ❌" });
      }
      res.json({ success: true, message: "Reset link sent ✅" });
    });
  });
});

// ===================== RESET PASSWORD =====================
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const email = resetTokens[token];
  if (!email) return res.status(400).json({ message: "Invalid or expired token ❌" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  db.query("UPDATE admin_users SET password = ? WHERE email = ?", [hashedPassword, email], (err) => {
    if (err) return res.status(500).json({ message: "DB update error ❌" });

    delete resetTokens[token];
    res.json({ success: true, message: "Password updated ✅" });
  });
});

module.exports = { router, verifyToken };

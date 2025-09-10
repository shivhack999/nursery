const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("./db");

const { router: loginrouter } = require("./auth");
const routerIndex = require("./routers/index.js");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// MySQL connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST || localhost,// replace with your MySQL host
//   user: process.env.DB_USER,       // replace with your MySQL username
//   password: process.env.DB_PASSWORD,       // replace with your MySQL password
//   database: process.env.DB_NAME
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("✅ Connected to MySQL");
// });

// Route for login

app.use('/',loginrouter);
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   const query = "SELECT * FROM admin_users WHERE email = ? AND password = ?";
//   db.query(query, [email, password], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Server error" });
//     }

//     if (result.length > 0) {
//       res.json({ success: true, message: "Login successful ✅" });
//     } else {
//       res.status(401).json({ success: false, message: "Invalid credentials ❌" });
//     }
//   });
// });
// Get Hero Content
app.get("/hero", (req, res) => {
  const query = "SELECT hero_title, hero_subtitle FROM site_content WHERE id = 1";
  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: "DB fetch error" });
    res.json(result[0]);
  });
});

// Update Hero Content
app.post("/update-hero", (req, res) => {
  const { heroTitle, heroSubtitle } = req.body;
  const query = "UPDATE site_content SET hero_title = ?, hero_subtitle = ? WHERE id = 1";
  db.query(query, [heroTitle, heroSubtitle], (err) => {
    if (err) return res.status(500).json({ message: "DB update error" });
    res.json({ success: true, message: "Hero section updated!" });
  });
});

// Storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// 📌 Upload multiple photos
app.post("/add-showcase", upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const files = req.files.map((file) => [file.filename]); // array of [filename]

  const query = "INSERT INTO showcase_images (filename) VALUES ?";
  db.query(query, [files], (err) => {
    if (err) return res.status(500).json({ message: "DB insert error" });
    res.json({ success: true, message: "Images uploaded!", files });
  });
});

// 📌 Get all photos
app.get("/showcase", (req, res) => {
  const query = "SELECT * FROM showcase_images";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "DB fetch error" });
    res.json(results);
  });
});

// 📌 Delete photo
app.delete("/delete-showcase/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT filename FROM showcase_images WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err || results.length === 0)
      return res.status(404).json({ message: "Not found" });

    const filename = results[0].filename;
    fs.unlinkSync(`uploads/${filename}`); // delete file from system

    db.query("DELETE FROM showcase_images WHERE id = ?", [id], (err2) => {
      if (err2) return res.status(500).json({ message: "DB delete error" });
      res.json({ success: true, message: "Image deleted!" });
    });
  });
});


// 📌 Get all services
app.get("/services", (req, res) => {
  const query = "SELECT * FROM services";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "DB fetch error" });

    const services = results.map((s) => {
      let featuresArray = [];

      // Make sure features is not empty or null
      if (s.features) {
        try {
          // If already a string like '["wwwww","wwww"]', parse it
          featuresArray = typeof s.features === "string" ? JSON.parse(s.features) : s.features;
        } catch (err) {
          console.warn(`Failed parsing features for service id ${s.id}`, err);
          featuresArray = [];
        }
      }

      return { ...s, features: featuresArray };
    });

    res.json(services);
  });
});

// 📌 Add new service
app.post("/services", (req, res) => {
  const { title, description, icon, features } = req.body;

  // Ensure features is a JSON array
  const featuresArray = Array.isArray(features) ? features : features.split(",").map(f => f.trim());

  const query = "INSERT INTO services (title, description, icon, features) VALUES (?, ?, ?, ?)";
  db.query(query, [title, description, icon, JSON.stringify(featuresArray)], (err) => {
    if (err) return res.status(500).json({ message: "DB insert error" });
    res.json({ success: true, message: "Service added!" });
  });
});

// 📌 Update service
app.put("/services/:id", (req, res) => {
  const { title, description, icon, features } = req.body;
  const { id } = req.params;

  const query =
    "UPDATE services SET title = ?, description = ?, icon = ?, features = ? WHERE id = ?";
  db.query(
    query,
    [title, description, icon, JSON.stringify(features), id],
    (err) => {
      if (err) return res.status(500).json({ message: "DB update error" });
      res.json({ success: true, message: "Service updated!" });
    }
  );
});

// 📌 Delete service
app.delete("/services/:id", (req, res) => {
  db.query("DELETE FROM services WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "DB delete error" });
    res.json({ success: true, message: "Service deleted!" });
  });
});

// Get all pavilions
app.get("/pavilions", (req, res) => {
  const query = "SELECT * FROM pavilions";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "DB fetch error" });
    res.json(results);
  });
});

// Add pavilion (with image upload)
const pavilionUpload = multer({ storage });
app.post("/pavilions", pavilionUpload.single("image"), (req, res) => {
  const { state, description } = req.body;
  const image = req.file ? req.file.filename : null;

  const query = "INSERT INTO pavilions (state, description, image) VALUES (?, ?, ?)";
  db.query(query, [state, description, image], (err) => {
    if (err) return res.status(500).json({ message: "DB insert error" });
    res.json({ success: true, message: "Pavilion added!" });
  });
});

// Delete pavilion
app.delete("/pavilions/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT image FROM pavilions WHERE id = ?", [id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ message: "Not found" });

    if (results[0].image) fs.unlinkSync(`uploads/${results[0].image}`);

    db.query("DELETE FROM pavilions WHERE id = ?", [id], (err2) => {
      if (err2) return res.status(500).json({ message: "DB delete error" });
      res.json({ success: true, message: "Pavilion deleted!" });
    });
  });
});

app.use('/api',routerIndex);



// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

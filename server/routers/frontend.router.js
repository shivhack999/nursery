const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
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

const {
    hero,
    updateHero,
    addShowcase,
    showcase,
    deleteShowcaseById,
    services,
    addServices,
    updateServiceById,
    deleteServiceById,
    getPavilions,
    addPavilion,
    updatePavilionById,
    deletePavilionById    
} = require('../controllers/frontend/index');

router.get("/hero", hero);
router.post("/update-hero", updateHero);
router.post("/add-showcase", upload.array("images", 10), addShowcase);
router.get("/showcase", showcase);
router.delete("/delete-showcase/:id", deleteShowcaseById);
router.get("/services", services);
router.post("/services", addServices);
router.put("/services/:id", updateServiceById);
router.delete("/services/:id", deleteServiceById);
router.get("/pavilions", getPavilions);
router.post("/pavilions", upload.single("image"), addPavilion);
router.put("/pavilions/:id", updatePavilionById);
router.delete("/pavilions/:id", deletePavilionById);

module.exports = router;
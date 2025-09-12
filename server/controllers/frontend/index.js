const db = require('../../config/db/mysql.db');
const hero = (req, res) => {
    try {
        const query = "SELECT hero_title, hero_subtitle FROM site_content WHERE id = 1";
        db.query(query, (err, result) => {
            if (err) return res.status(500).json({ message: "DB fetch error" });
            res.json(result[0]);
        });
    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: "Internal Server error" 
        });
    }
}
const updateHero = (req, res) => {
    try {
        const { heroTitle, heroSubtitle } = req.body;
        const query = "UPDATE site_content SET hero_title = ?, hero_subtitle = ? WHERE id = 1";
        db.query(query, [heroTitle, heroSubtitle], (err) => {
            if (err) return res.status(500).json({ message: "DB update error" });
            res.json({ success: true, message: "Hero section updated!" });
        });
    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: "Internal Server error" 
        });
    }
}
const addShowcase = (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const files = req.files.map((file) => [file.filename]); // array of [filename]

        const query = "INSERT INTO showcase_images (filename) VALUES ?";
        db.query(query, [files], (err) => {
            if (err) return res.status(500).json({ message: "DB insert error" });
            res.json({ success: true, message: "Images uploaded!", files });
        });
    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: "Internal Server error" 
        });
    }
}
const showcase= (req, res) => {
    try {
        const query = "SELECT * FROM showcase_images";
        db.query(query, (err, results) => {
            if (err) return res.status(500).json({ message: "DB fetch error" });
            res.json(results);
        });
    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: "Internal Server error" 
        });
    }
}

const deleteShowcaseById = (req, res) => {
    try {
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
    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: "Internal Server error" 
        });
    }
}
const services = (req, res) => {
    try {
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
    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: "Internal Server error" 
        });
    }
}
const addServices = (req, res) => {
    try {
        const { title, description, icon, features } = req.body;

        // Ensure features is a JSON array
        const featuresArray = Array.isArray(features) ? features : features.split(",").map(f => f.trim());

        const query = "INSERT INTO services (title, description, icon, features) VALUES (?, ?, ?, ?)";
        db.query(query, [title, description, icon, JSON.stringify(featuresArray)], (err) => {
            if (err) return res.status(500).json({ message: "DB insert error" });
            res.json({ success: true, message: "Service added!" });
        });
    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: "Internal Server error" 
        });
    }
}
const updateServiceById = (req, res) => {
    try {
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
    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: "Internal Server error" 
        });
    }
}

const deleteServiceById = (req, res) => {
    try {
        db.query("DELETE FROM services WHERE id = ?", [req.params.id], (err) => {
            if (err) return res.status(500).json({ message: "DB delete error" });
            res.json({ success: true, message: "Service deleted!" });
        });
    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: "Internal Server error" 
        });
    }
}

const getPavilions = (req, res) => {
    try {
        const query = "SELECT * FROM pavilions";
        db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: "DB fetch error" });
        res.json(results);
        });
    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: "Internal Server error" 
        });
    }
}

const addPavilion = (req, res) => {
    try {
        const { state, description } = req.body;
        const image = req.file ? req.file.filename : null;

        const query = "INSERT INTO pavilions (state, description, image) VALUES (?, ?, ?)";
        db.query(query, [state, description, image], (err) => {
            if (err) return res.status(500).json({ message: "DB insert error" });
            res.json({ success: true, message: "Pavilion added!" });
        });
    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: "Internal Server error" 
        });
    }
}

const updatePavilionById = (req, res) => {
    try {
        const id = req.params.id;
        db.query("SELECT image FROM pavilions WHERE id = ?", [id], (err, results) => {
            if (err || results.length === 0) return res.status(404).json({ message: "Not found" });

            if (results[0].image) fs.unlinkSync(`uploads/${results[0].image}`);

            db.query("DELETE FROM pavilions WHERE id = ?", [id], (err2) => {
            if (err2) return res.status(500).json({ message: "DB delete error" });
            res.json({ success: true, message: "Pavilion deleted!" });
            });
        });
    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: "Internal Server error" 
        });
    }
}

const deletePavilionById = (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: "Internal Server error" 
        });
    }
}
module.exports= {
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
}
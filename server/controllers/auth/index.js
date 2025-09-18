const login = async (req, res) => {
    try{
        const { email, password } = req?.body || {};
          if(!email || !password){
            return res.status(400).json({ 
              success: false, 
              message: "Email and password are required." 
            });
          }
          if (email !== ADMIN_EMAIL) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
          }
        
          const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
          if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
          }

    }
    catch(error){
        console.log("loginError", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

module.exports = { 
    login 
};
const login = async (req, res) => {
    try{
        const { email, password } = req?.body;
          if(email  === undefined || password === undefined || !email || !password){
            return res.status(400).json({ 
              success: false, 
              message: "Email and password are required ❌" 
            });
          }
          // ab yaha se tum database me check kare email exist karta hai ya nahi
          // agr karta hai to uska password leke aao
          // fir bcrypt se compare karo
          // fir match karo password ko
          // agr password match ho jata hai to token generate karo
          // fir token ko response me bhej do
          // agr email exist nahi karta hai ya password match nahi hota to error bhej do
          // ye sab tum database se karoge
          // yaha pe me sirf ek example de raha hu ki tum kya kar sakte ho
          //okay, samajh gya me
          

          if (email !== ADMIN_EMAIL) {
            return res.status(401).json({ success: false, message: "Invalid credentials ❌" });
          }
        
          const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
          if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials ❌" });
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

module.exports = { login };
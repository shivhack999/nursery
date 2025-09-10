const jwt = require('jsonwebtoken');

function authe(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:'unauthorized user'
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user= decoded;
        return next();
    }
    catch(err){
        return res.status(401).json({
            message: 'Invalid token'
        });
    }

}

module.exports = authe;
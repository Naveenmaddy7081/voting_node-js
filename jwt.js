const jwt = require('jsonwebtoken');

const jwtAuthMiddleware =(req, res, next)=>{

    //first check rqst hdr hs authri or not
    const authorization =req.headers.authorization
    if(!authorization) return res.status(401).json({error: 'invalid authrization'});

    //extract the jwt token frm the req hedr
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthrized'});

    try{
        //verify the jwt
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // auth user info the req
        req.user =decoded
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({error: 'invalid token'});
    }
}

// func to genret jwt token
const generatToken =(userData) =>{
    // grnt  a new jwt token user data
    return jwt.sign(userData, process.env.JWT_SECRET,{expiresIn: 30000});
}

module.exports= {jwtAuthMiddleware, generatToken};
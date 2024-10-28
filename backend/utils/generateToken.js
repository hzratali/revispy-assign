const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateToken = (user)=>{
    return jwt.sign({ email:user.email, id: user._id,name:user.name }, process.env.JWT_KEY, { expiresIn: "1d" });
}


module.exports.generateToken = generateToken;
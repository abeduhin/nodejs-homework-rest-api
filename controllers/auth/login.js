const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {User} = require("../../models/users")

const {RequestError} = require("../../helpers");

const {SECRET_KEY} = process.env;

const login = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw RequestError(401, "Email or password wrong")
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw RequestError(401, "Email or password wrong")
    }
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"});
    await User.findByIdAndUpdate(user._id, { token })
    
    const subscription = user.subscription;
    res.status(200).json({
        token,
        email,
        subscription,

    })
}

module.exports = login;



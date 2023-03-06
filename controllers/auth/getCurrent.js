
const { User } = require("../../models/users")
const {RequestError} = require("../../helpers");

const getCurrent = async (req, res) => {
    const {email, subscription } = req.body;    
    const user = await User.findOne({email});
    if(!user) {
        throw RequestError(401, "Not authorized")
    }    
    
    res.status(200).json({
        subscription,
        email,
    })
}

module.exports = getCurrent;



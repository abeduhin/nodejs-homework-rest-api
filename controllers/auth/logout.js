const { User } = require("../../models/users")
const {RequestError} = require("../../helpers");

const logout = async (req, res) => {
    const { _id } = req.user;    
    const user = await User.findByIdAndUpdate(_id, { token: "" });
    if(!user) {
        throw RequestError(401, "Not authorized")
    }
    res.status(204).json({
        message: "No content"
    })
}

module.exports = logout;
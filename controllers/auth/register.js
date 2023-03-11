const bcrypts = require("bcryptjs")
const gravatar = require("gravatar")

const { User } = require("../../models/users")

const { RequestError } = require("../../helpers")

const register = async(req, res)=> {
    const { email,subscription, password } = req.body;
    const user = await User.findOne({email});
    if(user){
        throw RequestError(409, "Email in use")
    }
    const hashPassword = await bcrypts.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const result = await User.create({ email, subscription, password: hashPassword, avatarURL});
    res.status(201).json({        
    email: result.email,
    subscription: result.subscription,  
    })
}

module.exports = register;

// Робимо перевірку email користувача, якщо такий є то викадає помилку 409, якщо ні, то створюємого нового юзера с таким email


const bcrypts = require("bcryptjs");
const gravatar = require("gravatar");
const {nanoid} = require("nanoid");

const { User } = require("../../models/users");
const {BASE_URL} = process.env;

const { RequestError, sendEmail } = require("../../helpers");

const register = async(req, res)=> {
    const { email,subscription, password } = req.body;
    const user = await User.findOne({email});
    if(user){
        throw RequestError(409, "Email in use")
    }
    const hashPassword = await bcrypts.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const result = await User.create({ email, subscription, password: hashPassword, avatarURL, verificationToken });

    // створюємо юзера з полем verificationToken (беремо його з nanoid)

    const mail = {
        to: email,
        subject: "Confirmation of registration",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to confirm registration</a>`
    }

    // створюємо форму запиту email

    await sendEmail(mail);
    
    res.status(201).json({        
    email: result.email,
    subscription: result.subscription,  
    })
}

module.exports = register;

// Робимо перевірку email користувача, якщо такий є то викадає помилку 409, якщо ні, то створюємого нового юзера с таким email


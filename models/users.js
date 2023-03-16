const {Schema, model} = require("mongoose")
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers")

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
// Регулярний вираз email

const allowedSubcriptions = ["starter", "pro", "business"]

const userSchema = new Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    match: emailRegexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: allowedSubcriptions,
    default: "starter",
  },
  avatarURL: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  }
  
}, { versionKey: false })

userSchema.post("save", handleSaveErrors)

const authSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
      
})


const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid (...allowedSubcriptions).required()
})

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const verifyEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})

const schemas = {
    authSchema,
    subscriptionSchema,
    registerSchema,
    loginSchema,
    verifyEmailSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};


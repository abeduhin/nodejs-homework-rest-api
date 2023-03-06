const jwt = require("jsonwebtoken");

const {RequestError} = require("../helpers");

const {User} = require("../models/users")

const {SECRET_KEY} = process.env;

const authenticate = async(req, res, next) => {
    try {
        const {authorization} = req.headers;
        const [bearer, token] = authorization.split(" ");
        if(bearer !== "Bearer") {
            throw RequestError(401, "Not authorized")
        }
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token || user.token !== token) {
            throw RequestError(401, "Not authorized")
        }
        req.user = user;
        next();
    } catch (error) {
        if(!error.status) {
            error.status = 401;
            error.message = "Not authorized";
        }
        next(error)
    }
}

module.exports = authenticate;

// const passport = require('passport')
// const passportJWT = require('passport-jwt')
// const {User} = require("../models/user")
// require('dotenv').config()
// const {SECRET_KEY} = process.env;

// const ExtractJWT = passportJWT.ExtractJwt
// const Strategy = passportJWT.Strategy
// const params = {
// 	secretOrKey: SECRET_KEY,
// 	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
// }

// // JWT Strategy
// passport.use(
// 	new Strategy(params, function (payload, done) {
// 		User.find({ _id: payload.id })
// 			.then(([user]) => {
// 				if (!user) {
// 					return done(new Error('User not found'))
// 				}
// 				return done(null, user)
// 			})
// 			.catch(err => done(err))
// 	})
// )

// const authenticate = (req, res, next) => {
// 	passport.authenticate('jwt', { session: false }, (err, user) => {
// 		if (!user || err) {
// 			return res.status(401).json({
// 				status: 'error',
// 				code: 401,
// 				message: 'Unauthorized',
// 				data: 'Unauthorized',
// 			})
// 		}
// 		req.user = user
// 		next()
// 	})(req, res, next)
// }

// module.exports = { authenticate }
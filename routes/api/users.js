const express = require("express");

const {authenticate, validateBody} = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/users");

const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post("/register", validateBody(schemas.authSchema), ctrlWrapper(ctrl.register))
// signup

router.post("/login", validateBody(schemas.authSchema), ctrlWrapper(ctrl.login))
// signin

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout))

router.patch('/:id/subscription', authenticate, validateBody(schemas.subscriptionSchema), ctrlWrapper(ctrl.subscription))

module.exports = router;
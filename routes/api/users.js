const express = require("express");

const {authenticate, validateBody, upload} = require("../../middlewares");

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

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail))

router.post("/verify", validateBody(schemas.verifyEmailSchema), ctrlWrapper(ctrl.resendEmail))

router.patch('/:id/subscription', authenticate, validateBody(schemas.subscriptionSchema), ctrlWrapper(ctrl.subscription))

router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))
// upload.single - коли передаємо 1 зображення (файл).

// router.patch("/avatars", authenticate, upload.fields({name: "avatar", maxCount; 1}, {name: "subavatar", maxCount; 2}), ctrlWrapper(ctrl.updateAvatar))
// upload.fields - коли передаємо 2 зображення (файла).

// router.patch("/avatars", authenticate, upload.array("avatar", 8), ctrlWrapper(ctrl.updateAvatar))
// upload.array - коли передаємо багато зображень (файлів).

module.exports = router;

const express = require("express");

const ctrl = require('../../controllers/contacts')

const {authenticate, validateBody} = require("../../middlewares");

const {schemas} = require("../../models/contacts")

const {ctrlWrapper} = require("../../helpers")

const router = express.Router()

router.get("/", authenticate,ctrlWrapper(ctrl.getAll))

router.get("/:contactId", authenticate, ctrlWrapper(ctrl.getById))


router.post("/", authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact))


router.put("/:contactId", authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateContact))


router.patch("/:contactId/favorite", authenticate, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.setFavorite))

router.delete("/:contactId", authenticate, ctrlWrapper(ctrl.removeContact))

module.exports = router;
// Описувємо форми HTTP запитів
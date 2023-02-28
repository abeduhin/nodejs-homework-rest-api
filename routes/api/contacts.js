
const express = require("express");

const ctrl = require('../../controllers/contacts')

const {validateBody} = require("../../middlewares");

const {schemas} = require("../../models/contacts")

const {ctrlWrapper} = require("../../helpers")

const router = express.Router()

router.get("/", ctrlWrapper(ctrl.getAll))

router.get("/:contactId", ctrlWrapper(ctrl.getById))

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact))

router.put("/:contactId", validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateContact))

router.patch("/:contactId/favorite", validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.setFavorite))

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact))

module.exports = router;
// Описуємо форми HTTP запитів
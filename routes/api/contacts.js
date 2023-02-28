
const express = require("express");

const ctrl = require('../../controllers/contacts')

const {validateBody} = require("../../middlewares");

const {schemas} = require("../../models/contacts")

const {ctrlWrapper} = require("../../helpers")

const router = express.Router()

router.get("/", ctrlWrapper(ctrl.getAll))


const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts')
const { contactValidator } = require('./../../utils/validators/validator')

// Імпортуємо необхідні змінні



// Підключаємо роутер

router.get('/', async (_req, res, _next) => {
  const contacts = await listContacts()
	res.status(200).json(contacts)  
})
// Прописуємо шлях роутеру при get запиті на список контактів та статус успішного віконання

router.get('/:contactId', async (req, res, _next) => {
  const { contactId } = req.params
	const contact = await getContactById(contactId)
	if (contact) {
		res.status(200).json(contact)
	} else {
		res.status(404).json({ message: 'Not found' })
	}
})

// Прописуємо шлях роутеру при get запиті на пошук по id та статус успішного віконання та статус помилки

router.post('/', async (req, res, _next) => {
  const { error } = contactValidator(req.body)
	if (error) return res.status(400).json({ message: error.details[0].message })
	const contact = await addContact(req.body)
	if (contact) {
		res.status(200).json(contact)
	} else {
		res.status(400).json({ message: 'missing required name field' })
	}
})

// Прописуємо шлях роутеру при post запиті на додавання нового елементу та статус успішного віконання та статус помилки,також переверіяємо валідність внесених даних.

router.delete('/:contactId', async (req, res, _next) => {
  const { contactId } = req.params
	const contact = await removeContact(contactId)
	if (contact) {
		res.status(200).json({ message: 'contact deleted' })
	} else {
		res.status(404).json({ message: 'Not found' })
	}
})

// Прописуємо шлях роутеру при delete запиті на видалення елементу та статус успішного віконання та статус помилки.
router.put('/:contactId', async (req, res, _next) => {
  const { error } = contactValidator(req.body)
	if (error) return res.status(400).json({ message: error.details[0].message })
	const { name, email, phone } = req.body
	const { contactId } = req.params
	if (!name && !email && !phone) {
		res.status(400).json({ message: 'missing fields' })
	}
	const contact = await updateContact(contactId, req.body)
	if (contact) {
		res.status(200).json(contact)
	} else {
		res.status(404).json({ message: 'Not found' })
	}
})
// Прописуємо шлях роутеру при  put запиті на змінення елементу. прописуємо умову. щоб усі поля були зповнені та статус успішного віконання та статус помилки.master

router.get("/:contactId", ctrlWrapper(ctrl.getById))

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact))

router.put("/:contactId", validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateContact))

router.patch("/:contactId/favorite", validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.setFavorite))

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact))

module.exports = router;
// Описувємо форми HTTP запитів
const fs = require('fs/promises')
const { nanoid } = require('nanoid')
const path = require('path')
require('colors')

// Імпортуємо необхідні дані

const contactsPath = path.join(__dirname, 'contacts.json')
// Прописуємо шлях до нашої БД

const listContacts = async () => {
  try {
		const contacts = await fs.readFile(contactsPath, { encoding: 'utf-8' })
		return JSON.parse(contacts)
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}
// Зчитуємо нашу БД контактів та парсимо в JSON

const getContactById = async (contactId) => {
  try {
		const contacts = await listContacts()
		return contacts.filter(({ id }) => id === contactId)
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}
// Робимо пошук контактів по id

const removeContact = async (contactId) => {
  try {
		const contacts = await listContacts()
		const contactToRemove = contacts.find(({ id }) => id === contactId)
		if (!contactToRemove) {
			return null
		}
		const newContacts = contacts.filter(({ id }) => id !== contactId)
		await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), { encoding: 'utf-8' })

		return newContacts
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}
// Робимо видалення контакту. Спочатку знаходимо його через id (метод find) якщо нема виводимо null потім перезаписуємо (writeFile) новий екземпляр БД без цього елемента.

const addContact = async (body) => {
  try {
		const { name, email, phone } = body
		if (!name || !email || !phone) {
			return null
		}
		const contacts = await listContacts()
		const newContact = {
			id: nanoid(),
			name,
			email,
			phone,
		}
		const updatedContacts = [newContact, ...contacts]
		await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), { encoding: 'utf-8' })
		return newContact
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}
// Добавлення контакту. Прописуємо необхідні параметри (декструктруємо тіло запиту body). Якщо якогось параметру нема - не виводимо.Прописуємо параметри для нового контакту.Добавляємо його до нашої БД.Зчитуємо новий об'єкт та парсимо його JSON


const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
	const contactToUpdate = contacts.find(contact => contact.id === contactId)

	if (!contactToUpdate) {
		return null
	}
	const otherContacts = contacts.filter(contact => contact.id !== contactId)

	const updatedContact = {
		...contactToUpdate,
		...body,
	}

	const contactsToSave = [...otherContacts, updatedContact]
	await fs.writeFile(contactsPath, JSON.stringify(contactsToSave, null, 2), { encoding: 'utf-8' })
	return updatedContact
}

// Оновлюємо та збнрігаємо контакти

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
// експортуємо змінні де listContacts - список контактів. getContactById - пошук контакту по id. removeContact - видалення контакту, addContact - додавання контакту, updateContact - оновлення контакту.

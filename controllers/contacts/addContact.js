const {Contact} = require("../../models/contacts")

const addContact = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result)
}

module.exports = addContact;
// Прописуємо логіку запиту на додавання контакту
// Метод mongoose - create - добавляє документ в колекцію.
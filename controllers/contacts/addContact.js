const {Contact} = require("../../models/contacts")

const addContact = async(req, res)=> {
    const result = await Contact.create(req.body);
    res.status(201).json(result)
}

module.exports = addContact;
// Прописуємо логіку запиту на додавання контакту
// Метод mongoose - create - добавляє документ в колекцію.
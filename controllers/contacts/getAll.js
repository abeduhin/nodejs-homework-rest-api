const {Contact} = require("../../models/contacts")

const getAll = async(req, res)=> {
    const result = await Contact.find();
    res.json(result)
}

module.exports = getAll;
// Прописуємо логіку запиту на усі контакти
// Метод mongoose - find - знаходить всі документи в колекції заданого фільтра.
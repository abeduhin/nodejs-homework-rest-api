const {Contact} = require("../../models/contacts")

const {RequestError} = require("../../helpers")

const updateContact = async(req, res)=> {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.status(201).json(result)
}

module.exports = updateContact;

// Прописуємо логіку запиту на оновлення контакту 
// Метод mongoose - findByIdAndUpdate - встановлює операцію пошуку , що збігається із запитом id.
// Повертає за замовчуванням не оновлений об'єкт із колекції, тому в аргуменах треба вказувати {new: true} щоб повертав оновлений об'єкт
const {Contact} = require("../../models/contacts")

const {RequestError} = require("../../helpers")

const removeContact = async(req, res)=> {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.json({
        message: "Delete success"
    })
}

module.exports = removeContact;
// Прописуємо логіку запиту на видалення контакту по id
// Метод mongoose - findByIdAndRemove - видаляє об'єкт з колекції, що збігається із запитом id.

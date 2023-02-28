const {Contact} = require("../../models/contacts")

const {RequestError} = require("../../helpers")

const getById = async(req, res)=> {
    const {contactId} = req.params;
    // const result = await Contact.findOne({_id: id})
    const result = await Contact.findById(contactId)
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.json(result)
}

module.exports = getById;

// Прописуємо логіку запиту на пошук контакту по id
// Метод mongoose - findById - знаходить всі документи в колекції по заданому id .
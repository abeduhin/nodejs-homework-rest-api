const {Contact} = require("../../models/contacts")

const {RequestError} = require("../../helpers")

const setFavorite = async(req, res)=> {
    const { contactId } = req.params;
    const favorite = req.body;
    if (!favorite && favorite !== false) {
			res.status(400).json({ message: 'missing field favorite' })
		}
    const updateStatusContact = await Contact.findByIdAndUpdate(contactId, favorite, {new: true});
    if(updateStatusContact){
        res.status(200).json(updateStatusContact)
    }
    throw RequestError(404, "Not found")
}

module.exports = setFavorite;
// Прописуємо логіку запиту контактів по полю favorite
// Метод mongoose - findByIdAndUpdate - встановлює операцію пошуку , що збігається із запитом id.
// Повертає за замовчуванням не оновлений об'єкт із колекції, тому в аргуменах треба вказувати {new: true} щоб повертав оновлений об'єкт
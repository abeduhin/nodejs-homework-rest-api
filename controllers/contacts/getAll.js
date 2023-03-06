const { Contact } = require("../../models/contacts")


// eslint-disable-next-line no-unused-vars
// const paginate = require("mongoose-paginate")

const getAll = async (req, res) => {
    const {_id: owner } = req.user;
    const result = await Contact.find({ owner })
    .populate("owner", "subscription email");
    res.json(result)
}



// const getAll = async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;
//     const options = {
//         page,
//         limit,
//         sort: {name: 1},
//     };

//     const results = await Contact.paginate({}, options);
//     res.json(results)
//  }
// // Описуємо блок пагінації

// const getAll = async (req, res) => { 
//     const favorite = req.query.favorite;
//     const filter = {};
//     if (favorite !== undefined) {
//         filter.favorite = favorite;
//     };

//     const contacts = await Contact.find(filter);
//     res.json(contacts);
// }
// // Описуємо фільтрацію контактів по по полю favorite.



module.exports = getAll;
// Прописуємо логіку запиту на усі контакти
// Метод mongoose - find - знаходить всі документи в колекції заданого фільтра.
// Через поле в моделі owner робимо так, щоб користувач бачив тільки свій контакт, через св-во populate можемо витягати необхідні дані name email.
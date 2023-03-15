const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
// З'єднуємо наш додаток з поштовим сервером SENDGRID

const sendEmail = async(data) => {
    const mail = {...data, from: "abeduhin17@gmail.com"};
    await sgMail.send(mail);
    return true;
}
// data для запиту описуємо в контролері resendEmail
// асінхрона функція(відправляє повідомлення) повертає true - будуть зміни в базі.

module.exports = sendEmail;
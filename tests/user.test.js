/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const supertest = require("supertest");
const mongoose = require("mongoose");
require('dotenv').config();
const app = require("../app");
const {User} = require("../models/users");
const { request } = require("../app");

const { DB_HOST, PORT = 3000 } = process.env;

describe("tests for login/register controllers", () => {
   let server;
   // eslint-disable-next-line no-return-assign
   beforeAll(() => server = app.listen(PORT));
   console.log('Виконати на початку тестів');
   afterAll(() => server.close());
   console.log('Виконати після тестів');

   beforeEach((done) => {
      mongoose.connect(DB_HOST).then(() => done)
      console.log('Виконати на початку кожного тесту');
   })
   afterEach((done) => {
      mongoose.connection.db.dropCollection(() => {
         mongoose.connection.close(() => done())
         console.log('Виконати наприкінці кожного тесту');
      })
   })
   test("test login route", async () => {
      const newUser = {
         email: "myhailo@gmail.com",
         password: "123456"
      };
   
      const user = await User.create(newUser);

      const loginUser = {
         email: "olga@gmail.com",
         password: "123456"
      };

      const response = await request(app).post("/api/users/login").send(loginUser);
      expect(response.statusCode).toBe(200);
      const { body } = response;
      expect(body.token).toByTruthy();
      const { token } = await User.findById(user._id);
      expect(body.token).toBe(token);
   })
})

// describe - набір тестів
// test (або it) - тестовий випадок
// beforeAll - підготовка перед тестуванням
// beforeEach - підготовка для кожного набору чи тестового випадку
// afterAll - завершальні дії після тестування
// afterEach - завершальні дії для кожного набору чи випадку
// not — інвертує наступне порівняння в ланцюжку.
// expect(func(arg)).toBe(value) — перевірка на строгу рівність отриманого значення value
// expect(func(arg)).toEqual(value) — глибоке порівняння якщо повертаються значення об'єкт
// expect(func(arg)).toBeTruthy() — перевіряє значення на те, що чи можна значення, що повертається вважати істинним
// expect(func(arg)).toBeNull() — перевіряє значення на рівність null.
// expect(func(arg)).toBeUndefined() — перевіряє значення на undefined
// expect(func(arg)).toBeDefined() — перевіряє, що функція повертає щось


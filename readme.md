##  HW04-auth

Для виконання домашньої роботи №4 створюємо гілку hw04-auth з гілки master.

### Порядок виконання
1. Встановлюємо додатково пакети: bcryptjs, jsonwebtoken, mongoose-paginate, mongoose-paginate-v2, passport, passport-jwt. 
2. Доповнюємо файли .env.example та .gitignore (SECRET_KEY).
3. Створюємо нову колекцію users на MongoDB Compass.
4. Архитектура додатку.
 + Створюємо наступні папки:
      - models - типові шаблони інтерфейса (users);
      - middelwares - (корисна допомога) - валідація (загальний імпорт через файл index) (authenticate), для приватних(аутенфікованих) роутів. Створюємо через jsonwebtoken та через passport-jwt(passport).
      - controllers - логика для усіх типів запросів (загальний імпорт через файл index) (директорія auth).
  + Експортуємо дані в файл routes/api/users - де описуємо форму та шлях усіх типів HTTP-запиту (users).
      - POST/api/users/register - регістрація юзера (email, password - хеширований) (змінна register);
      - POST/api/users/login - авторизація юзера (створення хешированого JWT-токена) (змінна login);
      - GET/api/users/logout - вихід із систеими (обнулення токена)(змінна logout);
      - GET/api/users/curent - поточний юзер (дані через токен) (змінна getCurrent);
  + Додатково робимо пагінацію колекції contacts (controllers - getAll, де вказуємо порядок сторінок на ліміт даних на 1 сторінку та models contacts).
  + Додатково створюємо оновлення підписки (subscription) користувача через ендпоінт PATCH /users.
       - В моделі users добавляємо поле subscription.
       - В файлі routes/api/users додаємо запит PATCH/api/users/:id/subscription - (змінна subscription);
  + Додатково робимо фільтрацію колекції contacts через поле favorits (controllers - getAll).
  + Експортуємо дані в кореневий файл api - де описуємо загальну інформацію.
  + Експортуємо дані в кореневий файл server - де робимо підключення наших HTTP-запитів до БД MongoDB Compass.
5. Переверіямо працездатність додатку через HTTP-запити у Postman

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

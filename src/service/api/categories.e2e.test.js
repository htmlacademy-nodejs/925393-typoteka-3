"use strict";

const express = require(`express`);
const request = require(`supertest`);

const categoriesRoutes = require(`./categories_routes`);
const CategoriesController = require(`../controllers/categories_controller`);
const {StatusCodes} = require(`http-status-codes`);

const mockData = getMockData();

const app = express();
app.use(express.json());

categoriesRoutes(app, new CategoriesController(mockData));

describe(`API возвращает список категорий`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`Возвращает список из 5ти категорий`, () => expect(response.body.length).toBe(5));
  test(`Category names are "Кино", "Политика", "Музыка", "IT", "Без рамки"`, () => expect(response.body).toEqual(
      expect.arrayContaining([`Кино`, `Политика`, `Музыка`, `IT`, `Без рамки`]))
  );

});

function getMockData() {
  return [
    {
      "id": `hziSTR`,
      "title": `Комната грязи - зачем?`,
      "announce": `Он написал больше 30 хитов.`,
      "fullText": `Достичь успеха помогут ежедневные повторения. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Программировать не настолько сложно, как об этом говорят. Он написал больше 30 хитов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Это один из лучших рок-музыкантов. Первая большая ёлка была установлена только в 1938 году. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Из под его пера вышло 8 платиновых альбомов. Как начать действовать? Для начала просто соберитесь. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
      "category": `Кино`,
      "createdDate": `21.06.2021, 20:20:44`,
      "comments": [
        {
          "id": `J6Npey`,
          "text": `Хочу такую же футболку :-) Ё-моё! Что за отстой? Совсем немного...`,
        },
        {
          "id": `ttra-3`,
          "text": `Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
        },
        {
          "id": `_QAYCq`,
          "text": `Мне кажется или я уже читал это где-то? Это где ж такие красоты?`,
        },
      ],
    },
    {
      "id": `9qPHq6`,
      "title": `Что? Зачем? Почему?`,
      "announce": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Ха-ха-ха! Вы видели его падение на этом видео? Это же просто умора! Это один из лучших рок-музыкантов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
      "fullText": `Он написал больше 30 хитов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Сенсация! Нашелся второй том знаменитой Камасутры! Да, да, - оказывается он есть! Достичь успеха помогут ежедневные повторения. Это один из лучших рок-музыкантов. Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Золотое сечение — соотношение двух величин, гармоническая пропорция. Его пресс-конференцию видел весь мир. Ну это же просто позор! Из под его пера вышло 8 платиновых альбомов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Собрать камни бесконечности легко, если вы прирожденный герой. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
      "category": `Политика`,
      "createdDate": `22.06.2021, 00:00:51`,
      "comments": [
        {
          "id": `zESXao`,
          "text": `Совсем немного...`,
        },
        {
          "id": `G4g37q`,
          "text": `Хочу такую же футболку :-)`,
        },
        {
          "id": `txNE3-`,
          "text": `Плюсую, но слишком много буквы! Планируете записать видосик на эту тему.`,
        },
        {
          "id": `2D_5Mc`,
          "text": `Это где ж такие красоты?`,
        },
      ],
    },
    {
      "id": `5ku5bn`,
      "title": `Ёлки. История деревьев.`,
      "announce": `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно, как об этом говорят. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
      "fullText": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Это один из лучших рок-музыкантов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Программировать не настолько сложно, как об этом говорят. Из под его пера вышло 8 платиновых альбомов. Достичь успеха помогут ежедневные повторения. Первая большая ёлка была установлена только в 1938 году. Собрать камни бесконечности легко, если вы прирожденный герой. Золотое сечение — соотношение двух величин, гармоническая пропорция. Сенсация! Нашелся второй том знаменитой Камасутры! Да, да, - оказывается он есть! Он написал больше 30 хитов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
      "category": `Музыка`,
      "createdDate": `25.04.2021, 05:10:06`,
      "comments": [
        {
          "id": `5EEgvZ`,
          "text": `Хочу такую же футболку :-) Планируете записать видосик на эту тему. Согласен с автором!`,
        },
        {
          "id": `lXbOSR`,
          "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
        },
        {
          "id": `EjAI1X`,
          "text": `Совсем немного... Плюсую, но слишком много буквы! Планируете записать видосик на эту тему.`,
        },
        {
          "id": `CJ0Fl1`,
          "text": `Плюсую, но слишком много буквы!`,
        },
      ],
    },
    {
      "id": `Rn7AT-`,
      "title": `Кто ты такой?`,
      "announce": `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Это один из лучших рок-музыкантов. Он написал больше 30 хитов. Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
      "fullText": `Программировать не настолько сложно, как об этом говорят. Из под его пера вышло 8 платиновых альбомов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Достичь успеха помогут ежедневные повторения.`,
      "category": `IT`,
      "createdDate": `04.06.2021, 15:48:28`,
      "comments": [
        {
          "id": `2bvA5C`,
          "text": `Совсем немного... Мне кажется или я уже читал это где-то?`,
        },
        {
          "id": `MXK2vz`,
          "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-) Планируете записать видосик на эту тему.`,
        },
        {
          "id": `HSHypN`,
          "text": `Плюсую, но слишком много буквы!`,
        },
      ],
    },
    {
      "id": `VK3y5K`,
      "title": `Камасутра - настольное пособие!`,
      "announce": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Из под его пера вышло 8 платиновых альбомов. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
      "fullText": `Его пресс-конференцию видел весь мир. Ну это же просто позор! Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко, если вы прирожденный герой. Как начать действовать? Для начала просто соберитесь. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Это один из лучших рок-музыкантов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Ёлки — это не просто красивое дерево. Это прочная древесина. Сенсация! Нашелся второй том знаменитой Камасутры! Да, да, - оказывается он есть! Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Простые ежедневные упражнения помогут достичь успеха. Он написал больше 30 хитов.`,
      "category": `Без рамки`,
      "createdDate": `13.06.2021, 21:48:50`,
      "comments": [
        {
          "id": `iqthT2`,
          "text": `Планируете записать видосик на эту тему. Согласен с автором! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
        },
        {
          "id": `LX6_xs`,
          "text": `Мне кажется или я уже читал это где-то?`,
        },
      ],
    },
  ];
}

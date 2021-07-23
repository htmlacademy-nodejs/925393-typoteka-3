"use strict";

const express = require(`express`);
const request = require(`supertest`);

const articlesRoutes = require(`./articles_routes`);
const ArticlesController = require(`../controllers/articles_controller`);
const CommentsController = require(`../controllers/comments_controller`);
const {StatusCodes} = require(`http-status-codes`);

const mockData = getMockData();

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  articlesRoutes(app, new ArticlesController(cloneData), new CommentsController(cloneData));
  return app;
};

describe(`API возвращает список статей`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });
  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`API должно вернуть 3 статьи`, () => expect(response.body.length).toBe(3));
  test(`ID крайней статьи - 5ku5bn"`, () => expect(response.body[2].id).toBe(`5ku5bn`));
});

describe(`API создаёт  новую статью с валидными данными`, () => {
  const app = createAPI();
  let response;

  const newArticle = {
    title: `Дам погладить котика`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    fullText: `Тут должен быть полный текст`,
    createdDate: `31.12.2000`,
    category: `Котики`,
  };

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });
  test(`Status code 201`, () => expect(response.statusCode).toBe(StatusCodes.CREATED));
  test(`Возвращает созданную статью`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Количество статей  увеличилось на 1`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

describe(`API отклоняет создание новой статьи с невалидными данными`, () => {
  const app = createAPI();

  const newArticle = {
    title: `Дам погладить котика`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    fullText: `Тут должен быть полный текст`,
    createdDate: `31.12.2000`,
    category: `Котики`,
  };

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badOffer = {...newArticle};
      delete badOffer[key];
      await request(app)
        .post(`/articles`)
        .send(badOffer)
        .expect(StatusCodes.BAD_REQUEST);
    }
  });
});

describe(`API возвращает статью по ID`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/hziSTR`);
  });
  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`title статьи - "Комната грязи - нахуа?"`, () => expect(response.body.title).toBe(`Комната грязи - нахуа?`));
});

test(`API должен вернуть 404,  если не будет статьи заданным ID`, () => {
  const app = createAPI();

  return request(app)
    .get(`/articles/111111`)
    .expect(StatusCodes.NOT_FOUND);
});

describe(`Изменяем статью c валидными данными`, () => {
  const app = createAPI();
  let response;

  const newArticle = {
    title: `Изменённая статья`,
    announce: `Пишут,  что тут что-то изменили`,
    fullText: `Тут должен быть полный текст`,
    createdDate: `31.12.2000`,
    category: `Котики`,
  };

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/hziSTR`)
      .send(newArticle);
  });
  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Article is really changed`, () => request(app)
    .get(`/articles/hziSTR`)
    .expect((res) => expect(res.body.title).toBe(`Изменённая статья`))
  );
});

test(`Изменяем статью с несуществующим ID, но с валидными данными`, () => {
  const app = createAPI();
  const newValidArticle = {
    title: `Изменённая статья`,
    announce: `Пишут,  что тут что-то изменили`,
    fullText: `Тут должен быть полный текст`,
    createdDate: `31.12.2000`,
    category: `Котики`,
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(newValidArticle)
    .expect(StatusCodes.NOT_FOUND);
});

test(`API возвращает 400 когда пытаемся изменить статью с невалидными данными`, () => {
  const app = createAPI();

  const newInvalidArticle = {
    title: `Изменённая и невалидная статья`,
    announce: `Пишут,  что тут что-то не поля Категории!!!`,
    fullText: `Тут должен быть полный текст`,
    createdDate: `31.12.2000`,
  };

  return request(app)
    .put(`/articles/hziSTR`)
    .send(newInvalidArticle)
    .expect(StatusCodes.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/hziSTR`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`Returns deleted article`, () => expect(response.body.id).toBe(`hziSTR`));
  test(`Articles count is 2 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(2))
  );

});

test(`API refuses to delete non-existent article`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(StatusCodes.NOT_FOUND);
});

describe(`API returns a list of comments to given article`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/hziSTR/comments`);
  });


  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`Returns list of 3 comments`, () => expect(response.body.length).toBe(3));
  test(`First comment's text is "Хочу такую же футболку :-) Ё-моё! Что за отстой? Совсем немного..."`, () => {
    expect(response.body[0].text)
      .toBe(`Хочу такую же футболку :-) Ё-моё! Что за отстой? Совсем немного...`);
  });
});

test(`Status code 404 if nothing is found article ID for comments`, () => {
  const app = createAPI();
  return request(app)
    .get(`/articles/NOEXST/comments`)
    .expect(StatusCodes.NOT_FOUND);
});

describe(`API creates a comment if data is valid`, () => {
  const app = createAPI();
  let response;

  const newComment = {
    text: `Новый валидный коммент`,
  };

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/hziSTR/comments`)
      .send(newComment);
  });
  test(`Status code 201`, () => expect(response.statusCode).toBe(StatusCodes.CREATED));
  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));
  test(`Comments count is changed`, () => request(app)
    .get(`/articles/hziSTR/comments`)
    .expect((res) => expect(res.body.length).toBe(4)));
});

describe(`API creates a comment if data is invalid`, () => {
  const app = createAPI();
  let response;

  const newComment = {
    invalid: `Новый невалидный коммент`,
  };

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/hziSTR/comments`)
      .send(newComment);
  });
  test(`Status code 400`, () => expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST));
  test(`Comments count is not changed`, () => request(app)
    .get(`/articles/hziSTR/comments`)
    .expect((res) => expect(res.body.length).toBe(3)));
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  const app = createAPI();
  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(StatusCodes.NOT_FOUND);
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();
  return request(app)
    .delete(`/articles/hziSTR/comments/NOEXST`)
    .expect(StatusCodes.NOT_FOUND);
});

test(`API refuses to delete non-existent article for comments`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST/comments/J6Npey`)
    .expect(StatusCodes.NOT_FOUND);
});


function getMockData() {
  return [
    {
      "id": `hziSTR`,
      "title": `Комната грязи - нахуа?`,
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
  ];
}

"use strict";

const fs = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {getRandomInt, shuffle, getRandomDate} = require(`../../../utils`);
const {
  DEFAULT_COUNT_PUBLICATIONS,
  COUNT_LAST_MONTH,
  FILE_NAME,
  PATH_TO_DATA,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
} = require(`../../constants`);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    return console.error(chalk.red(`Во время чтения файла произошла ошибка - ${err}.`));
  }
};

/**
 * @function
 * @name generateOffers
 * @param {number} count
 * @param {Object} options
 * @param {string} options.titles
 * @param {string} options.sentences
 * @param {Array} options.categories
 * @param {string} options.comments
 * @return {Array}
 */
const generateOffers = (count, options) => {
  const {titles, sentences, categories, comments} = options;

  const arr = Array(count).fill({});

  const getTitle = () => {
    const randomCount = getRandomInt(0, titles.length - 1);
    return titles[randomCount];
  };

  const getAnnounce = () => {
    const randomCount = getRandomInt(1, 5);
    return shuffle(sentences).slice(0, randomCount).join(` `);
  };

  const getFullText = () => {
    const randomCount = getRandomInt(1, sentences.length - 1);
    return shuffle(sentences).slice(0, randomCount).join(` `);
  };

  const getCreatedDate = () => {
    const date = getRandomDate(COUNT_LAST_MONTH);
    return date.toLocaleString(`ru`);
  };

  const getCategories = () => {
    getRandomInt(0, categories.length - 1);
    const [cat] = shuffle(categories).slice(0, 1);
    return cat;
  };

  const getComments = () => {
    const randomCount = getRandomInt(1, MAX_COMMENTS);
    const commentsArray = Array(randomCount).fill({});
    return commentsArray.map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      text: shuffle(comments)
        .slice(0, getRandomInt(1, 3))
        .join(` `),
    }));
  };

  return arr.map(() => (
    {
      id: nanoid(MAX_ID_LENGTH),
      title: getTitle(),
      announce: getAnnounce(),
      fullText: getFullText(),
      category: getCategories(),
      createdDate: getCreatedDate(),
      comments: getComments(),
    }
  ));
};


module.exports = {
  name: `--generate`,
  async run(arg) {
    const [count] = arg;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT_PUBLICATIONS;

    const titles = await readContent(PATH_TO_DATA.TITLES);
    const sentences = await readContent(PATH_TO_DATA.SENTENCES);
    const categories = await readContent(PATH_TO_DATA.CATEGORIES);
    const comments = await readContent(PATH_TO_DATA.COMMENTS);
    const content = JSON.stringify(generateOffers(countOffer, {
      titles,
      sentences,
      categories,
      comments,
    }));

    try {
      const pathUpload = path.join(process.env.NODE_PATH, FILE_NAME);
      await fs.writeFile(pathUpload, content);
      console.log(chalk.green(`Данные успешно сгенерированы!  Файл находиться тут --> ${path.resolve(pathUpload)}`));
    } catch (err) {
      console.log(chalk.red(`Ошибка! Не удалось сгенерировать данные!`));
    }
  },
};

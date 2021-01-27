"use strict";

const fs = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);

const {getRandomInt, shuffle, getRandomDate} = require(`../../../utils`);
const {DEFAULT_COUNT_PUBLICATIONS, COUNT_LAST_MONTH, FILE_NAME, PATH_TO_DATA} = require(`../cli_constants`);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    return console.error(chalk.red(`Во время чтения файла произошла ошибка - ${err}.`));
  }
};

const generateOffers = (count, titles, sentences, categories) => {
  const arr = Array(count).fill({});

  return arr.map(() => (
    {
      get title() {
        const randomCount = getRandomInt(0, titles.length - 1);
        return titles[randomCount];
      },
      get announce() {
        const randomCount = getRandomInt(1, 5);
        return shuffle(sentences).slice(0, randomCount).join(` `);
      },
      get fullText() {
        const randomCount = getRandomInt(1, sentences.length - 1);
        return shuffle(sentences).slice(0, randomCount).join(` `);
      },
      get category() {
        getRandomInt(0, categories.length - 1);
        const [cat] = shuffle(categories).slice(0, 1);
        return cat;
      },
      get createdDate() {
        const date = getRandomDate(COUNT_LAST_MONTH);
        return date.toLocaleString(`ru`);
      },
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
    const content = JSON.stringify(generateOffers(countOffer, titles, sentences, categories));

    try {
      const pathUpload = path.join(process.env.NODE_PATH, FILE_NAME);
      await fs.writeFile(pathUpload, content);
      console.log(chalk.green(`Данные успешно сгенерированы!  Файл находиться тут --> ${path.resolve(pathUpload)}`));
    } catch (err) {
      console.log(chalk.red(`Ошибка! Не удалось сгенерировать данные!`));
    }
  }
};

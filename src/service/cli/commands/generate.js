"use strict";

const fs = require(`fs`);
const path = require(`path`);
const chalk = require(`chalk`);

const {TITLES, SENTENCES, CATEGORIES} = require(`../data_for_generate.js`);
const {getRandomInt, shuffle, getRandomDate} = require(`../../../utils`);
const {DEFAULT_COUNT_PUBLICATIONS, COUNT_LAST_MONTH, FILE_NAME} = require(`../cli_constants`);

const generateOffers = (count) => {
  const arr = Array(count).fill({});

  return arr.map(() => (
    {
      get title() {
        const randomCount = getRandomInt(0, TITLES.length - 1);
        return TITLES[randomCount];
      },
      get announce() {
        const randomCount = getRandomInt(1, 5);
        return shuffle(SENTENCES).slice(0, randomCount).join(` `);
      },
      get fullText() {
        const randomCount = getRandomInt(1, SENTENCES.length - 1);
        return shuffle(SENTENCES).slice(0, randomCount).join(` `);
      },
      get category() {
        getRandomInt(0, CATEGORIES.length - 1);
        const [cat] = shuffle(CATEGORIES).slice(0, 1);
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
  run(arg) {
    const [count] = arg;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT_PUBLICATIONS;
    const content = JSON.stringify(generateOffers(countOffer));

    const pathUploadData = path.join(process.cwd(), `../../${FILE_NAME}`);

    fs.writeFile(pathUploadData, content, (err) => {
      if (err) {
        console.log(chalk.red(`Ошибка! Не удалось сгенерировать данные!`));
      } else {
        console.log(chalk.green(`Данные успешно сгенерированы!  Файл находиться тут --> ${pathUploadData}`));
      }
    });
  }
};

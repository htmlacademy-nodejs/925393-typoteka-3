"use strict";

/**
 * @function
 * @name getRandomInt
 * @param {number} min
 * @param {number} max
 * @return {number}
 */

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @function
 * @name shuffle
 * @param {Array} someArray
 * @return {Array}
 */

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }
  return someArray;
};

/**
 * @function
 * @name getRandomDate
 * @param {number} countLastMonth
 * @param {Date} [endRangeDate]
 * @return {Date}
 */

const getRandomDate = (countLastMonth = 1, endRangeDate = new Date()) => {
  const endMonth = endRangeDate.getUTCMonth();

  const day = endRangeDate.getUTCDate();

  const startDateRange = new Date(Date.UTC(endRangeDate.getUTCFullYear(), endMonth - countLastMonth, day));

  const startAsMilliseconds = startDateRange.getTime();
  const endAsMilliseconds = endRangeDate.getTime();

  const dateAsMilliseconds = getRandomInt(startAsMilliseconds, endAsMilliseconds);
  return new Date(dateAsMilliseconds);
};

module.exports = {
  getRandomInt,
  shuffle,
  getRandomDate,
};

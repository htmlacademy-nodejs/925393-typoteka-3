"use strict";

const chalk = require(`chalk`);
const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  EXIT_CODE,
} = require(`./constants`);

const {cli} = require(`./cli`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);

const userCommand = userArguments.slice(0, 1);
const userParam = userArguments.slice(1, 2);

/**
 * @function
 * @name defaultRun
 * @param {boolean} [isRunDefault]
 * @param {number} [exitCode]
 */
const defaultRun = (isRunDefault = false, exitCode = EXIT_CODE.error) => {
  if (isRunDefault) {
    cli[DEFAULT_COMMAND].run();
  }
  process.exit(exitCode);
};

if (userCommand.length === 0) {
  console.log(chalk.yellow(`Ознакомьтесь со справкой ${chalk.blue(`--help`)} и введите необходимую команду для дальнейшей работы.`));
  defaultRun(false, EXIT_CODE.success);
} else if (!cli[userCommand]) {
  console.log(chalk.red(`Такой команды не существует! Ознакомьтесь со справкой.`));
  defaultRun();
}

cli[userCommand].run(userParam);

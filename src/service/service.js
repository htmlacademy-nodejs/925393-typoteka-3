"use strict";

const chalk = require(`chalk`);
const {DEFAULT_COMMAND, USER_ARGV_INDEX, EXIT_CODE} = require(`./cli/cli_constants`);
const {cli} = require(`./cli`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);

const userCommand = userArguments.slice(0, 1);
const userParam = userArguments.slice(1, 2);

/**
 * @param {number} [exitCode]
 * @param {boolean} [isRunDefault]
 */

const defaultRun = (isRunDefault = false, exitCode = EXIT_CODE.error) => {
  if (isRunDefault) {
    cli[DEFAULT_COMMAND].run();
  }
  process.exit(exitCode);
};

if (userCommand.length === 0) {
  console.log(chalk.yellow(`Ознакомьтесь со справкой и введите необходимую команду для дальнейшей работы.`));
  defaultRun(true);
} else if (!cli[userCommand]) {
  console.log(chalk.red(`Такой команды не существует! Ознакомьтесь со справкой.`));
  defaultRun();
}

cli[userCommand].run(userParam);

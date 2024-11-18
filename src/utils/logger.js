import chalk from "chalk";

const log = (color, level, msg) => console.log(`${color(level)}: ${msg}`);

const logger = {
  info: (msg) => log(chalk.bold.green, "info", msg),
  warning: (msg) => log(chalk.bold.yellow, "warning", msg),
  error: (msg) => log(chalk.bold.red, "error", msg),
};

export default logger;

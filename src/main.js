import crawl from "./crawl.js";
import { log } from "./utils/index.js";
import chalk from "chalk";

async function main() {
  const baseUrl = process.argv[2];

  if (!baseUrl) {
    log.error("no website provided to crawl");
    return process.exit(1);
  }

  if (process.argv.length > 3) {
    log.error("too many args");
    return process.exit(1);
  }

  log.info(`starting crawl of ${chalk.blue(baseUrl)}`);
  const pages = await crawl(baseUrl, baseUrl, {});

  Object.entries(pages).forEach((page) => console.log(page));
}

main();

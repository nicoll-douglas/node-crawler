import { normalizeURL, extractURLs, log } from "./utils/index.js";
import chalk from "chalk";

export default async function crawl(baseUrl, currentUrl, pages) {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);

  if (baseUrlObj.hostname !== currentUrlObj.hostname) {
    return pages;
  }

  const normalizedCurrentUrl = normalizeURL(currentUrl);

  if (pages[normalizedCurrentUrl] > 0) {
    pages[normalizedCurrentUrl]++;
    return pages;
  }

  log.info(`actively crawling ${chalk.blue(currentUrl)}`);

  pages[normalizedCurrentUrl] = 1;

  try {
    const response = await fetch(currentUrl);

    if (response.status > 399) {
      log.warning(
        `received status ${chalk.yellow(response.status)} for ${chalk.blue(
          currentUrl
        )}`
      );
      return pages;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      log.warning(
        `received content type ${chalk.yellow(contentType)} for ${chalk.blue(
          currentUrl
        )}`
      );
      return pages;
    }

    const htmlString = await response.text();
    const nextUrls = extractURLs(htmlString, baseUrl);

    for (let i = 0; i < nextUrls.length; i++) {
      pages = await crawl(baseUrl, nextUrls[i], pages);
    }
  } catch (err) {
    log.error(`${err.message} for ${currentUrl}`);
  }

  return pages;
}

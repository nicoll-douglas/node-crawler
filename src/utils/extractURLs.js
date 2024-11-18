import { JSDOM } from "jsdom";
import log from "./logger.js";

export default function extractURLs(htmlString, baseUrl) {
  const urls = [];
  const dom = new JSDOM(htmlString);
  const linkElements = [...dom.window.document.querySelectorAll("a")];

  linkElements.forEach((linkElement) => {
    try {
      let urlObj;
      if (linkElement.href.charAt(0) === "/") {
        urlObj = new URL(`${baseUrl}${linkElement.href}`);
      } else {
        urlObj = new URL(linkElement.href);
      }
      urls.push(urlObj.href);
    } catch (err) {
      log.error(err.message);
    }
  });

  return urls;
}

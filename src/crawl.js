const { normalizeURL, extractURLs } = require("./utils");

async function crawl(baseUrl, currentUrl, pages) {
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

  console.log(`info: actively crawling ${currentUrl}`);

  pages[normalizedCurrentUrl] = 1;

  try {
    const response = await fetch(currentUrl);

    if (response.status > 399) {
      console.log(`info: received status ${response.status} for ${currentUrl}`);
      return pages;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `info: invalid content type for ${currentUrl}, received "${contentType}"`
      );
      return pages;
    }

    const htmlString = await response.text();
    const nextUrls = extractURLs(htmlString, baseUrl);

    for (let i = 0; i < nextUrls.length; i++) {
      pages = await crawl(baseUrl, nextUrls[i], pages);
    }
  } catch (err) {
    console.log(`error: ${err.message}, for page ${currentUrl}`);
  }

  return pages;
}

module.exports = crawl;

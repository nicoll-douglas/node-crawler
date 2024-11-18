const crawl = require("./crawl");

async function main() {
  const baseUrl = process.argv[2];

  if (!baseUrl) {
    console.log("error: no website provided");
    return process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("error: too many args");
    return process.exit(1);
  }

  console.log(`info: starting crawl of ${baseUrl}...`);
  const pages = await crawl(baseUrl, baseUrl, {});

  Object.entries(pages).forEach((page) => console.log(page));
}

main();

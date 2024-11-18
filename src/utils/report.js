import chalk from "chalk";

export default function report(pages) {
  console.log("------- REPORT -------");

  Object.entries(pages)
    .sort((a, z) => z[1] - a[1])
    .forEach(([link, crawlCount]) => {
      console.log(
        `Found ${chalk.bold.magenta(crawlCount)} link${
          crawlCount === 1 ? "" : "s"
        } to page: ${chalk.blue(link)}`
      );
    });

  console.log("------- END REPORT -------");
}

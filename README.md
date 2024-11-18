# node-crawler

A basic web crawler built in Node.js.

## Installation

1. `git clone git@github.com:nicoll-douglas/node-crawler.git`
2. `cd node-crawler`
3. `npm install`

## Usage

To use it, you use a basic CLI. Run `npm start` with one command line arg, that is the URL of the website you want to crawl.

### Example:

If I wanted to crawl my [portfolio site](https://nicolldouglas.dev):

#### Input:

```
npm start https://nicolldouglas.dev
```

#### Output:

```
info: starting crawl of https://nicolldouglas.dev
info: actively crawling https://nicolldouglas.dev
info: actively crawling https://nicolldouglas.dev/projects
info: actively crawling https://nicolldouglas.dev/about
info: actively crawling https://nicolldouglas.dev/contact
------- REPORT -------
Found 5 links to page: nicolldouglas.dev
Found 5 links to page: nicolldouglas.dev/projects
Found 4 links to page: nicolldouglas.dev/about
Found 4 links to page: nicolldouglas.dev/contact
------- END REPORT -------
```

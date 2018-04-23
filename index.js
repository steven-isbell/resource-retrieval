const puppeteer = require("puppeteer");
const fs = require("fs");

const sleep = require(`${__dirname}/utils`);

const writeToFile = data => {
  fs.writeFile("./resources.json", JSON.stringify(data), err => {
    if (err) return console.error(err);
    process.exit();
  });
};

const pullResource = async (val, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      await page.goto(val);
      await sleep(page, 60000);
      const titleNode = await page.$(".markdown-body h1");
      try {
        const title = titleNode
          ? await (await titleNode.getProperty("outerText")).jsonValue()
          : null;
        const resourceNodes = await page.$$(".markdown-body li a");
        const resources = [];
        for (let j = 0; j < resourceNodes.length; j++) {
          resources.push({
            title: resourceNodes[j]
              ? await (await resourceNodes[j].getProperty(
                  "innerText"
                )).jsonValue()
              : null,
            url: resourceNodes[j]
              ? await (await resourceNodes[j].getProperty("href")).jsonValue()
              : null
          });
        }
        const data = {
          title,
          resources
        };
        resolve(data);
      } catch (err) {
        throw err;
      }
    } catch (err) {
      console.log(err);
    }
  });
};

(async () => {
  const hrefs = [];
  const data = [];
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.github.com/steven-isbell/resources/tree/master");
  await sleep(page, 60000);
  const topics = await page.$$("table .js-navigation-open");
  for (let j = 0; j < topics.length - 2; j++) {
    const href = await (await topics[j].getProperty("href")).jsonValue();
    hrefs.push(href);
  }
  await sleep(page, 60000);
  for (let i = 0; i < hrefs.length; i++) {
    try {
      await sleep(page, 60000);
      const resource = await pullResource(hrefs[i], page);
      data.push(resource);
    } catch (e) {
      console.error(e);
    }
  }
  writeToFile(data);
})();

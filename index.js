const puppeteer = require("puppeteer");
const fs = require("fs");

const sleep = function(timeToWait) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, timeToWait);
  });
};

const writeToFile = data => {
  const writeStream = fs.createWriteStream("./jobs.txt");
  writeStream.write(JSON.stringify(data));
  writeStream.close();
  console.log("Finished");
};

(async () => {
  const links = [];
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(
      "https://www.github.com/steven-isbell/resources/tree/master"
    );
    await sleep(2000);
    const topics = await page.$$("table .js-navigation-open");
    for (let i = 0; i < topics.length - 2; i++) {
      await topics[i].click();
      await page.waitForNavigation();
      await sleep(2000);

      await page.screenshot({
        path: `${__dirname}/screenshots/example${i}.png`
      });
      const titleNode = await page.$(".markdown-body h1");
      const title = await (await titleNode.getProperty(
        "outerText"
      )).jsonValue();
      const resourceNodes = await page.$$(".markdown-body li a");
      const resources = [];
      for (let j = 0; j < resourceNodes.length; j++) {
        resources.push({
          title: await (await resourceNodes[j].getProperty(
            "innerText"
          )).jsonValue(),
          url: await (await resourceNodes[j].getProperty("href")).jsonValue()
        });
      }
      const data = {
        title,
        resources
      };
      links.push(data);
      await page.goto(
        "https://www.github.com/steven-isbell/resources/tree/master"
      );
    }

    await browser.close();
    writeToFile(links);
  } catch (err) {
    console.log(err);
  }
})();

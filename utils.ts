import promiseRetry from 'promise-retry';

import Page from './PageInterface';

const timeout = 1000;
const iv = 100;

export default (page: Page, maxTimeout = 120000) =>
  promiseRetry(
    async retry => {
      try {
        await page.evaluate((iv: number) => {
          return new Promise(resolve => {
            checkReadyState();

            function checkReadyState() {
              if (document.readyState === 'complete') {
                resolve();
              } else {
                setTimeout(checkReadyState, iv);
              }
            }
          });
        }, iv);
      } catch (err) {
        if (
          err.message.includes(
            'Cannot find context with specified id undefined'
          )
        ) {
          retry(err);
        } else {
          throw err;
        }
      }
    },
    {
      retries: Math.ceil(maxTimeout / timeout),
      minTimeout: timeout,
      maxTimeout: timeout
    }
  );

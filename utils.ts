import promiseRetry from 'promise-retry';

const timeout = 1000;
const iv = 100;

export default (page: Object, maxTimeout = 120000) =>
  promiseRetry(
    async (retry, number) => {
      try {
        await page.evaluate(iv => {
          return new Promise((resolve, reject) => {
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
          retry();
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

import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { pageFixture } from './pageFixture';

let browser: Browser;

BeforeAll(async function () {
  console.log("Launching the browser...");
  browser = await chromium.launch({ headless: true });
  console.log("Browser launched.");
});

Before(async function ({ pickle }) {
  console.log("Creating new context and page...");
  const context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.context = context;
  pageFixture.page = page;

  // Debugging step to ensure `page` is correctly assigned
  if (!pageFixture.page) {
    console.log("Error: Page is not assigned!");
  } else {
    console.log("Page assigned successfully.");
  }
});

After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED && pageFixture.page) {
    const image = await pageFixture.page.screenshot({
      path: `./test-result/screenshot/${pickle.name}.png`,
      type: 'png'
    });
    await this.attach(image, 'image/png');
    console.log(`Screenshot taken for failed scenario: ${pickle.name}`);
  }

  if (pageFixture.page) await pageFixture.page.close();
  if (pageFixture.context) await pageFixture.context.close();
});

AfterAll(async function () {
  console.log("Closing the browser...");
  await browser.close();
  console.log("Browser closed.");
});
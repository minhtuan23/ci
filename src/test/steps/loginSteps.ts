import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../utils/pageFixture';
import LoginPage from '../pageObjects/LoginPage';

const loginPage = new LoginPage();

Given('providing valid url for login', { timeout: 15000 }, async function () {
  if (!pageFixture.page) {
    throw new Error("Page is not initialized before goto.");
  }
  await pageFixture.page.goto("https://opensource-demo.orangehrmlive.com/", { waitUntil: 'domcontentloaded', timeout: 50000 });
  console.log("Opening Browser https://opensource-demo.orangehrmlive.com/");
});

When('providing valid username as {string} and password as {string}', { timeout: 15000 }, async function (username: string, password: string) {
  await loginPage.enterUserNameAndPassword(username, password);
});

// Then('clicking login button', async function () {
//   await loginPage.submit();
// });

Then('user should be redirected to the dashboard', async function () {
  const title = await loginPage.getDashboardTitle();
  expect(title.toLowerCase()).toContain("orangehrm");
});

Given('I open the login page', { timeout: 15000 }, async function () {
  await pageFixture.page!.goto("https://opensource-demo.orangehrmlive.com/", { waitUntil: 'domcontentloaded', timeout: 50000 });
});

When('clicking login button', { timeout: 15000 }, async function () {
  await loginPage.submit();
});

Then('I should see required field error messages', async function () {
  const messages = await loginPage.getFieldErrorMessages();
  expect(messages.length).toBe(2);
  for (const message of messages) {
    expect(message.toLowerCase()).toContain("required");
  }
});
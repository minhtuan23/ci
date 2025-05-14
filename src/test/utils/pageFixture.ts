import { Page, BrowserContext } from '@playwright/test';

type PageFixtureType = {
  page: Page | undefined;
  context: BrowserContext | undefined;
};

export const pageFixture: PageFixtureType = {
  page: undefined,
  context: undefined,
};
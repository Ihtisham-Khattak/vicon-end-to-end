import { test as baseTest, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { LearnPage } from '../pages/LearnPage';

type CustomFixtures = {
  landingPage: LandingPage;
  loginPage: LoginPage;
  learnPage: LearnPage;
};

export const test = baseTest.extend<CustomFixtures>({
  landingPage: async ({ page }, use) => {
    const landingPage = new LandingPage(page);
    await use(landingPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  learnPage: async ({ page }, use) => {
    const learnPage = new LearnPage(page);
    await use(learnPage);
  }
});

export { expect };

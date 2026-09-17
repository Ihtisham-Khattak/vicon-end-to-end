import { test, expect } from '../../src/fixtures/testFixture';

test.describe('Metodo Vicon Landing Page & Smoke Tests', () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.goto();
  });

  test('should load the homepage with correct title and accept cookies', async ({ landingPage, page }) => {
    await expect(page).toHaveTitle(/VICON Method/);
    await expect(landingPage.heroHeading).toBeVisible();
  });

  test('should display primary navigation links in the header', async ({ landingPage }) => {
    await expect(landingPage.homeLink).toBeVisible();
    await expect(landingPage.howItWorksLink).toBeVisible();
    await expect(landingPage.resultsLink).toBeVisible();
    await expect(landingPage.signInLink).toBeVisible();
  });

  test('should navigate to the login page when clicking Sign In', async ({ landingPage, page }) => {
    await landingPage.clickSignIn();
    await expect(page).toHaveURL(/.*\/en\/login/);
    await expect(page).toHaveTitle(/Access the VICON Method/);
  });
});

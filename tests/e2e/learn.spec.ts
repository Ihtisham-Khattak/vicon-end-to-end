import { test, expect } from '../../src/fixtures/testFixture';

test.describe('Metodo Vicon Authenticated User Journeys', () => {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  test('should redirect unauthenticated users away from protected pages', async ({ page }) => {
    await page.goto('/en/method/learn');
    // If not authenticated, user should either be redirected to login or remain on login
    await expect(page).toHaveURL(/.*\/en\/login.*/, { timeout: 10000 });
  });

  test('authenticated user journey: login, navigate levels, and logout', async ({ loginPage, learnPage, page }) => {
    test.skip(!email || !password, 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD in .env to run authenticated journey test');

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login(email!, password!);
    await expect(page).toHaveURL(/.*\/en\/method\/learn.*/, { timeout: 15000 });

    // Step 2: Verify learn dashboard
    await expect(learnPage.userDropdown).toBeVisible();
    const isLevel1Visible = await learnPage.isLevelVisible('LEVEL 1 - Motivation');
    expect(isLevel1Visible).toBeTruthy();

    // Step 3: Navigate to My Videos
    await learnPage.navigateToVideos();
    await expect(page).toHaveURL(/.*\/en\/method\/myvideos/);

    // Step 4: Logout
    await learnPage.logout();
    await expect(page).toHaveURL(/.*\/en\/login/);
  });
});

import { test, expect } from '../../src/fixtures/testFixture';

test.describe('Metodo Vicon Authentication Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should switch from registration to login form', async ({ loginPage }) => {
    await loginPage.switchToLoginForm();
    await expect(loginPage.accessAccountHeading).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('login button should be disabled when fields are empty', async ({ loginPage }) => {
    await loginPage.switchToLoginForm();
    await expect(loginPage.loginButton).toBeDisabled();
  });

  test('login button should become enabled when email and password are typed', async ({ loginPage }) => {
    await loginPage.switchToLoginForm();
    await loginPage.fillCredentials('user@example.com', 'ValidPassword123');
    await expect(loginPage.loginButton).toBeEnabled();
  });

  test('should show error message when submitting invalid credentials', async ({ loginPage }) => {
    await loginPage.switchToLoginForm();
    await loginPage.fillCredentials('invalid-user@example.com', 'WrongPass123!');
    await expect(loginPage.loginButton).toBeEnabled();
    await loginPage.submit();

    // Verify error banner appears
    await expect(loginPage.errorMessage).toBeVisible({ timeout: 8000 });
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Incorrect username or password.');
  });
});
